class Deck {
    constructor(typeOfCards) {
        this.cards = [...typeOfCards];
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; --i) {
            let index = Math.floor(Math.random() * (i + 1));
            if (index != i){
                let temp = this.cards[i];
                this.cards[i] = this.cards[index];
                this.cards[index] = temp;
            }
        }
    }

    dealCards(number) {
        if (number < 1) {
            throw new Error("Invalid number of cards to deal");
        } else {
            return this.cards.slice(0, number);
        }
    }
}

const classic54 = [
    "ah", "ad", "as", "ac",
    "2h", "2d", "2s", "2c",
    "3h", "3d", "3s", "3c",
    "4h", "4d", "4s", "4c",
    "5h", "5d", "5s", "5c",
    "6h", "6d", "6s", "6c",
    "7h", "7d", "7s", "7c",
    "8h", "8d", "8s", "8c",
    "9h", "9d", "9s", "9c",
    "th", "td", "ts", "tc",
    "jh", "jd", "js", "jc",
    "qh", "qd", "qs", "qc",
    "kh", "kd", "ks", "kc",
    "x1", "x2"
];

const classic52 = [
    "ah", "ad", "as", "ac",
    "2h", "2d", "2s", "2c",
    "3h", "3d", "3s", "3c",
    "4h", "4d", "4s", "4c",
    "5h", "5d", "5s", "5c",
    "6h", "6d", "6s", "6c",
    "7h", "7d", "7s", "7c",
    "8h", "8d", "8s", "8c",
    "9h", "9d", "9s", "9c",
    "th", "td", "ts", "tc",
    "jh", "jd", "js", "jc",
    "qh", "qd", "qs", "qc",
    "kh", "kd", "ks", "kc"
];

const shortdeck = [
    "ah", "ad", "as", "ac",
    "6h", "6d", "6s", "6c",
    "7h", "7d", "7s", "7c",
    "8h", "8d", "8s", "8c",
    "9h", "9d", "9s", "9c",
    "th", "td", "ts", "tc",
    "jh", "jd", "js", "jc",
    "qh", "qd", "qs", "qc",
    "kh", "kd", "ks", "kc"
];

exports.ShortDeck = class ShortDeck extends Deck {
    constructor() {
        super(shortdeck);
    }
}

exports.Classic52 = class Classic52 extends Deck {
    constructor() {
        super(classic52);
    }
}

exports.Classic54 = class Classic54 extends Deck {
    constructor() {
        super(classic54);
    }
}