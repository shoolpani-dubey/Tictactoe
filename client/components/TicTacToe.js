import {TicRow} from './TicRow.js';

function TicTacToe(board, onInteraction){
    const tictactoediv = document.createElement('div');
    tictactoediv.className="tictactoe";
    for(let i=0;i<3;i++){
        const sliceStart = i*3;
        const sliceEnd = sliceStart + 3;
        const rowIndexStart = sliceStart;
        const ticRow = TicRow(board.slice(sliceStart,sliceEnd),rowIndexStart,onInteraction);
        tictactoediv.appendChild(ticRow);
    }
    return tictactoediv;
}

export {TicTacToe};