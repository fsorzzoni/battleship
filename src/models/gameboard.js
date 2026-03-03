import { generateKey } from "../utils/coord-keys";
import Ship from "./ship";

export default class Gameboard {
    #ships;
    #attacksReceived;

    constructor() {
        this.#ships = [];
        this.#attacksReceived = new Set();
    }

    addShip([x1, y1], [x2, y2]) {
        const isOutOfBounds = x1 < 0 || x1 > 9 || y1 < 0 || y1 > 9 || x2 < 0 || x2 > 9 || y2 < 0 || y2 > 9;
        if(isOutOfBounds) throw new Error("Coords out of bounds");
        if(x1 !== x2 && y1 !== y2) throw new Error("Ship must be straight")

        let length;
        if((x1 - x2) === 0) {
            length = Math.abs(y1 - y2) + 1;
        } else {
            length = Math.abs(x1 - x2) + 1;
        }

        const isInvalidLength = length <= 1 || length >= 6 || this.#ships.some(shipData => shipData.ship.length === length);
        if(isInvalidLength) throw new Error("Invalid length");
        

        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        const ship = new Ship(length);
        const positions = new Set();
        if((x1 - x2) === 0) {
            for(let i = minY; i <= maxY; i++) {
                const key = generateKey([x1, i]);
                if(this.#findShipByPositionKey(key) !== undefined) throw new Error("Coords occupied");
                positions.add(key);
            } 
        } else if(y1 === y2) {
            for(let i = minX; i <= maxX; i++) {
                const key = generateKey([i, y1]);
                if(this.#findShipByPositionKey(key) !== undefined) throw new Error("Coords occupied");
                positions.add(key);
            } 
        }

        this.#ships.push({ ship, positions });
    }

    receiveAttack([x, y]) {
        const key = generateKey([x, y]);

        if(x < 0 || x > 9 || y < 0 || y > 9) throw new Error("Coords out of bounds");
        if(this.#attacksReceived.has(key)) throw new Error("Coords already attacked");

        this.#attacksReceived.add(key);

        const ship = this.#findShipByPositionKey(key);
        let isHit = false;
        if(ship !== undefined) {
            ship.hit();
            isHit = true;
        }
        return isHit;
    }

    get ships() {
        return this.#ships;
    }

    get attacksReceived() {
        return this.#attacksReceived;
    }

    areAllShipsSunk() {
        return this.#ships.every(shipData => shipData.ship.isSunk());
    }

    

    #findShipByPositionKey(key) {
        const shipData = this.#ships.find(shipDataAux => shipDataAux.positions.has(key));
        if(shipData === undefined) return undefined;
        return shipData.ship;
    }
}