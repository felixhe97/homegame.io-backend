const currencyFormatter = new Intl.NumberFormat();

class Chips {
    constructor(number) {
        this.amount = number;
    }

    get amount() {
        return this.amount;
    }

    // test if += works
    set amount(number) {
        this.amount = number;
    }
}

class Pot extends Chips {
    constructor(number, blinds){
        super(number);
        this.blinds = blinds;
    }

    get bb(){
        return this.amount / this.blinds;
    }

    get value() {
        return currencyFormatter.format(this.amount / 100);
    }

    figureOutAccountingTerm(winningPlayers, button){
        let numberOfWinners = winningPlayers.length;
        let givenToWinners = Math.floor(this.amount / numberOfWinners);
        // find OOP, ie closest to button clockwise
        let OOPplayer = 'something';
        let remainder = this.amount % numberOfWinners;

        winningPlayers.chips += givenToWinners;
    }
}

exports.Chips = Chips;
exports.Pot = Pot;