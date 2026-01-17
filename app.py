import os
import requests
from flask import Flask, render_template

app = Flask(__name__)

# Read Kobo API info from environment variables
API_TOKEN = os.getenv("KOBO_API_TOKEN")
ASSET_UID = os.getenv("KOBO_ASSET_UID")

if not API_TOKEN or not ASSET_UID:
    raise RuntimeError("KOBO_API_TOKEN or KOBO_ASSET_UID is missing")

HEADERS = {
    "Authorization": f"Token {API_TOKEN}"
}

KOBO_API_URL = f"https://kf.kobotoolbox.org/api/v2/assets/{ASSET_UID}/data/"

@app.route("/")
def dashboard():
    try:
        response = requests.get(KOBO_API_URL, headers=HEADERS)
        response.raise_for_status()
        data = response.json().get("results", [])
    except requests.RequestException as e:
        return f"<h2>Error fetching data: {e}</h2>"

    return render_template("dashboard.html", data=data)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
