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
        let numCardsNeeded = 5 + this.seatsFilled() * 2;
        this.cards = this.deck.dealCards(numCardsNeeded);

        // begin round
    }
}

let temp = new PokerTable(23, 69, 8);
temp.joinPlayer("hello", 5);
temp.joinPlayer("hello", 6);
console.log(temp.seatsFilled());
console.log(temp.dealFlop());