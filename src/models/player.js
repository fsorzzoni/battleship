import { generateKey, getRandomCoord } from "../utils/coord-keys";
import Gameboard from "./gameboard";

export default class Player {
    #gameboard;

    constructor() {
        this.#gameboard = new Gameboard()
    }

    get gameboard() {
        return this.#gameboard;
    }

    receiveRandomAttack() {
        let isAttackDone = false;
        while(!isAttackDone) {
            const coord = getRandomCoord();
            try {
                this.#gameboard.receiveAttack(coord);
                isAttackDone = true;
            } catch (error) {
            }
        }
    }

    addRandomShips() {
    const lengths = [2, 3, 4, 5];

    for (const length of lengths) {
        const possiblePlacements = [];

        // Generar todas las posiciones horizontales válidas
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y <= 10 - length; y++) {
                possiblePlacements.push([[x, y], [x, y + length - 1]]);
            }
        }

        // Generar todas las posiciones verticales válidas
        for (let x = 0; x <= 10 - length; x++) {
            for (let y = 0; y < 10; y++) {
                possiblePlacements.push([[x, y], [x + length - 1, y]]);
            }
        }

        // Shuffle (Fisher–Yates)
        for (let i = possiblePlacements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [possiblePlacements[i], possiblePlacements[j]] =
                [possiblePlacements[j], possiblePlacements[i]];
        }

        let placed = false;

        for (const [start, end] of possiblePlacements) {
            try {
                this.#gameboard.addShip(start, end);
                placed = true;
                break;
            } catch {}
        }

        if (!placed) {
            throw new Error(`Could not place ship of length ${length}`);
        }
    }
    }
}