// Get the image preview container and the preview image element
const imagePreviewContainer = document.querySelector('.image-preview-container');
const previewImageElement = document.getElementById('preview-selected-image');

// Create a Cropper instance for the preview image element


previewImageElement.addEventListener('load', () => {
    cropper = new Cropper(previewImageElement, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 0.5,
    });
});

// Handle the file upload input
const fileUploadInput = document.getElementById('file-upload');
fileUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        // Create an image element to preview the uploaded image
        const img = document.createElement('img');
        img.id = 'image';
        img.src = event.target.result;
        console.log(img.src)

        /**
        * Assign the path to the image preview element.
        */
        // clean result before
        previewImageElement.innerHTML = '';
        previewImageElement.src = img.src;
        previewImageElement.appendChild(img);

        /**
        * Show the element by changing the display value to "block".
        */
        previewImageElement.style.display = "block";

        // Create a Cropper instance for the preview image element
        cropper = new Cropper(previewImageElement, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 0.5,
        });
    };

    reader.readAsDataURL(file);
});
