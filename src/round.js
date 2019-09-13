
// Round == Hand, unique ID for each one, also shows length of same type of game in this table session
// keeps track of pot, current action, creates nice hand history format
// returns updated stacks of each player
// if player leaves, acts as fold
class Round {
    constructor(players, buttonPosition, blinds) {
        this.dateCreated = new Date();
        //this.id = ++handID;
        this.cards = globalDeck.shuffleAndDeal(5 + players.length * 2);
        this.buttonPosition = buttonPosition;
        this.blinds = blinds;
        this.players = players;
        this.handHistory = {};
    }

    dealPlayers() {
        for (let x = 0; x < this.players.length; ++x) {
            if (players[x] && players[x].status == 1) {
                let tempHand = [];
                tempHand.push(this.cards.pop());
                tempHand.push(this.cards.pop());
                players[x].hand = tempHand;
                this.handHistory[players[x].id] = tempHand;
            }
        }
    }

    preFlopAction() {
        for (let x = 0; x < this.players.length; ++x) {
            let currPos = (x + this.buttonPosition) % this.players.length;
            if (players[currPos] && players[currPos].status == 2) {
                // wait for player to act

            }
        }
    }
    
    dealFlop() {
        this.communityCards = [];
        this.communityCards.push(this.cards.pop());
        this.communityCards.push(this.cards.pop());
        this.communityCards.push(this.cards.pop());
        // emit the cards in socketIO
    }

    flopAction() {
        for (let x = 0; x < this.players.length; ++x) {
            let currPos = (x + this.buttonPosition) % this.players.length;
            if (players[currPos] && players[currPos].status == 2) {
                // wait for player to act
            }
        }
    }

    dealTurn() {
        this.communityCards.push(this.cards.pop());
    }

    turnAction() {

    }

    dealRiver() {
        this.communityCards.push(this.cards.pop());
    }

    riverAction() {

    }
}