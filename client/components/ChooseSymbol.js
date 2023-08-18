import { GameSymbol } from "../utils/constants.js";

function ChooseSymbol(onChooseSymbol){
    const symbolWrapper = document.createElement('div');
    symbolWrapper.style.display = 'flex';
    symbolWrapper.style.flexDirection = 'column';

    const label = document.createElement('label');
    label.style.textAlign = 'center';
    label.style.textTransform = 'uppercase';
    label.innerText = "Choose a symbol";
    symbolWrapper.appendChild(label);

    const xButton = document.createElement('button');
    xButton.style.margin = '1rem';
    xButton.style.padding = '1rem';
    xButton.textContent = GameSymbol.X.toUpperCase();
    xButton.onclick = () => onChooseSymbol(GameSymbol.X);
    symbolWrapper.appendChild(xButton);

    const oButton = document.createElement('button');
    oButton.style.margin = '1rem';
    oButton.style.padding = '1rem';
    oButton.textContent = GameSymbol.O.toUpperCase();
    oButton.onclick = () => onChooseSymbol(GameSymbol.O);
    symbolWrapper.appendChild(oButton);

    return symbolWrapper;
}

export {ChooseSymbol};