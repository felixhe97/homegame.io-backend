// specific socketIO links/rooms/namespaces, one to one with autogenerated link
// when players join, can change their options here

class Room {
    constructor(hostID, linkURL, roomPassword = 0) {
        this.hostID = hostID;
        this.linkURL = linkURL;
        this.dateCreated = new Date();
        if (!roomPassword) {
            this.password = undefined;
        } else {
            this.password = roomPassword;
        }
    }

    spectate() {

    }

    sit() {

    }
}