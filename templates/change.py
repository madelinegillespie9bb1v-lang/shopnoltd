import os

# ===========================
# CONFIGURATION
# ===========================
root_dir = r"D:\Project\templates"  # Change this to your templates folder
old_domain = "shopnoltd-dashboard.onrender.com"
new_domain = "shopnoltd-dashboard.onrender.com"

# ===========================
# FUNCTION TO PROCESS FILES
# ===========================
for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        file_path = os.path.join(subdir, file)

        # 1️⃣ Replace domain inside file content
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            updated_content = content.replace(old_domain, new_domain)
            
            # Replace internal .html links with .html
            updated_content = updated_content.replace(".html", ".html")

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"[UPDATED CONTENT] {file_path}")
        except Exception as e:
            print(f"[SKIP CONTENT] {file_path} - {e}")

        # 2️⃣ Rename .html files to .html
        if file.endswith(".html"):
            new_file_path = file_path[:-4] + ".html"
            os.rename(file_path, new_file_path)
            print(f"[RENAMED FILE] {file_path} -> {new_file_path}")

print("✅ Conversion completed!")
