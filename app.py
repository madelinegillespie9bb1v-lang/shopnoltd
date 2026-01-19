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
# PING (KEEP ALIVE)
# ==============================
@app.route("/ping")
def ping():
    return "", 204   # Fast, silent, perfect for UptimeRobot

# ==============================
# DATABASE CONFIG (POSTGRESQL)
# ==============================
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is missing. Set it in Render → Environment Variables"
    )

# Render uses postgres:// but SQLAlchemy needs postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
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
# KOBO CONFIG (SAFE)
# ==============================
API_TOKEN = os.getenv("KOBO_API_TOKEN")
ASSET_UID = os.getenv("KOBO_ASSET_UID")

HEADERS = {"Authorization": f"Token {API_TOKEN}"} if API_TOKEN else {}
KOBO_API_URL = (
    f"https://kf.kobotoolbox.org/api/v2/assets/{ASSET_UID}/data/"
    if ASSET_UID else None
)

CACHE = {"data": [], "timestamp": 0}
CACHE_DURATION = 300

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

@app.route("/")
def index_page():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        user = User.query.filter_by(
            username=request.form.get("username")
        ).first()

        if user and user.check_password(request.form.get("password")):
            session["user_id"] = user.id
            session["is_admin"] = user.is_admin
            return redirect(url_for("dashboard_page"))

        return render_template("login.html", error="Invalid username or password")

    return render_template("login.html")

@app.route("/about-us")
def about_us_page():
    return render_template("about-us/index.html")

@app.route("/sign-up")
def sign_up_page():
    return render_template("sign-up/index.html")

@app.route("/download/android")
def download_page():
    return render_template("/download/android/app-debug.apk")
    
@app.route("/accounts/signup", methods=["POST"])
def signup_submit():
    user = User(
        username=request.form["username"],
        email=request.form["email"],
    )
    user.set_password(request.form["password"])

    db.session.add(user)
    db.session.commit()

    return redirect(url_for("login_page"))

@app.route("/logout")
def logout_page():
    session.clear()
    return redirect(url_for("index_page"))

@app.route("/dashboard")
@login_required
def dashboard_page():
    if not KOBO_API_URL or not API_TOKEN:
        return "<h2>Kobo configuration missing.</h2>"

    now = time.time()

    if now - CACHE["timestamp"] > CACHE_DURATION:
        try:
            r = requests.get(KOBO_API_URL, headers=HEADERS, timeout=20)
            r.raise_for_status()
            CACHE["data"] = r.json().get("results", [])
            CACHE["timestamp"] = now
        except requests.RequestException as e:
            return f"<h2>Kobo Error: {e}</h2>"

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
        total_pages=(len(data) - 1) // per_page + 1,
    )

@app.route("/accounts/profile")
@login_required
def profile_page():
    user = User.query.get(session["user_id"])
    return render_template("accounts/profile.html", user=user)

# ==============================
# DB INIT
# ==============================
with app.app_context():
    db.create_all()

# ==============================
# RUN (RENDER / LOCAL)
# ==============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
