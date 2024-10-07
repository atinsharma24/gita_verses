let currentIndex = 0;
let images = [];

// Fetch images from the server
fetch('/images-list') // Make sure to fetch from the correct endpoint
    .then(response => response.json())
    .then(data => {
        images = data;
        updateBackground();
        startSlideshow(); // Start the slideshow once images are loaded
    })
    .catch(error => console.error('Error fetching images:', error));

// Function to update background image
function updateBackground() {
    if (images.length === 0) return;
    const imageUrl = `images/${images[currentIndex]}`;
    document.getElementById('imagePreview').style.backgroundImage = `url(${imageUrl})`;
}

// Start the slideshow
function startSlideshow() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Cycle to the next image
        updateBackground();
    }, 2000); // Change image every 5 seconds
}

// Optional: If you want to include a button to pause or interact with the slideshow
document.getElementById('clickMe').addEventListener('click', () => {
    // You can add any interaction you want here
    alert('Ride the wave of images!');
});

let isPaused = false;

document.getElementById('clickMe').addEventListener('click', () => {
    isPaused = !isPaused; // Toggle pause state
    if (isPaused) {
        clearInterval(slideshowInterval);
        document.getElementById('clickMe').textContent = 'Resume Slideshow';
    } else {
        startSlideshow();
        document.getElementById('clickMe').textContent = 'Pause Slideshow';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length; // Next image
        updateBackground();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Previous image
        updateBackground();
    }
});


