import { GameStatus, GameSymbol } from "../utils/constants.js";

function Status(gameSymbol,gameStatus){
    const label = document.createElement('label');
    label.id="status";
    label.className = "status";
    switch(gameStatus){
        case GameStatus.O_WON:
            if(gameSymbol === GameSymbol.O){
                label.textContent = "You won.";
            }else{
                label.textContent = "You lost.";
            }
            break;
        case GameStatus.X_WON:
            if(gameSymbol === GameSymbol.X){
                label.textContent = "You won.";
            }else{
                label.textContent = "You lost.";
            }
            break;
        case GameStatus.DRAW:
            label.textContent = "This match was a draw.";
            break;
    }
    return label;
}
export {Status};