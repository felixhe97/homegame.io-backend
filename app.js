const serveStatic = require('./serveStatic');
const socketIOServer = require('socket.io')(serveStatic);

const Player = require('./src/player');

// all SocketIO things should be here only
socketIOServer.on("connection", (socket) => {
    // authenticate with SQL serverndex

    socket.on('add user', (username) => {
        if (socket.player) {
            return;
        } else {
            socket.player = new Player(username, socket);
            socket.broadcast.emit('user joined', {
                username: socket.player.name,
                numPeople: 231312
            });
        }
    });

    socket.on('game action', (action) => {
        if (action) {
            // validate action
            socketIOServer.emit('game action', {
                username: socket.player.name,
                action: action
            });
        }
    });

    socket.on('chat message', (message) => {
        if (message && message.text) {
            socketIOServer.emit('chat message', {
                username: socket.player.name,
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