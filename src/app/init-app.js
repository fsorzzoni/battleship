import { initAttackListener, initFormListener } from "../domain/listeners";
import { updateEnemyBoard, updateOwnBoard } from "../domain/table";
import { resetState } from "../state/state";

export default function initApp() {
    resetState();
    initFormListener();
    initAttackListener();
    updateOwnBoard();
    updateEnemyBoard();
}