const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const socketIOServer = require('socket.io')(httpServer);

const path = require('path');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

socketIOServer.on("connection", (socket) => {

    socket.on('add user', (username) => {
        if (socket.username) {
            return;
        } else {
            socket.username = username;
            socket.broadcast.emit('user joined', {
                username: socket.username
            });
        }
    });

    socket.on('chat message', (message) => {
        if (message && message.text) {
            socketIOServer.emit('chat message', {
                username: socket.username,
                text: message.text
            });
        }
        /*
        socket.broadcast.emit('chat message', {
            username: socket.username,
            message: message.text
        });
        */
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user left', socket.username);
    });
});


httpServer.listen(port, () => {
    console.log(`app started, listening on ${port}`);
});
