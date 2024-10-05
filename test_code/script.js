// Base URL for fetching slokas data
// const baseUrl = "https://www.holy-bhagavad-gita.org/chapter";
const baseUrl = "https://cors-anywhere.herokuapp.com/https://www.holy-bhagavad-gita.org/chapter"

// Function to fetch slokas data dynamically based on chapter and verse
async function fetchArticle(chapter, verse) {
    const slokasUrl = `${baseUrl}/${chapter}/verse/${verse}`; // Constructing the dynamic URL
    try {
        const response = await fetch(slokasUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text(); // Fetching as text
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const article = doc.querySelector('article'); // Extracting the <article> tag
        return article ? article.innerHTML : 'No article found'; // Return inner HTML of the article
    } catch (error) {
        console.error('Error fetching article:', error);
        return 'Error fetching article.';
    }
}

// Populate the chapter selection dropdown
async function populateChapters() {
    const chapters = await fetchChapters(); // Function to fetch chapters data (assuming you have this)
    const chapterSelect = document.getElementById("chapterSelect");

    if (chapters) {
        chapters.forEach(chapter => {
            const option = document.createElement("option");
            option.value = chapter.number; // Assuming chapter.number is the unique identifier
            option.textContent = `${chapter.title} - Chapter ${chapter.number}`;
            chapterSelect.appendChild(option);
        });
    }
}

// Display article based on the selected chapter and verse
async function displayArticle(chapterNumber, verseNumber) {
    const slokasContainer = document.getElementById("slokasContainer");
    const articleContent = await fetchArticle(chapterNumber, verseNumber); // Fetch the article content

    slokasContainer.innerHTML = articleContent; // Display the fetched article content
}

// Event listener for chapter selection change
document.getElementById("chapterSelect").addEventListener("change", (event) => {
    const chapterNumber = parseInt(event.target.value);
    const verseNumber = 69; // Set the default verse number you want to display
    // Fetch and display the article of the selected chapter
    displayArticle(chapterNumber, verseNumber);
});

// Call to populate the chapters on page load
window.onload = populateChapters;
