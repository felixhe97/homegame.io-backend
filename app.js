// TODO remove express and have static assets served from CDN  
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const socketIOServer = require('socket.io')(httpServer);

const Player = require('./src/player');

const path = require('path');
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

const onlineRooms = new Map();
app.get('/game/:gameID', (req, res)=>{
    if (req.params.gameID && req.params.gameID.length > 1) {
        if (onlineRooms.get(req.params.gameID)) {
            onlineRooms.get(req.params.gameID).addPlayer();
        } else {
            onlineRooms.set(req.params.gameID, socketIOServer.of('/' + req.params.gameID));
            onlineRooms.get(req.params.gameID).on('connection', (socket) => {

            });
        }
    }
});


// all SocketIO things should be here only
socketIOServer.on("connection", (socket) => {
    // authenticate with SQL server

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


httpServer.listen(port, () => {
    console.log(`app started, listening on ${port}`);
});