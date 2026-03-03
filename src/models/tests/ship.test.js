import Ship from "../ship";

describe("ship model", () => {
    test("ship is hit 2 times, not sunk", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });
    
    test("ship is hit 3 times, sunk", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});