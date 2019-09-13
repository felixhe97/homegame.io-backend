// nlh handranker
// can put in frontend so ppl can calculate what they have on each street

const cardToIntMap = new Map([
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
    ['a', 12]
]);

const intToCardMap = new Map();
for (let [key, val] of cardToIntMap) {
    intToCardMap.set(val, key);
}

/**
 * Returns an array of suited cards if there is a flush, otherwise return undefined.
 * 
 * @param {Map<String, Array<Number>>} suitedCardMap - Map composed of [suits => cards of that suit]
 */
function checkFlush(suitedCardMap) {
    if (suitedCardMap) {
        for (let [suit, arrOfSuitedCards] of suitedCardMap) {
            if (arrOfSuitedCards.length >= 5) {
                return arrOfSuitedCards;
            }
        }
    }
    return undefined;
}

/**
 * Given cards comprising a flush, returns high card if there is a straight flush,
 * otherwise return undefined.
 * 
 * @param {Array<Number>} flushCards - Sorted array of flush card integers
 */
function checkStraightFlush(flushCards) {
    if (flushCards && flushCards.length >= 5) {
        for (let x = flushCards.length - 1; x >= 4; --x) {
            if (flushCards[x] - 4 === flushCards[x - 4]) {
                return intToCardMap.get(flushCards[x]);
            }
        }
        let possible5 = intToCardMap.get(flushCards[4]);
        if (possible5 === '5' && intToCardMap.get(flushCards.pop()) === 'a') {
            return possible5;
        }
    }
    return undefined;
}

/**
 * If there is a straight, returns high card/end. Otherwise, returns undefined.
 * 
 * @param {Array<Number>} cardArr - Array of counts of cards where index represents card strength
 */
function checkStraight(cardArr) {
    if (cardArr && cardArr.length === 13) {
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
        } else if (cardArr[cardToIntMap.get('a')] && cardArr[cardToIntMap.get('2')] && cardArr[cardToIntMap.get('3')] && cardArr[cardToIntMap.get('4')] && cardArr[cardToIntMap.get('5')]) {
            return cardToIntMap.get('5');
        }
    }
    return undefined;
}

/**
 * Given five to seven cards, returns best five card hand, in the form
 * of an array with first item strength of hand in points, and second item
 * the hand's string description - [Number, String], or undefined if function
 * cannot complete successfully.
 * 
 * @param {Array<String>} arrOfCards
 */
function rankHand(arrOfCards) {
    if (!arrOfCards || arrOfCards.length < 5 /*|| arrOfCards.length > 7*/) {
        return;
    }
    let cardArr = Array(13).fill(0);
    let suitedCardMap = new Map([
        ['h', []],
        ['d', []],
        ['c', []],
        ['s', []]
    ]);

    for (let card of arrOfCards) {
        ++cardArr[cardToIntMap.get(card[0])];
        suitedCardMap.get(card[1]).push(cardToIntMap.get(card[0]));
    }

    // flushCards is unsorted array of respective flush card strength
    let flushCards = checkFlush(suitedCardMap);
    if (flushCards) {
        flushCards.sort((a, b)=>{return a-b});
        let highStraightFlushCard = checkStraightFlush(flushCards);
        if (highStraightFlushCard) {
            return [
                8e10 + cardToIntMap.get(highStraightFlushCard), 
                highStraightFlushCard === 'a' ? `Royal Flush` : `Straight Flush: ${highStraightFlushCard} high`
            ];
        }
    }

    let quad = undefined;
    let trip = [];
    let pair = [];
    let highCard = [];
    for (let x = 0; x < cardArr.length; ++x) {
        if (cardArr[x] > 4 || cardArr[x] < 0) {
            throw new Error("Invalid number of cards in array");
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
        return [
            7e10 + quad * 1e8 + highCard[highCard.length - 1], 
            `Quads of ${intToCardMap.get(quad)}, ${intToCardMap.get(highCard.pop())} kicker`
        ];
    } else if (trip.length > 1) {
        let fullHouseTrip = trip.pop();
        let fullHousePair = trip.pop();
        return [
            6e10 + fullHouseTrip * 1e8 + fullHousePair * 1e6, 
            `Full House: ${intToCardMap.get(fullHouseTrip)} full of ${intToCardMap.get(fullHousePair)}`
        ];
    } else if (trip.length == 1 && pair.length >= 1) {
        let fullHouseTrip = trip.pop();
        let fullHousePair = pair.pop();
        return [
            6e10 + fullHouseTrip * 1e8 + fullHousePair * 1e6, 
            `Full House: ${intToCardMap.get(fullHouseTrip)} full of ${intToCardMap.get(fullHousePair)}`
        ];
    } else if (flushCards) {
        let kickers = [
            flushCards.pop(),
            flushCards.pop(),
            flushCards.pop(),
            flushCards.pop(),
            flushCards.pop()
        ];
        return [
            5e10 + kickers[0] * 1e8 + kickers[1] * 1e6 + kickers[2] * 1e4 + kickers[3] * 1e2 + kickers[4], 
            `Flush, ${kickers.map(val=>intToCardMap.get(val)).toString()}`
        ];
    } else if (highStraightCard) {
        return [
            4e10 + highStraightCard, 
            `Straight, ${intToCardMap.get(highStraightCard)} high`
        ];
    } else if (trip.length == 1) {
        let trips = trip.pop();
        let kicker1 = highCard.pop();
        let kicker2 = highCard.pop();
        let arr = [intToCardMap.get(kicker1), intToCardMap.get(kicker2)];
        return [
            3e10 + trips * 1e8 + kicker1 * 1e6 + kicker2 * 1e4, 
            `Trips of ${intToCardMap.get(trips)}, ${arr.toString()} kicker`
        ];
    } else if (pair.length >= 3) {
        let pair1 = pair.pop();
        let pair2 = pair.pop();
        let compareWithHighCard = pair.pop();
        let possibleHighCard = highCard.pop();
        if (compareWithHighCard > possibleHighCard) {
            return [
                2e10 + pair1 * 1e8 + pair2 * 1e6 + compareWithHighCard * 1e4,
                `2 Pairs: ${intToCardMap.get(pair1)} and ${intToCardMap.get(pair2)}, ${intToCardMap.get(compareWithHighCard)} kicker`
            ];
        } else {
            return [
                2e10 + pair1 * 1e8 + pair2 * 1e6 + possibleHighCard * 1e4,
                `2 Pairs: ${intToCardMap.get(pair1)} and ${intToCardMap.get(pair2)}, ${intToCardMap.get(possibleHighCard)} kicker`
            ];
        }
    } else if (pair.length == 2) {
        let pair1 = pair.pop();
        let pair2 = pair.pop();
        let kicker = highCard.pop();
        return [
            2e10 + pair1 * 1e8 + pair2 * 1e6 + kicker * 1e4,
            `2 Pairs: ${intToCardMap.get(pair1)} and ${intToCardMap.get(pair2)}, ${intToCardMap.get(kicker)} kicker`
        ];
    } else if (pair.length == 1) {
        let kickers = [highCard.pop(), highCard.pop(), highCard.pop()];
        return [
            1e10 + pair[0] * 1e6 + kickers[0] * 1e4 + kickers[1] * 1e2 + kickers[2],
            `Pair of ${intToCardMap.get(pair[0])}, ${kickers.map(val=>intToCardMap.get(val)).toString()} kicker`
        ];
    } else {
        let kickers = [
            highCard.pop(),
            highCard.pop(),
            highCard.pop(),
            highCard.pop(),
            highCard.pop()
        ];
        return [
            kickers[0] * 1e8 + kickers[1] * 1e6 + kickers[2] * 1e4 + kickers[3] * 1e2 + kickers[4],
            `High cards, ${kickers.map(val=>intToCardMap.get(val)).toString()} kicker`
        ];
    }
}

exports.rankHand = rankHand;
