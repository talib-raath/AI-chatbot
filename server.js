require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); 

app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-003/completions',
            {
                prompt: req.body.prompt,
                temperature: 0.5,
                max_tokens: 150,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
