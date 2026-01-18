<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';

$username = $_SESSION['user']['username'] ?? 'guest';
$section = $_GET['section'] ?? 'misc'; // you can pass ?section=fund or withdraw

// Handle file save if posted via Base64
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['imageData'])) {
    $data = $_POST['imageData'];
    if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
        $data = substr($data, strpos($data, ',') + 1);
        $type = strtolower($type[1]); // jpg, png, gif
        $data = base64_decode($data);
        if ($data === false) die('Base64 decode failed');

        $folder = $_SERVER['DOCUMENT_ROOT']."/uploads/$username/$section/".date('Y/m/d');
        if (!is_dir($folder)) mkdir($folder, 0755, true);

        $fileName = time()."_".uniqid().".".$type;
        $filePath = "$folder/$fileName";

        file_put_contents($filePath, $data);

        // Return relative path to parent window
        $relativePath = str_replace($_SERVER['DOCUMENT_ROOT'], '', $filePath);
        echo "<script>window.opener.setScreenshotFromTracker('{$relativePath}');window.close();</script>";
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Screenshot Tracker & Uploader</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<style>
#preview { max-width: 100%; max-height: 80vh; border: 1px solid #ccc; display:block; margin-top:10px; cursor:pointer; }
#canvas { display:none; }
</style>
</head>
<body class="p-4 bg-light">
<h4>Screenshot Tracker</h4>
<p>Take or upload a screenshot proof for your transaction.</p>

<div class="mb-3">
    <button id="captureBtn" class="btn btn-primary">Capture Full Screen</button>
    <button id="confirmBtn" class="btn btn-success" disabled>Confirm Screenshot</button>
    <button id="retakeBtn" class="btn btn-secondary" disabled>Retake</button>
</div>

<div class="mb-3">
    <label class="form-label">Or Upload a File</label>
    <input type="file" id="uploadFile" accept="image/*" class="form-control">
</div>

<div>
    <canvas id="canvas"></canvas>
    <img id="preview" src="" alt="Preview will appear here">
</div>

<script>
let capturedDataUrl = null;

$('#captureBtn').on('click', async function() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" } });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();
        video.addEventListener('loadedmetadata', () => {
            const canvas = document.getElementById('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            capturedDataUrl = canvas.toDataURL('image/png');
            $('#preview').attr('src', capturedDataUrl).show();
            $('#confirmBtn, #retakeBtn').prop('disabled', false);
            stream.getTracks().forEach(track => track.stop());
        });
    } catch(err) { alert('Screen capture failed: ' + err.message); }
});

$('#uploadFile').on('change', function(e){
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(evt){
            capturedDataUrl = evt.target.result;
            $('#preview').attr('src', capturedDataUrl).show();
            $('#confirmBtn, #retakeBtn').prop('disabled', false);
        };
        reader.readAsDataURL(file);
    }
});

$('#confirmBtn').on('click', function(){
    if(!capturedDataUrl) return;
    $.post(window.location.href, { imageData: capturedDataUrl }, function(){});
});

$('#retakeBtn').on('click', function(){
    capturedDataUrl = null;
    $('#preview').attr('src','').hide();
    $('#confirmBtn, #retakeBtn').prop('disabled', true);
});

$('#preview').on('click', function(){
    const src = $(this).attr('src');
    if(src){ const zoomWin = window.open('', '_blank'); zoomWin.document.write(`<img src="${src}" style="width:100%;height:auto;">`);}
});
</script>
</body>
</html>
