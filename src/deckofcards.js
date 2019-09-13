class Deck {
    constructor(typeOfCards) {
        this._cards = [...typeOfCards];
    }

    shuffleAndDeal(numberOfCards) {
        if (!numberOfCards || numberOfCards < 1 || numberOfCards > this._cards.length) {
            number = this._cards.length;
        }
        for (let i = this._cards.length - 1; i > 0; --i) {
            let index = Math.floor(Math.random() * (i + 1));
            if (index != i){
                let temp = this._cards[i];
                this._cards[i] = this._cards[index];
                this._cards[index] = temp;
            }
        }
        return this._cards.slice(0, numberOfCards);
    }
}

const classic52 = [
    "ah", "ad", "ac", "as",
    "2h", "2d", "2c", "2s",
    "3h", "3d", "3c", "3s",
    "4h", "4d", "4c", "4s",
    "5h", "5d", "5c", "5s",
    "6h", "6d", "6c", "6s",
    "7h", "7d", "7c", "7s",
    "8h", "8d", "8c", "8s",
    "9h", "9d", "9c", "9s",
    "th", "td", "tc", "ts",
    "jh", "jd", "jc", "js",
    "qh", "qd", "qc", "qs",
    "kh", "kd", "kc", "ks",
];

const shortdeck = [
    "ah", "ad", "ac", "as",
    "6h", "6d", "6c", "6s",
    "7h", "7d", "7c", "7s",
    "8h", "8d", "8c", "8s",
    "9h", "9d", "9c", "9s",
    "th", "td", "tc", "ts",
    "jh", "jd", "jc", "js",
    "qh", "qd", "qc", "qs",
    "kh", "kd", "kc", "ks",
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