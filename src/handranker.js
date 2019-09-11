let PokerDeck = require('./deckofcards.js').Classic52;
let stringToIntegerMap = require('./deckofcards.js').firstStringToIntegerMap;
let Player = require('./player.js');

// if a player has folded, then nothing is to be done, this will only rank the players at showdown

function flushPossible(suitCount) {
    for (let [key, val] of suitCount) {
        if (val >= 3) {
            return [key, val];
        }
    }
    return undefined;
}

/**
 * 
 * @param {Array<String>} communityCards 
 * @returns {Array<Array<Number>, Array<String, Number> | undefined>}
 */
function communityCardInfo(communityCards) {
    if (!communityCards || communityCards.length != 5) {
        return;
    } else {
        let suitCount = new Map([
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0]
        ]);

        let cardCount = Array(13).fill(0);
        for (let card of communityCards) {
            ++cardCount[cardMap.get(card[0])];
            ++suitCount[card[1]];
        }
        let flushArr = flushPossible(suitCount);
        if (flushArr) {
            return [cardCount, flushArr];
        } else {
            return [cardCount, undefined];
        }
    }
}

function hasStraight(cardArr) {
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
    return highEnd;
}

function playerHandStrength(playerHand, communityCards) {
    if (!playerHand || playerHand.length != 2 || !communityCards || communityCards.length != 5) {
        return;
    } else {
        let suitCount = new Map([
            ['s', 0],
            ['d', 0],
            ['h', 0],
            ['c', 0]
        ]);
        let cardCount = Array(13).fill(0);

        let tempArr = [];
        tempArr.push(playerHand);
        tempArr.push(communityCards);

        for (let card of tempArr) {
            ++cardCount[card[0]];
            ++suitCount.get(card[1]);
        }

        let flushSuit = flushPossible(suitCount);
        if (flushSuit) {

        } else {

        }
    }
}

function hasStraight(cardCount) {
    let acc = 0;
    for (let x = 0; x < cardCount.length; ++x) {
        if (cardCount[x] > 0) {
            ++acc;
            if (acc === 5) {
                return x;
            }
        } else {
            acc = 0;
        }
    }
    // check broadway straight
    if (cardCount[0] && cardCount[9] && cardCount[10] && cardCount[11] && cardCount[12]) {
        return 0;
    } else {
        return;
    }
}


function rankHands(playerArr, communityCards) {
    if (!playerArr || playerArr.length!communityCards || communityCards.length != 5) {
        return;
    }

    // first figure out what community cards has
    for (let i = 0; i < communityCards.length; ++i) {

    }



    let arrOfRanks = [];
    communityCards.sort();

    let heartCount = [];
    let clubCount = [];
    let spadeCount = [];
    let diamondCount = [];
    for (let i = 0; i < communityCards.length; ++i) {
        if (communityCards[i][1] == "s") {
            spadeCount.push(communityCards[i]);
        } else if (communityCards[i][1] == "c") {
            clubCount.push(communityCards[i]);
        } else if (communityCards[i][1] == "d") {
            diamondCount.push(communityCards[i]);
        } else {
            heartCount.push(communityCards[i]);
        }
    }

    for (let i = 0; i < playerArr; ++i) {
        if (playerArr[i].hand) {
            if (hasStraight(playerArr[i].hand, communityCards)) {

            } else if (hasFlush(playerArr[i].hand, communityCards)) {

            } else {

            }

            arrOfRanks.push([playerArr[i], rank]);
        }
    }
}