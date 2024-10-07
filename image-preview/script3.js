let currentIndex = 0;
let images = [];
let fading = false; // Track if a fade is happening

// Fetch images from the server
fetch('/images-list')
    .then(response => response.json())
    .then(data => {
        images = data;
        updateBackground();
        startSlideshow(); // Start the slideshow after fetching images
    })
    .catch(error => console.error('Error fetching images:', error));

// // Function to update background image with fade effect
// function updateBackground() {
//     if (images.length === 0 || fading) return; // Do not update if fading

//     fading = true; // Set fading state
//     const nextIndex = (currentIndex + 1) % images.length;
//     const currentImageUrl = `images/${images[currentIndex]}`;
//     const nextImageUrl = `images/${images[nextIndex]}`;

//     document.getElementById('imagePreview').style.backgroundImage = `url(${currentImageUrl})`;

//     // Preload next image
//     const img = new Image();
//     img.src = nextImageUrl;

//     img.onload = () => {
//         // Change to next image with a fade effect
//         setTimeout(() => {
//             document.getElementById('imagePreview').style.backgroundImage = `url(${nextImageUrl})`;
//             currentIndex = nextIndex; // Update current index
//             fading = false; // Reset fading state
//         }, 1000); // Change after 1 second
//     };
// }

function updateBackground() {
    if (images.length === 0) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const currentImageUrl = `images/${images[currentIndex]}`;
    const nextImageUrl = `images/${images[nextIndex]}`;

    // Create a new div for the next image
    const nextImageDiv = document.createElement('div');
    nextImageDiv.className = 'slide';
    nextImageDiv.style.backgroundImage = `url(${nextImageUrl})`;
    nextImageDiv.style.position = 'absolute';
    nextImageDiv.style.top = 0;
    nextImageDiv.style.left = '100%'; // Start from right side
    nextImageDiv.style.transition = 'transform 1s ease-in-out';

    document.getElementById('imagePreview').appendChild(nextImageDiv);

    // Trigger the sliding effect
    setTimeout(() => {
        nextImageDiv.style.transform = 'translateX(-100%)'; // Slide in from the right
        document.getElementById('imagePreview').style.backgroundImage = `url(${currentImageUrl})`;
        currentIndex = nextIndex; // Update current index
    }, 50);

    setTimeout(() => {
        nextImageDiv.remove(); // Clean up after transition
    }, 1000); // Wait for the transition to finish
}


// Function to start the slideshow
function startSlideshow() {
    setInterval(updateBackground, 5000); // Change image every 5 seconds
}

// Optional: Add an event listener to a button to ride the webpage
document.getElementById('rideButton').addEventListener('click', () => {
    alert("Enjoy the ride!");
});
