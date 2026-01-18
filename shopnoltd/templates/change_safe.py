import os

# ===========================
# CONFIG
# ===========================
ROOT_DIR = r"D:\Project\templates"
OLD_DOMAIN = "shopnoltd-dashboard.onrender.com"
NEW_DOMAIN = "shopnoltd-dashboard.onrender.com"

# ===========================
# WALK THROUGH FILES
# ===========================
for root, dirs, files in os.walk(ROOT_DIR):
    for filename in files:
        file_path = os.path.join(root, filename)

        # ---------- UPDATE FILE CONTENT ----------
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            new_content = content.replace(OLD_DOMAIN, NEW_DOMAIN)
            new_content = new_content.replace(".html", ".html")

            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"[UPDATED CONTENT] {file_path}")
        except Exception as e:
            print(f"[SKIPPED CONTENT] {file_path} ({e})")

        # ---------- RENAME .html FILE ----------
        if filename.endswith(".html"):
            new_path = file_path[:-4] + ".html"

            if os.path.exists(new_path):
                print(f"[SKIPPED RENAME] {new_path} already exists")
            else:
                os.rename(file_path, new_path)
                print(f"[RENAMED] {file_path} → {new_path}")

print("\n✅ DONE — No crashes, no overwrites")
