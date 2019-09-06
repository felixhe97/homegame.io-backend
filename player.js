class Player {
    hand;
    amountOfChips;
    status; // -1 is unseated, 0 is not ready, 1 is ready, 2 is in action, 3 is in countdown

    constructor(playerID, chips = 0) {
        this.id = playerID;
        this.amountOfChips = chips;
        this.status = -1;
    }

    bet(betAmount){
        if (betAmount <= 0) {
            throw new Error("Cannot bet invalid amount");
        } else if (betAmount > player.amountOfChips) {
            throw new Error("Not enough chips in stack to cover bet");
        } else if (player == this.currAction) {
            player.amountOfChips -= betAmount;
            pot += betAmount;
        }
    }
}

module.exports = Player;