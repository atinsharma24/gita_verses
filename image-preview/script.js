let currentIndex = 0;
let images = [];

fetch('/images-list')
    .then(response => response.json())
    .then(data => {
        images = data;
        updateBackground();
    })
    .catch(error => console.error('Error fetching images:', error));

function updateBackground() {
    if (images.length === 0) return;
    const imageUrl = `images/${images[currentIndex]}`;
    document.getElementById('imagePreview').style.backgroundImage = `url(${imageUrl})`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateBackground();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateBackground();
});
