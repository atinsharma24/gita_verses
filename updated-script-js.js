import slokas from "./slokas.js";

let currentSlokaIndex = -1;
let currentChapter = 0;
let filteredSlokas = [];

function initializeApp() {
    document.getElementById("generateBtn").addEventListener("click", generateSloka);
    document.getElementById("randomBtn").addEventListener("click", generateRandomVerse);
    document.getElementById("nextBtn").addEventListener("click", nextSloka);
    document.getElementById("previousBtn").addEventListener("click", previousSloka);
    document.getElementById("searchBtn").addEventListener("click", searchSloka);
    document.getElementById("chapterSelect").addEventListener("change", updateChapter);
    document.getElementById("mobileMenuButton").addEventListener("click", toggleMobileMenu);

    // Populate chapter select
    const chapterSelect = document.getElementById("chapterSelect");
    for (let i = 1; i <= 18; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i}. ${getChapterTitle(i)}`;
        chapterSelect.appendChild(option);
    }

    updateChapter();
}

function updateChapter() {
    currentChapter = parseInt(document.getElementById("chapterSelect").value);
    filteredSlokas = currentChapter === 0 ? slokas : slokas.filter(sloka => sloka.startsWith(`BG ${currentChapter}.`));
    currentSlokaIndex = -1;
    displaySloka("Select 'Generate Sloka' to begin reading from this chapter.");
}

function generateSloka() {
    if (filteredSlokas.length === 0) {
        displaySloka("No slokas available for the selected chapter.");
        return;
    }
    currentSlokaIndex = Math.floor(Math.random() * filteredSlokas.length);
    displaySloka(filteredSlokas[currentSlokaIndex]);
}

function generateRandomVerse() {
    const randomIndex = Math.floor(Math.random() * slokas.length);
    displaySloka(slokas[randomIndex]);
    // Update the chapter select to match the randomly selected verse
    const chapterNumber = parseInt(slokas[randomIndex].split('.')[0].split(' ')[1]);
    document.getElementById("chapterSelect").value = chapterNumber;
    updateChapter();
    currentSlokaIndex = filteredSlokas.indexOf(slokas[randomIndex]);
}

function nextSloka() {
    if (filteredSlokas.length === 0 || currentSlokaIndex === -1) return;
    currentSlokaIndex = (currentSlokaIndex + 1) % filteredSlokas.length;
    displaySloka(filteredSlokas[currentSlokaIndex]);
}

function previousSloka() {
    if (filteredSlokas.length === 0 || currentSlokaIndex === -1) return;
    currentSlokaIndex = (currentSlokaIndex - 1 + filteredSlokas.length) % filteredSlokas.length;
    displaySloka(filteredSlokas[currentSlokaIndex]);
}

function searchSloka() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = filteredSlokas.filter(sloka => sloka.toLowerCase().includes(searchTerm));
    
    if (searchResults.length > 0) {
        currentSlokaIndex = filteredSlokas.indexOf(searchResults[0]);
        displaySloka(searchResults[0]);
    } else {
        displaySloka("No matching slokas found.");
    }
}

function displaySloka(text) {
    document.getElementById("sloka").textContent = text;
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("hidden");
}

function getChapterTitle(chapterNumber) {
    const titles = [
        "Arjuna Vishada Yoga", "Sankhya Yoga", "Karma Yoga", "Gnana-Karma-Sanyasa Yoga",
        "Karma-Sanyasa Yoga", "Atma-Samyama Yoga", "Gnana-Vignana Yoga", "Aksara-ParaBrahma Yoga",
        "Raja-Vidya-Raja-Guhya Yoga", "Vibhuti Yoga", "Vishwarupa-Darsana Yoga", "Bhakti Yoga",
        "Ksetra-Ksetrajna-Vibhaga Yoga", "Gunatraya-Vibhaga Yoga", "Purushottama Yoga",
        "Daivasura-Sampad-Vibhaga Yoga", "Shraddhatraya-Vibhaga Yoga", "Moksha-Sanyasa Yoga"
    ];
    return titles[chapterNumber - 1];
}

initializeApp();
