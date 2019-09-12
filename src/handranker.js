let PokerDeck = require('./deckofcards.js').Classic52;
let mapCard = require('./deckofcards.js').firstIntegerToStringMap;
let cardMap = require('./deckofcards.js').firstStringToIntegerMap;
let mapSuit = require('./deckofcards.js').secondIntegerToStringMap;
let suitMap = require('./deckofcards.js').secondStringToIntegerMap;
let Player = require('./player.js');

function checkFlush(suitArr) {
    for (let x = 0; x < suitArr.length; ++x) {
        if (suitArr[x].length >= 5) {
            return suitArr[x].sort();
        }
    }
    return undefined;
}

function checkStraightFlush(flushCards) {
    if (!flushCards || flushCards.length >= 5) {
        for (let x = flushCards.length - 1; x >= 4; --x) {
            if (flushCards[x] - 4 === flushCards[x-4]) {
                return flushCards[x];
            }
        }
        if (mapCard.get(flushCards[4]) === '5' && mapCard.get(flushCards.pop()) === 'a') {
            return flushCards[4];
        }
    }
    return undefined;
}

function checkStraight(cardArr) {
    let acc = 0;
    let highEnd = undefined;
    for (let x = 0; x < cardArr.length; ++x) {
        if (cardArr[x]) {
            ++acc;
            if (acc >= 5) {
                highEnd = x;
            }
        } else {
            acc = 0;
        }
    }
    if (highEnd) {
        return highEnd;
    } else if (cardArr[cardMap.get('a')] && cardArr[cardMap.get('2')] && cardArr[cardMap.get('3')] && cardArr[cardMap.get('4')] && cardArr[cardMap.get('5')]) {
        return cardMap.get('5');
    } else {
        return undefined;
    }
}


/**
 * Returns best hand and its ranking from given cards
 * 
 * 8 is straight-flush, 7 is quad, 6 is full-house, 5 is flush, 4 is straight, 3 is trip, 2 is two pairs, 1 is one pair, 0 is high card
 * 
 * @param {Array<String>} arrOfCards
 */
function rankHand(arrOfCards) {
    let cardArr = Array(14).fill(0);
    let suitArr = [[],[],[],[],[],[]];
    for (let card of arrOfCards) {
        ++cardArr[cardMap.get(card[0])];
        suitArr[suitMap.get(card[1])].push(cardMap.get(card[0]));
    }

    let flushCards = checkFlush(suitArr);
    if (flushCards) {
        let highStraightFlushCard = checkStraightFlush(Array.from(flushCards));
        if (highStraightFlushCard) {
            return [8, highStraightFlushCard];
        }
    }

    let quad = undefined;
    let trip = [];
    let pair = [];
    let highCard = [];
    for (let x = 0; x < cardArr.length; ++x) {
        if (cardArr[x] > 4) {
            throw new Error("Should have max 4 cards in a suit");
        } else if (cardArr[x] == 4) {
            quad = x;
        } else if (cardArr[x] == 3) {
            trip.push(x);
        } else if (cardArr[x] == 2) {
            pair.push(x);
        } else if (cardArr[x] == 1) {
            highCard.push(x);
        }
    }

    let highStraightCard = checkStraight(cardArr);

    if (quad) {
        return [7, quad, highCard.pop()];
    } else if (trip.length > 1) {
        return [6, trip.pop(), trip.pop()];
    } else if (trip.length == 1 && pair.length >= 1) {
        return [6, trip.pop(), pair.pop()];
    } else if (flushCards) {
        return [5, flushCards.pop(), flushCards.pop(), flushCards.pop(), flushCards.pop(), flushCards.pop()];
    } else if (highStraightCard) {
        return [4, highStraightCard];
    } else if (trip.length == 1) {
        return [3, trip.pop(), highCard.pop(), highCard.pop()];
    } else if (pair.length > 2) {
        let arrToReturn = [2, pair.pop(), pair.pop()];
        let compareWithHighCard = pair.pop();
        let possibleHighCard = highCard.pop();
        if (compareWithHighCard > possibleHighCard) {
            arrToReturn.push(compareWithHighCard);
            return arrToReturn;
        } else {
            arrToReturn.push(possibleHighCard);
            return arrToReturn;
        }
    } else if (pair.length == 2) {
        return [2, pair.pop(), pair.pop(), highCard.pop()];
    } else if (pair.length == 1) {
        return [1, pair.pop(), highCard.pop(), highCard.pop(), highCard.pop(), highCard.pop()];
    } else {
        return [0, highCard.pop(), highCard.pop(), highCard.pop(), highCard.pop(), highCard.pop()];
    }
}

function rankPlayer(playerHand, communityCards) {
    if (!playerHand || playerHand.length != 2 || !communityCards || communityCards.length != 5){
        return undefined;
    }
    let temp = playerHand.concat(communityCards);
    let handRank = rankHand(temp);
    let points = 0;
    if (handRank) {
        switch(handRank[0]) {
            case 8:
                points = 8 * 1000000 + handRank[1];
                return [points, "straight flush, " + mapCard.get(handRank[1]) + " high"];
            case 7:
                points = 7 * 1000000 + handRank[1] * 100 + handRank[2];
                return [points, "quads of " + mapCard.get(handRank[1]) + ", " + mapCard.get(handRank[2]) + " kicker"];
            case 6:
                points = 6 * 1000000 + handRank[1] * 100 + handRank[2];
                return [points, "full house, " + mapCard.get(handRank[1]) + " full of " + mapCard.get(handRank[2])];
            case 5:
                points = 5 * 1000000 + handRank[1] * 10000 + handRank[2] * 1000 + handRank[3] * 100 + handRank[4] * 10 + handRank[5];
                return [points, "flush, " + mapCard.get(handRank[1]) + " high"];  
            case 4:
                points = 4 * 1000000 + handRank[1];
                return [points, "straight, " + mapCard.get(handRank[1]) + " high"];
            case 3:
                points = 3 * 1000000 + handRank[1] * 10000 + handRank[2] * 1000 + handRank[3] * 100;
                return [points, "trips of " + mapCard.get(handRank[1]) + ", " + mapCard.get(handRank[2]) + " kicker"];
            case 2:
                points = 2 * 1000000 + handRank[1] * 10000 + handRank[2] * 1000;
                return [points, "2 pairs, " + mapCard.get(handRank[1]) + " and " + mapCard.get(handRank[2]) + ", " + mapCard.get(handRank[3]) + " kicker"];
            case 1:
                points = 1000000 + handRank[1] * 10000 + handRank[2] * 1000 + handRank[3] * 100 + handRank[4] * 10 + handRank[5];
                return [points, "pair of " + mapCard.get()]
            case 0:
                points = handRank[1] * 100000 + handRank[2] * 1000 + handRank[3] * 100 + handRank[4] * 10 + handRank[5];
                return [points, mapCard.get(handRank[1]) + " high"];
            default:
                throw new Error("Invalid handRank return code");
        }
    }

}

exports.checkFlush = checkFlush;
exports.checkStraightFlush = checkStraightFlush;
exports.checkStraight = checkStraight;
exports.rankHand = rankHand;
exports.rankPlayer = rankPlayer;
