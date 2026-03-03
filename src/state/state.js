import Player from "../models/player";

let PLAYER = new Player();
let NPC = new Player();
let ATTACKED_PLAYER = null;

function setAttackedPlayer(attackedPlayer) {
    ATTACKED_PLAYER = attackedPlayer;
}

function checkGameEnded() {
    if(NPC.gameboard.areAllShipsSunk()) return "Player";
    if(PLAYER.gameboard.areAllShipsSunk()) return "NPC";
    return null;
}

function resetState() {
    PLAYER = new Player();
    NPC = new Player();
    ATTACKED_PLAYER = null;
    NPC.addRandomShips();
}

export { PLAYER, NPC, ATTACKED_PLAYER, checkGameEnded, resetState, setAttackedPlayer };