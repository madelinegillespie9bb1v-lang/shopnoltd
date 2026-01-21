import os
import time
import requests
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, abort, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

# ==============================
# APP CONFIG
# ==============================
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "shopnoltd-secret-key")
app.url_map.strict_slashes = False

# ==============================
# DATABASE CONFIG (POSTGRESQL)
# ==============================
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing. Set it in Render → Environment Variables")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ==============================
# DB + MIGRATE (must be after app creation)
# ==============================
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # <-- This is correct now

# ==============================
# USER MODEL
# ==============================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
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
HEADERS = {"Authorization": f"Token {API_TOKEN}"} if API_TOKEN else {}
KOBO_API_URL = f"https://kf.kobotoolbox.org/api/v2/assets/{ASSET_UID}/data/" if ASSET_UID else None
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
# ROUTES (same as your previous code)
# ==============================
@app.route("/ping")
def ping():
    return "", 204

# ---- STATIC PAGES ----
@app.route("/")
def index_page():
    return render_template("index.html")

@app.route("/about-us")
def about_us_page():
    return render_template("about-us/index.html")

@app.route("/features")
def features_page():
    return render_template("features/index.html")

@app.route("/services")
def services_page():
    return render_template("services/index.html")

@app.route("/pricing")
def pricing_page():
    return render_template("pricing/index.html")

@app.route("/help")
def help_page():
    return render_template("help/index.html")

@app.route("/join-our-team")
def join_our_team_page():
    return render_template("join-our-team/index.html")

@app.route("/donate")
def donate_page():
    return render_template("donate/index.html")

# ---- BLOG PAGES ----
@app.route("/blog/")
@app.route("/blog/page<int:page>")
def blog_pages(page=1):
    if page < 1 or page > 10:
        abort(404)
    if page == 1:
        return render_template("blog/index.html")
    return render_template(f"blog/page{page}/index.html")

# ---- SIGNUP / REGISTER ----
@app.route("/accounts/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        if request.form["password"] != request.form["confirm_password"]:
            return render_template("accounts/register/index.html", error="Passwords do not match")
        user = User(
            username=request.form["username"],
            email=request.form["email"],
            phone=request.form["fullphone"]
        )
        user.set_password(request.form["password"])
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("login_page"))
    return render_template("accounts/register/index.html")

@app.route("/accounts/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        if request.form["password"] != request.form["confirm_password"]:
            return render_template("accounts/signup/index.html", error="Passwords do not match")
        user = User(
            username=request.form["username"],
            email=request.form["email"],
            phone=request.form["fullphone"]
        )
        user.set_password(request.form["password"])
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("login_page"))
    return render_template("accounts/signup/index.html")

# ---- LOGIN / LOGOUT ----
@app.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        user = User.query.filter_by(username=request.form.get("username")).first()
        if user and user.check_password(request.form.get("password")):
            session["user_id"] = user.id
            session["is_admin"] = user.is_admin
            return redirect(url_for("dashboard_page"))
        return render_template("login.html", error="Invalid username or password")
    return render_template("login.html")

@app.route("/logout")
def logout_page():
    session.clear()
    return redirect(url_for("login_page"))

# ---- DASHBOARD ----
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
        total_pages=(len(data) - 1) // per_page + 1
    )

# ---- PROFILE ----
@app.route("/accounts/profile")
@login_required
def profile_page():
    user = User.query.get(session["user_id"])
    return render_template("accounts/profile.html", user=user)

# ---- ANDROID DOWNLOAD ----
@app.route("/download/android")
def download_page():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    apk_dir = os.path.join(base_dir, "static", "download", "android")
    return send_from_directory(apk_dir, "app-debug.apk", as_attachment=True)

# ==============================
# DB INIT (optional, only if no migrate)
# ==============================
# with app.app_context():
#     db.create_all()  # Comment this out if using Flask-Migrate

# ==============================
# RUN
# ==============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
