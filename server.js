const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Your NewsAPI key
const API_KEY = 'dae9fd5fab0f4466a9a26c038bf57d98';

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Fetch news based on user input
app.get('/news', async (req, res) => {
    const { query, country, category } = req.query; // Accept user query parameters
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&q=${query}&country=${country}&category=${category}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles.slice(0, 5); // Fetch and limit to 5 articles

        let output = '<h1>Latest News</h1>';
        articles.forEach(article => {
            output += `<h2>${article.title}</h2>
                       <p>${article.description}</p>
                       <a href="${article.url}" target="_blank">Read More</a>`;
        });

        res.send(output);
    } catch (error) {
        res.status(500).send('Error fetching news. Please check your input or try again later.');
    }
});

// Display the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
