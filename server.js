import express from "express";
import bodyParser from "body-parser";

import { postToInstagram, createLongTermToken } from "./post-to-instagram.js";

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Everything Okey');
});

app.post('/post', (req, res) => {
    postToInstagram(req.body.image, req.body.caption);
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
