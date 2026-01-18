<?php
session_start();
require_once __DIR__ . '/config.php';

// --- Function: List folders in current directory (one level only)
function list_directories($basePath) {
    $dirs = [];
    foreach (glob($basePath . '/*', GLOB_ONLYDIR) as $dir) {
        $dirs[] = basename($dir);
    }
    return $dirs;
}

$baseDir = realpath(__DIR__);
$folders = list_directories($baseDir);

// ----------------------
// 📦 DOWNLOAD DATABASE
// ----------------------
if (isset($_POST['downloadDB'])) {
    $filename = "db_backup_" . date("Y-m-d_H-i-s") . ".sql";
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    foreach ($tables as $table) {
        echo "-- Table: $table\n";
        $create = $pdo->query("SHOW CREATE TABLE `$table`")->fetch(PDO::FETCH_ASSOC);
        echo $create['Create Table'] . ";\n\n";

        $rows = $pdo->query("SELECT * FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $r) {
            $values = array_map([$pdo, 'quote'], array_values($r));
            echo "INSERT INTO `$table` VALUES (" . implode(',', $values) . ");\n";
        }
        echo "\n\n";
    }
    exit;
}

// ----------------------
// 📤 RESTORE DATABASE
// ----------------------
if (isset($_POST['restoreDB']) && !empty($_FILES['sqlFile']['tmp_name'])) {
    $sql = file_get_contents($_FILES['sqlFile']['tmp_name']);
    $pdo->exec($sql);
    $_SESSION['flashSuccess'] = "✅ Database restored successfully!";
    header("Location: " . $_SERVER['REQUEST_URI']);
    exit;
}

// ----------------------
// 🗂️ DOWNLOAD FILES AS ZIP
// ----------------------
if (isset($_POST['downloadFiles'])) {
    $selectedFolder = $_POST['folder'] ?? '';
    $targetPath = $selectedFolder ? "$baseDir/$selectedFolder" : $baseDir;
    $zipFile = "backup_" . ($selectedFolder ?: 'root') . "_" . date("Y-m-d_H-i-s") . ".zip";

    $zip = new ZipArchive();
    if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($targetPath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relative = substr($filePath, strlen($baseDir) + 1);
                $zip->addFile($filePath, $relative);
            }
        }
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . basename($zipFile) . '"');
        readfile($zipFile);
        unlink($zipFile);
        exit;
    }
}

// ----------------------
// 📥 UPLOAD ZIP AND REPLACE FILES
// ----------------------
if (isset($_POST['uploadZip']) && !empty($_FILES['zipFile']['tmp_name'])) {
    $selectedFolder = $_POST['folder'] ?? '';
    $targetPath = $selectedFolder ? "$baseDir/$selectedFolder" : $baseDir;

    $zip = new ZipArchive;
    if ($zip->open($_FILES['zipFile']['tmp_name']) === TRUE) {
        $zip->extractTo($targetPath);
        $zip->close();
        $_SESSION['flashSuccess'] = "✅ Files uploaded and replaced successfully in <b>$selectedFolder</b>.";
    } else {
        $_SESSION['flashError'] = "❌ Failed to extract uploaded ZIP.";
    }
    header("Location: " . $_SERVER['REQUEST_URI']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Backup Manager</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body { background: #f8f9fa; }
.card { border-radius: 10px; box-shadow: 0 3px 8px rgba(0,0,0,0.1); }
</style>
</head>
<body class="p-4">

<div class="container">
    <h3 class="mb-4">🧰 ShopnoLTD Backup & Restore Panel</h3>

    <?php if (!empty($_SESSION['flashSuccess'])): ?>
        <div class="alert alert-success"><?php echo $_SESSION['flashSuccess']; unset($_SESSION['flashSuccess']); ?></div>
    <?php elseif (!empty($_SESSION['flashError'])): ?>
        <div class="alert alert-danger"><?php echo $_SESSION['flashError']; unset($_SESSION['flashError']); ?></div>
    <?php endif; ?>

    <div class="card p-3 mb-4">
        <h5>💾 Database Backup & Restore</h5>
        <div class="row g-3">
            <div class="col-md-6">
                <form method="post">
                    <button type="submit" name="downloadDB" class="btn btn-primary w-100">⬇️ Download Database (.sql)</button>
                </form>
            </div>
            <div class="col-md-6">
                <form method="post" enctype="multipart/form-data">
                    <input type="file" name="sqlFile" accept=".sql" class="form-control mb-2" required>
                    <button type="submit" name="restoreDB" class="btn btn-success w-100">⬆️ Upload & Restore Database</button>
                </form>
            </div>
        </div>
    </div>

    <div class="card p-3">
        <h5>🗂️ File Backup & Restore</h5>

        <form method="post" enctype="multipart/form-data">
            <div class="row g-3 align-items-end">
                <div class="col-md-4">
                    <label class="form-label">Select Folder:</label>
                    <select name="folder" class="form-select">
                        <option value="">📁 Root Directory</option>
                        <?php foreach ($folders as $f): ?>
                            <option value="<?php echo htmlspecialchars($f); ?>"><?php echo htmlspecialchars($f); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-4">
                    <button type="submit" name="downloadFiles" class="btn btn-primary w-100">⬇️ Download Folder (.zip)</button>
                </div>

                <div class="col-md-4">
                    <input type="file" name="zipFile" accept=".zip" class="form-control mb-2" required>
                    <button type="submit" name="uploadZip" class="btn btn-success w-100">⬆️ Upload & Replace Files</button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
</html>
