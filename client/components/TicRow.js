import { TicRowEle } from "./TicRowEle.js";

function TicRow(boardPart, initId, onClickTicRowEle){
    console.log("TicRow",boardPart, initId, onClickTicRowEle);
    const row = document.createElement('div');
    row.className = "ticrow";
    // const loopStart = rowCount*rowElementCount;
    for(let i=0;i<3;i++){
        const rowEle = TicRowEle(initId+i,boardPart[i], onClickTicRowEle);
        row.appendChild(rowEle);
    }
    return row;
}

export {TicRow}