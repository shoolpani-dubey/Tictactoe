import {TicRow} from './TicRow.js';

function TicTacToe(tictactoeController){
    const rowEleCount = 3;
    const colEleCount = 3;
    const tictactoediv = document.createElement('div');
    tictactoediv.className="tictactoe";
    for(let rowCount=0;rowCount<colEleCount;rowCount++){
        const ticRow = TicRow(rowCount,rowEleCount,tictactoeController.onClickTicRowEle);
        tictactoediv.appendChild(ticRow);
    }
    return tictactoediv;
}

export {TicTacToe};