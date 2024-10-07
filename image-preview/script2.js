let currentIndex = 0;
let images = [];

// Fetch images from the server
fetch('/images-list')
    .then(response => response.json())
    .then(data => {
        images = data;
        updateBackground();
    })
    .catch(error => console.error('Error fetching images:', error));

// Function to update background image
function updateBackground() {
    if (images.length === 0) return; // Ensure images array is not empty
    const imageUrl = `/images/${images[currentIndex]}`; // Correct path to images
    document.getElementById('imagePreview').style.backgroundImage = `url(${imageUrl})`;
}

// Handle Next button click
document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; // Move to the next image
    console.log('Current Index:', currentIndex, 'Image:', images[currentIndex]);
    updateBackground();
});

// Handle Previous button click
document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the previous image
    console.log('Current Index:', currentIndex, 'Image:', images[currentIndex]);
    updateBackground();
});
