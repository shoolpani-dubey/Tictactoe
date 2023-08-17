import { TicRowEle } from "./TicRowEle.js";

function TicRow(rowCount, rowElementCount, onClickTicRowEle){
    const row = document.createElement('div');
    row.className = "ticrow";
    const loopStart = rowCount*rowElementCount;
    for(let i=loopStart;i<loopStart+rowElementCount;i++){
        const rowEle = TicRowEle(i, onClickTicRowEle);
        row.appendChild(rowEle);
    }
    return row;
}

export {TicRow}