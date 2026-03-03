import { NPC, PLAYER } from "../state/state";
import { generateKey } from "../utils/coord-keys";

function initOwnBoard() {
    initBoard("own-table-container");
}

function initEnemyBoard() {
    initBoard("enemy-table-container");
}

function initBoard(containerId) {
    const board = document.getElementById(containerId);

    board.replaceChildren();

    for(let y = 0; y <= 9; y++) {
        for(let x = 0; x <= 9; x++) {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.coords = generateKey([x, y]);

            board.appendChild(div);
        }
    } 
}

function updateOwnBoard() {
    updateBoard(PLAYER, "own-table-container");
}

function updateEnemyBoard() {
    updateBoard(NPC, "enemy-table-container", true);
}

function updateBoard(player, containerId, hideShips = false) {
    initBoard(containerId);

    const ships = player.gameboard.ships;
    const attacksReceived = player.gameboard.attacksReceived;

    const board = document.getElementById(containerId);
    ships.forEach((shipData, i) => {
        const shipClass = "ship" + i.toString();
        const isSunk = shipData.ship.isSunk();
        shipData.positions.forEach((position) => {
            const shouldRenderShip = !hideShips || attacksReceived.has(position);
            if(!shouldRenderShip) return;

            const cell = board.querySelector("[data-coords=\"" + position + "\"]");
            cell.classList.add(shipClass);

            if(isSunk) cell.classList.add("sunk");
        });
    });

    attacksReceived.forEach((attackPosition) => {
        const cell = board.querySelector("[data-coords=\"" + attackPosition + "\"]");
        cell.classList.add("attacked");
    });
}

export { initOwnBoard, initEnemyBoard, updateOwnBoard, updateEnemyBoard };