import os

old_domain = "shopnoltd.kesug.com"
new_domain = "shopnoltd-dashboard.onrender.com"
templates_dir = r"D:\Project\shopnoltd\templates"

def replace_urls_in_file(file_path):
    try:
        # Try UTF-8 first
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            # Fallback to latin-1 if UTF-8 fails
            with open(file_path, "r", encoding="latin-1") as f:
                content = f.read()
        except Exception as e:
            print(f"Skipped (binary or unreadable file): {file_path} ({e})")
            return

    if old_domain in content:
        content = content.replace(old_domain, new_domain)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated: {file_path}")

# Walk through all files
for root, dirs, files in os.walk(templates_dir):
    for file in files:
        # Only process files likely to contain URLs
        if file.endswith((".html", ".js", ".css", ".txt", ".php")):
            replace_urls_in_file(os.path.join(root, file))

print("All URLs updated successfully!")
