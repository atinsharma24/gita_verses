let currentChapter = 1;
let currentVerse = 1;
const maxChapter = 18;
const versesPerChapter = {
    1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
    10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78
};

function initializeApp() {
    document.getElementById("searchBtn").addEventListener("click", () => fetchVerse(currentChapter, currentVerse));
    document.getElementById("generateBtn").addEventListener("click", fetchRandomVerse); //changed to gen btn
    document.getElementById("nextBtn").addEventListener("click", nextVerse);
    document.getElementById("previousBtn").addEventListener("click", previousVerse);
    document.getElementById("chapterSelect").addEventListener("change", updateChapter);
    document.getElementById("mobileMenu").addEventListener("click", toggleMobileMenu);

    populateChapterSelect();
    fetchVerse(currentChapter, currentVerse);
}

function populateChapterSelect() {
    const chapterSelect = document.getElementById("chapterSelect");
    for (let i = 1; i <= maxChapter; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${i}. ${getChapterTitle(i)}`;
        chapterSelect.appendChild(option);
    }
}

async function fetchVerse(chapter, verse) {
    // https://cors-anywhere.herokuapp.com/
    // const url = `https://cors-anywhere.herokuapp.com/https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/${verse}`;
    const url = `https://api.allorigins.win/raw?url=https://www.holy-bhagavad-gita.org/chapter/${chapter}/verse/${verse}`;


    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const article = doc.querySelector('article');
        if (article) {
            displayVerse(article.innerHTML);
            currentChapter = chapter;
            currentVerse = verse;
            updateChapterSelect();
        } else {
            throw new Error('Article not found in the fetched content');
        }
    } catch (error) {
        console.error('Error fetching verse:', error);
        displayVerse('Error fetching verse. Please try again.');
    }
}

function displayVerse(content) {
    document.getElementById("sloka").innerHTML = content;
}

function updateChapterSelect() {
    document.getElementById("chapterSelect").value = currentChapter;
}

function updateChapter() {
    currentChapter = parseInt(document.getElementById("chapterSelect").value);
    currentVerse = 1;
    fetchVerse(currentChapter, currentVerse);
}

function nextVerse() {
    if (currentVerse < versesPerChapter[currentChapter]) {
        currentVerse++;
    } else if (currentChapter < maxChapter) {
        currentChapter++;
        currentVerse = 1;
    }
    fetchVerse(currentChapter, currentVerse);
}

function previousVerse() {
    if (currentVerse > 1) {
        currentVerse--;
    } else if (currentChapter > 1) {
        currentChapter--;
        currentVerse = versesPerChapter[currentChapter];
    }
    fetchVerse(currentChapter, currentVerse);
}

function fetchRandomVerse() {
    const randomChapter = Math.floor(Math.random() * maxChapter) + 1;  
    const randomVerse = Math.floor(Math.random() * versesPerChapter[randomChapter]) + 1;
    fetchVerse(randomChapter, randomVerse);
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
