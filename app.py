import os
import time
import requests
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# ==============================
# APP CONFIG
# ==============================
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "shopnoltd-secret-key")

# ==============================
# DATABASE CONFIG (POSTGRESQL)
# ==============================
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing")

# Replace old postgres:// prefix if necessary
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL.replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ==============================
# USER MODEL
# ==============================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# ==============================
# KOBO CONFIG
# ==============================
API_TOKEN = os.getenv("KOBO_API_TOKEN")
ASSET_UID = os.getenv("KOBO_ASSET_UID")

if not API_TOKEN or not ASSET_UID:
    raise RuntimeError("KOBO_API_TOKEN or KOBO_ASSET_UID is missing")

HEADERS = {"Authorization": f"Token {API_TOKEN}"}
KOBO_API_URL = f"https://kf.kobotoolbox.org/api/v2/assets/{ASSET_UID}/data/"

CACHE = {"data": [], "timestamp": 0}
CACHE_DURATION = 300  # 5 minutes

# ==============================
# LOGIN REQUIRED DECORATOR
# ==============================
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login_page"))
        return f(*args, **kwargs)
    return decorated

# ==============================
# ROUTES
# ==============================

# Home page
@app.route("/")
def index_page():
    return render_template("index.html")

# ---------- LOGIN ----------
@app.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        user = User.query.filter_by(username=request.form["username"]).first()
        if user and user.check_password(request.form["password"]):
            session["user_id"] = user.id
            session["is_admin"] = user.is_admin
            return redirect(url_for("dashboard_page"))
        return render_template("login.html", error="Invalid username or password")
    return render_template("login.html")

# ---------- SIGN-UP PAGE ----------
@app.route("/sign-up")
def sign_up_page():
    return render_template("sign-up/index.html")

# ---------- SIGN-UP SUBMISSION ----------
@app.route("/accounts/signup/index", methods=["GET", "POST"])
def signup_page():
    if request.method == "POST":
        user = User(
            username=request.form["username"],
            email=request.form["email"]
        )
        user.set_password(request.form["password"])
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("login_page"))
    return render_template("accounts/signup/index.html")

# ---------- LOGOUT ----------
@app.route("/logout")
def logout_page():
    session.clear()
    return redirect(url_for("index_page"))

# ---------- DASHBOARD ----------
@app.route("/dashboard")
@login_required
def dashboard_page():
    current_time = time.time()
    if current_time - CACHE["timestamp"] > CACHE_DURATION:
        try:
            response = requests.get(KOBO_API_URL, headers=HEADERS, timeout=20)
            response.raise_for_status()
            CACHE["data"] = response.json().get("results", [])
            CACHE["timestamp"] = current_time
        except requests.RequestException as e:
            return f"<h2>Error fetching Kobo data: {e}</h2>"

    data = CACHE["data"]
    if not data:
        return "<h2>No Kobo submissions yet.</h2>"

    page = int(request.args.get("page", 1))
    per_page = 20
    start = (page - 1) * per_page
    end = start + per_page

    return render_template(
        "dashboard.html",
        data=data[start:end],
        page=page,
        total_pages=(len(data) - 1) // per_page + 1
    )

# ---------- PROFILE ----------
@app.route("/accounts/profile")
@login_required
def profile_page():
    user = User.query.get(session["user_id"])
    return render_template("accounts/profile.html", user=user)

# ==============================
# CREATE DATABASE TABLES
# ==============================
with app.app_context():
    db.create_all()

# ==============================
# RUN APP (RENDER COMPATIBLE)
# ==============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
