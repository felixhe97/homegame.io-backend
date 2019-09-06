let Table = require('./table.js');
let Deck = require('./deckofcards.js').Classic52;

// PokerTable keeps track of cards, gametype/blinds, and button between hands
class PokerTable extends Table {
    constructor(tableID, hostID, maxNumPeople) {
        super(tableID, hostID, maxNumPeople);
        this.pot = 0;
        this.currAction = undefined;
        this.deck = new Deck();
        this.cards = undefined;
    }

    dealButton() {
        this.buttonPosition = Math.floor(Math.random() * this.seats.length);
        if (!this.seats[this.buttonPosition]){
            this.moveButton();
        }
        return this.buttonPosition;
    }

    moveButton() {
        do {
            ++this.buttonPosition;
        } while (!this.seats[this.buttonPosition]);
        return this.buttonPosition;
    }

    nextHand() {
        this.deck.shuffle();
        this.cards = this.deck.dealCards();
        for (let x = 0; x < this.seats.length; ++x) {
            if (seats[x] && seats[x].status == 1) {
                let tempHand = [];
                tempHand.push(this.cards.pop());
                tempHand.push(this.cards.pop());
                seats[x].hand = tempHand;
            }
        }
    }
}

let temp = new PokerTable(23, 69, 8);
temp.joinPlayer("hello", 5);
temp.joinPlayer("hello", 6);
console.log(temp.seatsFilled());
console.log(temp.dealFlop());