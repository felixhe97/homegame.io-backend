class Player {
    // status: -1 is unseated, 0 is folded/busy, 1 is ready, 2 is in action, 3 is in countdown
    constructor(playerID, chips = 0) {
        if (typeof playerID != "string" && !(playerID instanceof String) && typeof playerID != "number" && !(playerID instanceof Number)) {
            throw new Error("Invalid player ID type, has to be string or number");
        } else if (typeof chips != "number" && !(chips instanceof Number)) {
            throw new Error("Invalid chip type, has to be number");
        } else {
            this.id = playerID;
            this.amountOfChips = chips;
            this.status = -1;
            this.hand = undefined;
        }
    }

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
}

module.exports = Player;