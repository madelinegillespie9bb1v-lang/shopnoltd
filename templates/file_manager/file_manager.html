<?php
// Base directory for the file manager (set this to your root directory or limit access).
$baseDirectory = __DIR__;

// Current directory (default to base directory if not provided).
$currentDirectory = isset($_GET['dir']) ? realpath($baseDirectory . DIRECTORY_SEPARATOR . $_GET['dir']) : $baseDirectory;

// Ensure the user doesn't escape the base directory.
if (strpos($currentDirectory, $baseDirectory) !== 0) {
    $currentDirectory = $baseDirectory;
}

// Handle file actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $file = $_POST['file'] ?? '';
    $filePath = realpath($currentDirectory . DIRECTORY_SEPARATOR . $file);
    $content = $_POST['content'] ?? '';

    // Ensure file path is valid and inside the base directory
    if (strpos($filePath, $baseDirectory) === 0) {
        switch ($action) {
            case 'edit':
                // Save file content
                file_put_contents($filePath, $content);
                echo "File saved successfully.";
                break;

            case 'delete':
                // Delete file
                if (unlink($filePath)) {
                    echo "File deleted successfully.";
                } else {
                    echo "Error deleting file.";
                }
                break;

            case 'copy':
                // Copy file
                $destination = $_POST['destination'];
                $destinationPath = $currentDirectory . DIRECTORY_SEPARATOR . $destination;
                if (copy($filePath, $destinationPath)) {
                    echo "File copied successfully.";
                } else {
                    echo "Error copying file.";
                }
                break;

            case 'download':
                // Download file
                if (file_exists($filePath)) {
                    header('Content-Description: File Transfer');
                    header('Content-Type: application/octet-stream');
                    header('Content-Disposition: attachment; filename=' . basename($filePath));
                    header('Expires: 0');
                    header('Cache-Control: must-revalidate');
                    header('Pragma: public');
                    header('Content-Length: ' . filesize($filePath));
                    readfile($filePath);
                    exit;
                } else {
                    echo "File not found.";
                }
                break;
        }
    }
}

// Get the list of files and folders in the current directory
$filesAndFolders = array_diff(scandir($currentDirectory), array('.', '..'));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Manager</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        form {
            display: inline-block;
            margin: 0;
        }
        .folder {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>File Manager</h1>

    <!-- Navigation -->
    <p>
        Current Directory: <strong><?php echo htmlspecialchars($currentDirectory); ?></strong>
    </p>
    <?php if ($currentDirectory !== $baseDirectory): ?>
        <p>
            <a href="?dir=<?php echo urlencode(dirname(str_replace($baseDirectory, '', $currentDirectory))); ?>">🔙 Back</a>
        </p>
    <?php endif; ?>

    <!-- File and Folder Table -->
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($filesAndFolders as $item): ?>
                <?php $itemPath = $currentDirectory . DIRECTORY_SEPARATOR . $item; ?>
                <tr>
                    <td>
                        <?php if (is_dir($itemPath)): ?>
                            <a class="folder" href="?dir=<?php echo urlencode(str_replace($baseDirectory, '', $itemPath)); ?>">
                                📁 <?php echo htmlspecialchars($item); ?>
                            </a>
                        <?php else: ?>
                            <?php echo htmlspecialchars($item); ?>
                        <?php endif; ?>
                    </td>
                    <td><?php echo is_dir($itemPath) ? 'Folder' : 'File'; ?></td>
                    <td>
                        <?php if (!is_dir($itemPath)): ?>
                            <!-- Edit File -->
                            <form action="" method="post">
                                <input type="hidden" name="action" value="edit">
                                <input type="hidden" name="file" value="<?php echo htmlspecialchars($item); ?>">
                                <button type="submit">Edit</button>
                            </form>

                            <!-- Download File -->
                            <form action="" method="post">
                                <input type="hidden" name="action" value="download">
                                <input type="hidden" name="file" value="<?php echo htmlspecialchars($item); ?>">
                                <button type="submit">Download</button>
                            </form>

                            <!-- Delete File -->
                            <form action="" method="post">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="file" value="<?php echo htmlspecialchars($item); ?>">
                                <button type="submit">Delete</button>
                            </form>

                            <!-- Copy File -->
                            <form action="" method="post">
                                <input type="hidden" name="action" value="copy">
                                <input type="hidden" name="file" value="<?php echo htmlspecialchars($item); ?>">
                                <input type="text" name="destination" placeholder="Copy to">
                                <button type="submit">Copy</button>
                            </form>
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- File Editor -->
    <?php if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'edit' && is_file($filePath)): ?>
        <h2>Editing File: <?php echo htmlspecialchars($file); ?></h2>
        <form action="" method="post">
            <textarea name="content" rows="20" cols="100"><?php echo htmlspecialchars(file_get_contents($filePath)); ?></textarea><br>
            <input type="hidden" name="action" value="edit">
            <input type="hidden" name="file" value="<?php echo htmlspecialchars($file); ?>">
            <button type="submit">Save</button>
        </form>
    <?php endif; ?>
</body>
</html>
