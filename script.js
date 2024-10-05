// slokas.js would still contain the slokas as fallback data
import slokas from "./slokas.js";

let currentSlokaIndex = -1; // Initialize index to -1 to indicate no sloka displayed yet

let fetchedSlokas = []; // Store fetched slokas

async function fetchAndDisplaySlokaFromArticle(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const articleTag = doc.querySelector("article");

    if (articleTag) {
      const slokaElement = document.getElementById("sloka");
      slokaElement.innerHTML = articleTag.innerHTML; // Replace current content with article content

      // Extract slokas from the article tag
      fetchedSlokas = Array.from(articleTag.querySelectorAll("some-selector")) // Adjust 'some-selector' to fit your content
        .map((element) => element.innerText); // Assuming slokas are in the selected elements

      displaySloka(); // Call to display the first fetched sloka
    } else {
      console.error("No article tag found in the fetched document.");
      displaySlokaFallback();
    }
  } catch (error) {
    console.error("Failed to fetch and display the article:", error);
    displaySlokaFallback();
  }
}

function displaySloka() {
  const slokaElement = document.getElementById("sloka");

  if (fetchedSlokas.length > 0) {
    currentSlokaIndex = (currentSlokaIndex + 1) % fetchedSlokas.length; // Loop through slokas
    slokaElement.innerText = fetchedSlokas[currentSlokaIndex];
  } else {
    slokaElement.innerText = "No slokas available.";
  }
}

function displaySlokaFallback() {
  generateSloka();
}

function generateSloka() {
  const chapterSelect = document.getElementById("chapterSelect");
  const selectedChapter = parseInt(chapterSelect.value);
  let filteredSlokas = slokas;

  if (selectedChapter !== 0) {
    filteredSlokas = slokas.filter((sloka) =>
      sloka.startsWith(`BG ${selectedChapter}.`)
    );
  }

  const slokaElement = document.getElementById("sloka");

  if (filteredSlokas.length === 0) {
    slokaElement.innerText = "No slokas found for the selected chapter.";
  } else {
    currentSlokaIndex = Math.floor(Math.random() * filteredSlokas.length);
    slokaElement.innerText = filteredSlokas[currentSlokaIndex];
  }
}

// Event listener for the button to fetch slokas dynamically
document.getElementById("generateBtn").addEventListener("click", function () {
  const chapter = document.getElementById("chapterInput").value; // User input for chapter
  const verse = document.getElementById("verseInput").value; // User input for verse

  // Construct the URL based on user input
  const externalUrl = `https://cors-anywhere.herokuapp.com/https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/${verse}`;
  // const baseUrl = "https://cors-anywhere.herokuapp.com/https://www.holy-bhagavad-gita.org/chapter"

  

  fetchAndDisplaySlokaFromArticle(externalUrl);
});

// Navigation buttons for next and previous slokas
document.getElementById("nextBtn").addEventListener("click", nextSloka);
document.getElementById("previousBtn").addEventListener("click", previousSloka);
document.getElementById("searchBtn").addEventListener("click", searchSloka);

function nextSloka() {
  if (fetchedSlokas.length === 0) return;
  currentSlokaIndex = (currentSlokaIndex + 1) % fetchedSlokas.length; // Cycle to the next
  document.getElementById("sloka").innerText = fetchedSlokas[currentSlokaIndex];
}

function previousSloka() {
  if (fetchedSlokas.length === 0) return;
  currentSlokaIndex = (currentSlokaIndex - 1 + fetchedSlokas.length) % fetchedSlokas.length; // Cycle to the previous
  document.getElementById("sloka").innerText = fetchedSlokas[currentSlokaIndex];
}

function searchSloka() {
  // Placeholder for search functionality if needed
  console.log("Search functionality to be implemented.");
}
