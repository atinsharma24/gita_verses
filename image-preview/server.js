const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'images' directory
// app.use('/images', express.static('images'));

// Serve static files from the root directory
app.use(express.static(__dirname));  // Serves index.html, styles.css, script.js, and images


// Endpoint to get the list of image files
app.get('/images-list', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
