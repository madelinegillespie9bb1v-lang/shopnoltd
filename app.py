import os
import time
import requests
from flask import Flask, render_template, request

print("🔥 RUNNING app.py 🔥")

app = Flask(__name__)

# Kobo API info (set in Render → Environment)
API_TOKEN = os.getenv("KOBO_API_TOKEN")
ASSET_UID = os.getenv("KOBO_ASSET_UID")

if not API_TOKEN or not ASSET_UID:
    raise RuntimeError("KOBO_API_TOKEN or KOBO_ASSET_UID is missing")

HEADERS = {"Authorization": f"Token {API_TOKEN}"}
KOBO_API_URL = f"https://kf.kobotoolbox.org/api/v2/assets/{ASSET_UID}/data/"

# Simple cache to reduce API calls
CACHE = {"data": [], "timestamp": 0}
CACHE_DURATION = 300  # 5 minutes


# ======================
# HOME / WEBSITE PAGE
# ======================
@app.route("/")
def index():
    return render_template("index.html")


# ======================
# DASHBOARD PAGE
# ======================
@app.route("/dashboard")
def dashboard():
    current_time = time.time()

    if current_time - CACHE["timestamp"] > CACHE_DURATION:
        try:
            response = requests.get(KOBO_API_URL, headers=HEADERS)
            response.raise_for_status()
            CACHE["data"] = response.json().get("results", [])
            CACHE["timestamp"] = current_time
        except requests.RequestException as e:
            return f"<h2>Error fetching data: {e}</h2>"

    all_data = CACHE["data"]
    if not all_data:
        return "<h2>No data available yet.</h2>"

    # Pagination
    page = int(request.args.get("page", 1))
    per_page = 20
    start = (page - 1) * per_page
    end = start + per_page

    paginated_data = all_data[start:end]
    total_pages = (len(all_data) - 1) // per_page + 1

    return render_template(
        "dashboard.html",
        data=paginated_data,
        page=page,
        total_pages=total_pages
    )


# ======================
# RUN LOCAL / RENDER
# ======================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
