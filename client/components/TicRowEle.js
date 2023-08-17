import { TicRowEleLabel } from "./TicRowEleLabel.js";

function TicRowEle(eleId, onClickTicRowEle){
    const innerLabel = TicRowEleLabel(eleId);
    const btn = document.createElement('button');
    btn.id = "button_"+eleId;
    btn.className = 'ticele';
    btn.onclick = ()=>{onClickTicRowEle(eleId)};
    btn.appendChild(innerLabel);
    return btn;
}

export {TicRowEle}