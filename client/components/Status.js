import { GameStatus, GameSymbol } from "../utils/constants.js";

function Status(gameSymbol,gameStatus, onRestart){
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';

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

    const button = document.createElement('button');
    button.textContent = "Restart Game";
    button.onclick = onRestart;
    button.style.margin = '1rem 0';

    div.appendChild(label);
    div.appendChild(button);
    return div;
}
export {Status};