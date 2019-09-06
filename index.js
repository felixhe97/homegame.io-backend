const app = require('express')();
const http = require('http').createServer(app);
const socketIOServer = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

socketIOServer.on("connection", (socket) => {
    console.log("a new connection");
    socket.on('disconnect', () => {
        console.log("a user disconnected");
    });
});

app.listen(3000, () => {
    console.log("app started, listening on 3000");
});
