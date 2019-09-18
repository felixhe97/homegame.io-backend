class Player {
    // status: -1 is unseated, 0 is busy but still seated, 1 is seated/folded, 2 is in hand, 3 is in countdown, currently listened to
    constructor(playerID, socket) {
        // authenticate that playerID is valid string
        if (!playerID || typeof playerID != "string" || !(playerID instanceof String)) {
            // and authenticated???
            throw new Error("Invalid player ID type, has to be string");
        } else if (!socket || !(socket instanceof SocketIO.socket)) {
            throw new Error("Player not connected to socket");
        } else {
            this.name = playerID;
            this.socket = socket;
            this.rooms = new Map();
        }
    }

    join(room) {

    }

    get name() {
        return this.name;
    }
                this.amountOfChips = chips;
                this.status = -1;
                this.hand = undefined;
                this.chipsAtStart = undefined;
            }
        } 
    }

    get seated() {
        return this.status >= 0;
    }

    get busy() {
        return this.status === 0;
    }

    get folded() {
        return this.status === 1;
    }

    get inHand() {
        return this.status === 2;
    }

    get onAction() {
        return this.status === 3;
    }


    startHand(smallBlind, bigBlind) {
        this.chipsAtStart = this.amountOfChips;
        if (smallBlind) {
            this.amountOfChips -= smallBlind;
        } else if (bigBlind) {
            this.amountOfChips -= bigBlind;
        }
    }

    // bet/raise
    bet(betAmount){
        if (typeof betAmount != "number" || !(betAmount instanceof Number)) {
            throw new Error("Bet amount is not a number");
        } else if (betAmount <= 0) {
            throw new Error("Cannot bet negative amount");
        } else if (betAmount > player.amountOfChips) {
            throw new Error("Not enough chips in stack to cover bet");
        } else if (player == this.currAction) {
            player.amountOfChips -= betAmount;
            pot += betAmount;
        }
    }

    call(amountToCall) {
        if (typeof betAmount != "number" || !(betAmount instanceof Number)) {
            throw new Error("Bet amount is not a number");
        } else if (betAmount <= 0) {
            throw new Error("Cannot bet negative amount");
        } else if (betAmount > player.amountOfChips) {
            throw new Error("Not enough chips in stack to cover bet");
        } else if (player == this.currAction) {
            player.amountOfChips -= betAmount;
            pot += betAmount;
        }
    }

    fold() {
        if (this.amountOfChips != this.chipsAtStart) {
            // update players database chip amount
        }
    }

    showdown() {

    }
}

module.exports = Player;