import initApp from "../app/init-app";
import { ATTACKED_PLAYER, checkGameEnded, NPC, PLAYER, resetState, setAttackedPlayer } from "../state/state";
import { parseKey } from "../utils/coord-keys";
import { updateEnemyBoard, updateOwnBoard } from "./table";

function initFormListener() {
    const form = document.getElementById("place-ship-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const startX = Number(formData.get("startX"));
        const startY = Number(formData.get("startY"));
        const endX = Number(formData.get("endX"));
        const endY = Number(formData.get("endY"));
        try {
            PLAYER.gameboard.addShip([startX, startY], [endX, endY]);
            updateOwnBoard();
            if(PLAYER.gameboard.ships.length >= 4) {
                console.log("ataca el jugador")
                setAttackedPlayer("Npc");
            }
        } catch (error) {
        }
    });
}

function initAttackListener() {
    const enemyBoard = document.getElementById("enemy-table-container");

    enemyBoard.addEventListener("click", (e) => {
        console.log("se entro al listener")
        
        if(ATTACKED_PLAYER !== "Npc") return;

        const coords = e.target.dataset.coords;

        try {
            console.log("se hacen los cambios")
            NPC.gameboard.receiveAttack(parseKey(coords));
            updateEnemyBoard();
            setAttackedPlayer("Player");
            PLAYER.receiveRandomAttack();
            updateOwnBoard();
            setAttackedPlayer("Npc");
            const gameWinner = checkGameEnded();
            if(gameWinner !== null) {
                resetState();
                const form = document.getElementById("place-ship-form");
                form.reset();
                updateEnemyBoard();
                updateOwnBoard();
                alert(gameWinner + "ganó.")
            }
        } catch (error) {
        }
    });
}

export { initFormListener, initAttackListener };