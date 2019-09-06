
// Round == Hand, unique ID for each one, also shows length of same type of game in this table session
// keeps track of pot, current action, creates nice hand history format
// returns updated stacks of each player
// if player leaves, acts as fold
class Round {
    constructor(players, shuffledCards, buttonPosition, blinds) {
        this.dateCreated = new Date();
        //this.id = ++handID;
        this.cards = shuffledCards;
        this.buttonPosition = buttonPosition;
        this.blinds = blinds;
        this.players = players;
    }

    dealPlayers() {
        for (let x = 0; x < this.players.length; ++x) {
            if (players[x] && players[x].status == 1) {
                let tempHand = [];
                tempHand.push(this.cards.pop());
                tempHand.push(this.cards.pop());
                players[x].hand = tempHand;
            }
        }
    }

    preFlopAction() {

    }
    
    dealFlop() {

    }

    flopAction() {

    }

    dealTurn() {

    }

    turnAction() {

    }

    dealRiver() {

    }

    riverAction() {

    }
}