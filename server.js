import express from "express";
import { postToInstagram, createLongTermToken } from "./post_to_instagram.js";

const app = express();
const PORT = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route for the home page
app.get('/', (req, res) => {
    res.send('Everything Okey');
});

// Route for a "about" page
app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/post', (req, res) => {
    postToInstagram(req.query.image, req.query.caption);
    res.send('Post page');
});

app.get('/token', async(req, res) => {
    const data = await createLongTermToken(req.query.token);
    process.env.ACCESS_TOKEN = data.access_token
    console.log('TOKEN', data);
    res.send('Token page');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
