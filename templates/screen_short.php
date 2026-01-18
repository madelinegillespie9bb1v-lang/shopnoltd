<?php
// screen_short.php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Screenshot Tracker & Uploader</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<style>
#preview { max-width: 100%; border: 1px solid #ccc; margin-top: 10px; display:block; }
</style>
</head>
<body class="p-4 bg-light">
<h4>Screenshot Tracker</h4>
<p>Take or upload a screenshot proof for your transaction.</p>

<div class="mb-3">
    <button id="captureBtn" class="btn btn-primary">Capture Screen</button>
    <button id="confirmBtn" class="btn btn-success" disabled>Confirm Screenshot</button>
    <button id="retakeBtn" class="btn btn-secondary" disabled>Retake</button>
</div>

<div class="mb-3">
    <label class="form-label">Or Upload a File</label>
    <input type="file" id="uploadFile" accept="image/*" class="form-control">
</div>

<div>
    <canvas id="canvas" style="display:none;"></canvas>
    <img id="preview" src="" alt="Preview will appear here">
</div>

<script>
let capturedDataUrl = null;

// Screen Capture
$('#captureBtn').on('click', async function() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        setTimeout(() => {
            const canvas = document.getElementById('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            capturedDataUrl = canvas.toDataURL('image/png');
            $('#preview').attr('src', capturedDataUrl).show();
            $('#confirmBtn, #retakeBtn').prop('disabled', false);
            stream.getTracks().forEach(track => track.stop());
        }, 500);
    } catch (err) {
        alert('Screen capture failed: ' + err.message);
    }
});

// File Upload Preview
$('#uploadFile').on('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            capturedDataUrl = event.target.result;
            $('#preview').attr('src', capturedDataUrl).show();
            $('#confirmBtn, #retakeBtn').prop('disabled', false);
        };
        reader.readAsDataURL(file);
    }
});

// Send screenshot back to opener
$('#confirmBtn').on('click', function() {
    if (capturedDataUrl && window.opener && !window.opener.closed) {
        window.opener.setScreenshotFromTracker(capturedDataUrl);
        window.close();
    }
});

$('#retakeBtn').on('click', function() {
    capturedDataUrl = null;
    $('#preview').attr('src', '').hide();
    $('#confirmBtn, #retakeBtn').prop('disabled', true);
});
</script>
</body>
</html>
