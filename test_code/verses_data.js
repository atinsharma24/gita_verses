// Data structure to hold number of verses for each chapter
const slokasData = {
    chapter1: { title: "Chapter 1: Arjuna's Dilemma", verses: 47 },
    chapter2: { title: "Chapter 2: The Yoga of Knowledge", verses: 72 },
    chapter3: { title: "Chapter 3: The Yoga of Action", verses: 43 },
    chapter4: { title: "Chapter 4: The Yoga of Knowledge and the Knowledge of the Ultimate", verses: 42 },
    chapter5: { title: "Chapter 5: The Yoga of Renunciation", verses: 29 },
    chapter6: { title: "Chapter 6: The Yoga of Meditation", verses: 47 },
    chapter7: { title: "Chapter 7: The Yoga of Knowledge and Wisdom", verses: 30 },
    chapter8: { title: "Chapter 8: The Yoga of the Imperishable Absolute", verses: 28 },
    chapter9: { title: "Chapter 9: The Yoga of Royal Knowledge and Royal Secret", verses: 34 },
    chapter10: { title: "Chapter 10: The Yoga of Divine Glories", verses: 42 },
    chapter11: { title: "Chapter 11: The Yoga of the Vision of the Universal Form", verses: 55 },
    chapter12: { title: "Chapter 12: The Yoga of Devotion", verses: 20 },
    chapter13: { title: "Chapter 13: The Yoga of the Field and the Knower of the Field", verses: 34 },
    chapter14: { title: "Chapter 14: The Yoga of the Three Gunas", verses: 27 },
    chapter15: { title: "Chapter 15: The Yoga of the Supreme Person", verses: 20 },
    chapter16: { title: "Chapter 16: The Yoga of the Divine and the Non-Divine", verses: 24 },
    chapter17: { title: "Chapter 17: The Yoga of Threefold Faith", verses: 28 },
    chapter18: { title: "Chapter 18: The Yoga of Liberation", verses: 78 },
};

const chapterSelect = document.getElementById('chapterSelect');
const verseSelect = document.getElementById('verseSelect');
const slokaDisplay = document.getElementById('slokaDisplay');

chapterSelect.addEventListener('change', function() {
    const selectedChapter = this.value;
    verseSelect.innerHTML = '<option value="" disabled selected>Select a Verse</option>'; // Reset verse dropdown
    if (selectedChapter) {
        const versesCount = slokasData[selectedChapter].verses;
        for (let i = 1; i <= versesCount; i++) {
            verseSelect.innerHTML += `<option value="${i}">${i}</option>`;
        }
        verseSelect.disabled = false; // Enable verse dropdown
    }
});

document.getElementById('displaySloka').addEventListener('click', function() {
    const selectedVerse = verseSelect.value;
    const selectedChapter = chapterSelect.value;

    if (selectedVerse) {
        slokaDisplay.innerHTML = `<h3>${slokasData[selectedChapter].title}</h3><p>Sloka ${selectedVerse}</p>`;
    }
});

// Event listeners for next and previous slokas
let currentVerseIndex = -1;

verseSelect.addEventListener('change', function() {
    currentVerseIndex = parseInt(this.value);
});

document.getElementById('nextSloka').addEventListener('click', function() {
    if (currentVerseIndex < verseSelect.options.length - 2) {
        currentVerseIndex++;
        verseSelect.selectedIndex = currentVerseIndex + 1; // +1 because of the placeholder
        verseSelect.dispatchEvent(new Event('change')); // Trigger change to display new sloka
    }
});

document.getElementById('prevSloka').addEventListener('click', function() {
    if (currentVerseIndex > 0) {
        currentVerseIndex--;
        verseSelect.selectedIndex = currentVerseIndex + 1; // +1 because of the placeholder
        verseSelect.dispatchEvent(new Event('change')); // Trigger change to display new sloka
    }
});

document.getElementById('randomSloka').addEventListener('click', function() {
    const selectedChapter = chapterSelect.value;
    currentVerseIndex = Math.floor(Math.random() * slokasData[selectedChapter].verses) + 1; // Random index from 1 to verses count
    verseSelect.selectedIndex = currentVerseIndex; // Set selected index
    verseSelect.dispatchEvent(new Event('change')); // Trigger change to display new sloka
});
