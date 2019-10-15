let myUsername = window.prompt("Please enter your username");
while (!myUsername || myUsername.length > 10) {
    myUsername = window.prompt("Please enter a username between 1 and 10 characters");
}
(function () {
    const chatSocket = io();
    const chat = document.getElementById('roomChat');
    const chatInput = document.getElementById('chatInputBox');

    document.getElementById('chatFilter').addEventListener('click', (event) => { });
    document.getElementById('logFilter').addEventListener('click', (event) => { });
    document.getElementById('seeBoth').addEventListener('click', (event) => { });
    document.getElementById('clearChat').addEventListener('click', (event) => { });

    chatSocket.on('connect', () => {
        chatSocket.emit('add user', myUsername);
        let listItem = document.createElement('li');
        listItem.textContent = `Welcome to Room X, ${myUsername}`;
        chat.appendChild(listItem);
    });

    document.getElementById('chatForm').addEventListener('submit', (event) => {
        event.preventDefault();
        if (chatInput.value != "") {
            chatSocket.emit('chat message', {
                username: myUsername,
                text: chatInput.value
            });
        }
        chatInput.value = "";
    });

    chatSocket.on('user joined', (userWhoJoined) => {
        let listItem = document.createElement('li');
        listItem.textContent = `[${new Date().toLocaleTimeString()}] ${userWhoJoined.username} has joined, ${userWhoJoined.numPeople} in room`;
        chat.appendChild(listItem);
    });

    chatSocket.on('user left', (userWhoLeft) => {
        let listItem = document.createElement('li');
        listItem.textContent = `[${new Date().toLocaleTimeString()}] ${userWhoLeft.username} has joined, ${userWhoLeft.numPeople} in room`;
        chat.appendChild(listItem);
    });

    chatSocket.on('chat message', (message) => {
        let listItem = document.createElement('li');
        listItem.textContent = `[${new Date().toLocaleTimeString()}] ${message.username}: ${message.text}`;
        chat.appendChild(listItem);
    });

    /*
    // gamelog stuff
    chatSocket.on('game info', (info)=>{
        let listItem = document.createElement('li');
        listItem.textContent = info;
        gamelog.appendChild(listItem);
    });
    */

})();