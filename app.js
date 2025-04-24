const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if needed)
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1>Latest News</h1>
        <form action="/news" method="get">
            <input type="text" name="query" placeholder="Enter country, category, or keyword" required>
            <button type="submit">Get News</button>
        </form>
    `);
});

// News route
app.get('/news', async (req, res) => {
    const query = req.query.query;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles.slice(0, 5); // Get the latest 5 articles

        let newsHtml = '<h1>Latest News Articles</h1>';
        articles.forEach(article => {
            newsHtml += `
                <div>
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
                <hr>
            `;
        });

        res.send(newsHtml);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news articles');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
