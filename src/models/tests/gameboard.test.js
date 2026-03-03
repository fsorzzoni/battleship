import { generateKey } from "../../utils/coord-keys";
import Gameboard from "../gameboard";

describe("newShip", () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    });

    test("addShip: success", () => {
        board.addShip([0, 0], [2, 0]);
        board.addShip([1, 2], [1, 5]);
        

        const shipData1 = board.ships[0];

        expect(shipData1.positions.has(generateKey([0, 0]))).toBe(true);
        expect(shipData1.positions.has(generateKey([1, 0]))).toBe(true);
        expect(shipData1.positions.has(generateKey([2, 0]))).toBe(true);
        expect(shipData1.positions.has(generateKey([3, 0]))).toBe(false);


        const shipData2 = board.ships[1];

        expect(shipData2.positions.has(generateKey([1, 2]))).toBe(true);
        expect(shipData2.positions.has(generateKey([1, 3]))).toBe(true);
        expect(shipData2.positions.has(generateKey([1, 4]))).toBe(true);
        expect(shipData2.positions.has(generateKey([1, 1]))).toBe(false);
        expect(shipData2.positions.has(generateKey([1, 5]))).toBe(true);
        expect(shipData2.positions.has(generateKey([1, 6]))).toBe(false);
    });

    test("addShip: coords out of bounds", () => {
        expect(() => board.addShip([-1, 0], [1, 0])).toThrow();
        expect(() => board.addShip([0, -1], [0, 1])).toThrow();
        expect(() => board.addShip([1, 0], [-1, 0])).toThrow();
        expect(() => board.addShip([0, 1], [0, -1])).toThrow();

        expect(() => board.addShip([10, 0], [8, 0])).toThrow();
        expect(() => board.addShip([0, 10], [0, 8])).toThrow();
        expect(() => board.addShip([8, 0], [10, 0])).toThrow();
        expect(() => board.addShip([0, 8], [0, 10])).toThrow();
    });

    test("addShip: invalid length", () => {
        expect(() => board.addShip([0, 0], [0, 0])).toThrow();
        expect(() => board.addShip([0, 0], [5, 0])).toThrow();
        expect(() => board.addShip([0, 0], [0, 5])).toThrow();

        board.addShip([1, 2], [1, 4]);
        expect(() => board.addShip([2, 2], [2, 4])).toThrow();
    });

    test("addShip: coords occupied", () => {
        board.addShip([1, 2], [1, 4]);

        expect(() => board.addShip([0, 3], [2, 3])).toThrow();
    });
});

describe("receiveAttack", () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    });


    test("receiveAttack: success", () => {
        board.addShip([1, 2], [1, 4]);

        expect(board.receiveAttack([1, 3])).toBe(true);
    });

    test("receiveAttack: missed", () => {
        board.addShip([1, 2], [1, 4]);

        expect(board.receiveAttack([2, 2])).toBe(false);
    });

    test("receiveAttack: coords out of bounds", () => {
        expect(() => board.receiveAttack([-1, 0])).toThrow();
        expect(() => board.receiveAttack([0, -1])).toThrow();

        expect(() => board.receiveAttack([10, 0])).toThrow();
        expect(() => board.receiveAttack([0, 10])).toThrow();
    });

    test("receiveAttack: coords already attacked", () => {
        board.receiveAttack([1, 1]);

        expect(() => board.receiveAttack([1, 1])).toThrow();
    });
});

describe("areAllShipsSunk", () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    });

    test("areAllShipsSunk: true", () => {
        board.addShip([0, 0], [2, 0]);
        board.addShip([1, 2], [1, 5]);

        board.receiveAttack([0, 0]);
        board.receiveAttack([1, 0]);
        board.receiveAttack([2, 0]);

        board.receiveAttack([1, 2]);
        board.receiveAttack([1, 3]);
        board.receiveAttack([1, 4]);
        board.receiveAttack([1, 5]);

        expect(board.areAllShipsSunk()).toBe(true);
    });

    test("areAllShipsSunk: false", () => {
        board.addShip([0, 0], [2, 0]);
        board.addShip([1, 2], [1, 5]);

        board.receiveAttack([0, 0]);
        board.receiveAttack([1, 0]);
        board.receiveAttack([2, 0]);

        board.receiveAttack([1, 2]);
        board.receiveAttack([1, 4]);

        expect(board.areAllShipsSunk()).toBe(false);
    });
});