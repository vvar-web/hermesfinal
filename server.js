const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const NEWS_API_KEY = 'your_api_key_here'; // Replace with your NewsAPI key

app.get('/', async (req, res) => {
    const { country, category, q } = req.query; // Query parameters
    const baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(baseUrl, {
            params: { country, category, q }
        });

        const articles = response.data.articles.slice(0, 5); // Fetch top 5 articles

        let htmlContent = '<h1>Latest News Articles</h1>';
        articles.forEach(article => {
            htmlContent += `
                <div>
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
                <hr>
            `;
        });

        res.send(htmlContent); // Send HTML page
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news articles');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
