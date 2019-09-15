  
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const socketIOServer = require('socket.io')(httpServer);

const Player = require('./src/player');

const path = require('path');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

socketIOServer.on("connection", (socket) => {
    socket.on('add user', (username) => {
        if (socket.player) {
            return;
        } else {
            socket.player = new Player(username, 1000);
            socket.broadcast.emit('user joined', {
                username: socket.player.username,
                numPeople: 231312
            });
        }
    });

    socket.on('chat message', (message) => {
        if (message && message.text) {
            socketIOServer.emit('chat message', {
                username: socket.player.username,
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
        socket.broadcast.emit('user left', {
            username: socket.username,
            numPeople: 1321321
        });
    });
});


httpServer.listen(port, () => {
    console.log(`app started, listening on ${port}`);
});