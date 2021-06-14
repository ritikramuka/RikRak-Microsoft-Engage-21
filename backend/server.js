const express = require('express');
const app = express();
const io = require('socket.io');

const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello Everyone!');
});

app.listen(port, () => {
    console.log(`app running on port ${port}`);
});