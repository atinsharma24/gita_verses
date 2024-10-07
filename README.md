# Gita Verse Fetcher

<!-- ![Gita Verse Fetcher](https://i.imgur.com/IXrOvog.jpg) -->

<img src="https://i.imgur.com/IXrOvog.jpg" alt="Gita Verse Fetcher" style="max-width: 100%; height: auto;" />



<!-- [Imgur](https://i.imgur.com/IXrOvog.jpg) -->

Welcome to the Gita Verse Fetcher, an interactive web application designed to explore the profound spiritual wisdom of the Bhagavad Gita – an ancient Indian scripture. The Bhagavad Gita is presented as a conversation between Prince Arjuna and Lord Krishna, who serves as his charioteer. This dialogue takes place on the battlefield of Kurukshetra, just before a great war between two factions of the same royal family, the Pandavas, and the Kauravas. The Gita addresses timeless philosophical questions, offering guidance on duty, righteousness, self-realization, devotion, knowledge, and selfless action.

## Features

1. **Chapter Selection:** You can choose a specific chapter from the Bhagavad Gita using a user-friendly dropdown menu. The selected chapter will be displayed alongside its title.

2. **Verse Display:** After selecting a chapter, you can read the verses (shlokas) from that particular chapter. The verses are displayed one by one, enabling you to dive into the profound teachings of each section.

3. **Navigation:** The application provides navigation buttons for easy browsing between verses. You can move to the next verse, the previous one, or even fetch a random verse for a serendipitous reading experience.

## Technologies Used

1. **HTML:** The project's structure and content are created using Hypertext Markup Language (HTML).

2. **CSS (Tailwind CSS):** To enhance the visual appeal and responsiveness of the application, we utilized Tailwind CSS, a popular utility-first CSS framework.

3. **JavaScript:** The interactive functionality of the Gita Verse Fetcher is powered by JavaScript. It enables the dynamic selection and display of verses based on user interactions.

4. **React:** A JavaScript library for building user interfaces. React helps in creating reusable UI components, making it easier to manage the state and lifecycle of your application.

5. **Web Hosting:** The web application is hosted on a web server, making it accessible to users across the internet.

## About the Project

The Gita Verse Fetcher project aims to make the profound teachings of the Bhagavad Gita easily accessible to people from diverse backgrounds. By offering chapter-wise verse reading and a user-friendly interface, we hope to promote the understanding and appreciation of this timeless spiritual scripture.

Whether you are seeking spiritual insights, philosophical guidance, or simply interested in exploring ancient wisdom, the Gita Verse Fetcher provides a valuable resource for your spiritual journey. Delve into the wisdom of the Gita, reflect on its teachings, and find inspiration for leading a purposeful and meaningful life. Enjoy your exploration of the Bhagavad Gita!

## How to Fetch Data in React

In the Gita Verse Fetcher, data fetching is a crucial component that allows users to retrieve verses from the Bhagavad Gita. Here’s a brief overview of how data fetching is implemented using React.

### Setting Up the Project

1. **Create a New React App**: Use Create React App to set up a new project.

   ```bash
   npx create-react-app gita-verse-fetcher
   cd gita-verse-fetcher
   ```

2. **Install Axios**: We use Axios, a promise-based HTTP client for the browser and Node.js, to fetch data.

   ```bash
   npm install axios
   ```

### Fetching Data

#### Sample Code

Here’s an example of how you can fetch verses from an API endpoint (assuming you have an API that serves the verses):

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerseFetcher = () => {
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVerse(chapter);
    }, [chapter]);

    const fetchVerse = async (chapter) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.example.com/gita/verses?chapter=${chapter}`);
            setVerse(response.data.verse); // Assuming response structure has 'verse'
        } catch (error) {
            console.error("Error fetching the verse:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChapterChange = (e) => {
        setChapter(e.target.value);
    };

    return (
        <div>
            <h1>Gita Verse Fetcher</h1>
            <select onChange={handleChapterChange}>
                <option value={1}>Chapter 1</option>
                <option value={2}>Chapter 2</option>
                {/* Add more options for other chapters */}
            </select>
            {loading ? <p>Loading...</p> : <p>{verse}</p>}
        </div>
    );
};

export default VerseFetcher;
```

### Explanation of the Code

- **State Management**: We use the `useState` hook to manage `chapter`, `verse`, and `loading` states.

- **Fetching Data**: The `fetchVerse` function is called whenever the selected chapter changes. It uses Axios to make a GET request to the API and retrieves the verse for the selected chapter.

- **Loading State**: While the data is being fetched, a loading message is displayed. Once the data is retrieved, the verse is displayed.

- **User Interaction**: A dropdown menu allows users to select the chapter they wish to fetch.

### Running the Application

1. **Start the Development Server**:

   ```bash
   npm start
   ```

2. **Open in Browser**: Visit `http://localhost:3000` to see your Gita Verse Fetcher in action!

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes and commit them (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to the mentors and contributors who helped shape this project.
- Inspiration from various open-source projects.

## Contact

For any queries or feedback, feel free to reach out at:

- Email: atinsharma24@gmail.com
- GitHub: [atinsharma24](https://github.com/atinsharma24)
```

