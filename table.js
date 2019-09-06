
class Table {
    constructor(tableID, hostPlayer, maxNumPeople) {
        this.id = tableID;
        this.host = hostPlayer;
        if (maxNumPeople <= 10 && maxNumPeople >= 2) {
            this.seats = Array.apply(null, Array(maxNumPeople));
        } else {
            throw new Error("Invalid number of seats");
        }
        this.dateCreated = new Date();
    }

    get seatLimit() {
        return this.seats.length;
    }

    seatsFilled() {
        let i = 0;
        for (let x = 0; x < this.seats.length; ++x) {
            if (this.seats[x]) {
                ++i;
            }
        }
        return i;
    }

    switchPlayer(player, currPos, nextPos) {
        if (!this.seats[nextPos]) {
            this.seats[currPos] = undefined;
            this.seats[nextPos] = player;
        } else {
            throw new Error("Particular seat is not available");
        }
    }

    joinPlayer(player, tablePosition) {
        if (this.seatsFilled() >= this.seats.length) {
            throw new Error("No seats open at table");
        }
        if (tablePosition >= 0 && tablePosition < this.seats.length) {
            if (this.seats[tablePosition]) {
                throw new Error("Table position currently filled");
            } else {
                this.seats[tablePosition] = player;
            }
        } else {
            throw new Error("Cannot join invalid table position");
        }
    }
}

module.exports = Table;
