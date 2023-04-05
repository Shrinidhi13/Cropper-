$(document).ready(function () {
    $("body").on("change", "#browse_image", function (e) {
        var files = e.target.files;
        var done = function (url) {
            $('#display_image_div').html('');
            $("#display_image_div").html('<img name="display_image_data" id="display_image_data" src="' + url + '" alt="Uploaded Picture">');
        };
        if (files && files.length > 0) {
            var file = files[0];
            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
        var image = document.getElementById('display_image_data');
        var button = document.getElementById('crop_button');
        var result = document.getElementById('cropped_image_result');
        var croppable = false;
        var cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            ready: function () {
                croppable = true;
            },
        });
        button.onclick = function () {
            var croppedCanvas;
            var roundedCanvas;
            var roundedImage;
            if (!croppable) {
                return;
            }
            // Crop
            croppedCanvas = cropper.getCroppedCanvas();
            // Round
            roundedCanvas = getRoundedCanvas(croppedCanvas);
            // Show
            roundedImage = document.createElement('img');
            roundedImage.src = roundedCanvas.toDataURL();
            result.innerHTML = '';
            result.appendChild(roundedImage);
        };
    });

    function getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
    }
});

function download() {
    var linkSource = $('#cropped_image_result img').attr('src');
    var fileName = 'download.png';
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}
