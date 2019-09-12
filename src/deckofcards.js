class Deck {
    constructor(typeOfCards) {
        this._cards = [...typeOfCards];
        this._isShuffled = false;
    }

    get isShuffled() {
        return this._isShuffled;
    }

    shuffle() {
        for (let i = this._cards.length - 1; i > 0; --i) {
            let index = Math.floor(Math.random() * (i + 1));
            if (index != i){
                let temp = this._cards[i];
                this._cards[i] = this._cards[index];
                this._cards[index] = temp;
            }
        }
        this._isShuffled = true;
        return true;
    }

    // associate each of these dealt cards with a round
    dealCards(number) {
        if (!number) {
            number = this._cards.length;
        } else if (number < 1) {
            throw new Error("Invalid number of cards to deal");
        } else {
            this._isShuffled = false;
            return this._cards.slice(0, number);
        }
    }
}

exports.firstStringToIntegerMap = new Map([
    ['2', 0],
    ['3', 1],
    ['4', 2],
    ['5', 3],
    ['6', 4],
    ['7', 5],
    ['8', 6],
    ['9', 7],
    ['t', 8],
    ['j', 9],
    ['q', 10],
    ['k', 11],
    ['a', 12],
    ['x', 13] // joker
]);

exports.secondStringToIntegerMap = new Map([
    ['h', 0],
    ['d', 1],
    ['c', 2],
    ['s', 3],
    ['1', -1], // for joker1
    ['2', -2]  // for joker2
]);

exports.firstIntegerToStringMap = new Map([
    [0, '2'],
    [1, '3'],
    [2, '4'],
    [3, '5'],
    [4, '6'],
    [5, '7'],
    [6, '8'],
    [7, '9'],
    [8, 't'],
    [9, 'j'],
    [10, 'q'],
    [11, 'k'],
    [12, 'a'],
    [13, 'x']  // joker
]);

exports.secondIntegerToStringMap = new Map([
    [0, 'h'],
    [1, 'd'],
    [2, 'c'],
    [3, 's'],
    [-1, '1'], // for joker1
    [-2, '2']  // for joker2
]);

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

const classic54 = [
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
    "x1", "x2"
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

const classic52int = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3],
    [4, 0], [4, 1], [4, 2], [4, 3],
    [5, 0], [5, 1], [5, 2], [5, 3],
    [6, 0], [6, 1], [6, 2], [6, 3],
    [7, 0], [7, 1], [7, 2], [7, 3],
    [8, 0], [8, 1], [8, 2], [8, 3],
    [9, 0], [9, 1], [9, 2], [9, 3],
    [10, 0], [10, 1], [10, 2], [10, 3],
    [11, 0], [11, 1], [11, 2], [11, 3],
    [12, 0], [12, 1], [12, 2], [12, 3],
    [13, 0], [13, 1], [13, 2], [13, 3],
];

const classic54int = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [3, 0], [3, 1], [3, 2], [3, 3],
    [4, 0], [4, 1], [4, 2], [4, 3],
    [5, 0], [5, 1], [5, 2], [5, 3],
    [6, 0], [6, 1], [6, 2], [6, 3],
    [7, 0], [7, 1], [7, 2], [7, 3],
    [8, 0], [8, 1], [8, 2], [8, 3],
    [9, 0], [9, 1], [9, 2], [9, 3],
    [10, 0], [10, 1], [10, 2], [10, 3],
    [11, 0], [11, 1], [11, 2], [11, 3],
    [12, 0], [12, 1], [12, 2], [12, 3],
    [13, 0], [13, 1], [13, 2], [13, 3],
    [14, -1], [14, -2]
];

const shortdeckint = [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [5, 0], [5, 1], [5, 2], [5, 3],
    [6, 0], [6, 1], [6, 2], [6, 3],
    [7, 0], [7, 1], [7, 2], [7, 3],
    [8, 0], [8, 1], [8, 2], [8, 3],
    [9, 0], [9, 1], [9, 2], [9, 3],
    [10, 0], [10, 1], [10, 2], [10, 3],
    [11, 0], [11, 1], [11, 2], [11, 3],
    [12, 0], [12, 1], [12, 2], [12, 3],
    [13, 0], [13, 1], [13, 2], [13, 3]
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