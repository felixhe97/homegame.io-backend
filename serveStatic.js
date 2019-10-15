const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

const path = require('path');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

httpServer.listen(port, () => {
    console.log(`app started, listening on ${port}`);
});

module.exports = httpServer;