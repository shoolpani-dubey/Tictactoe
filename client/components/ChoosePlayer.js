import { Player } from "../utils/constants.js";

function ChoosePlayer(onPlayerSelect){
    const playerWrapper = document.createElement('div');
    playerWrapper.style.display = 'flex';
    playerWrapper.style.flexDirection = 'column';

    const label = document.createElement('label');
    label.style.textAlign = 'center';
    label.style.textTransform = 'uppercase';
    label.innerText = "Choose who starts the game.";
    playerWrapper.appendChild(label);

    const selfButton = document.createElement('button');
    selfButton.style.margin = '1rem';
    selfButton.style.padding = '1rem';
    selfButton.textContent = "I start Game";
    selfButton.onclick = () => onPlayerSelect(Player.SELF);
    playerWrapper.appendChild(selfButton);

    const oButton = document.createElement('button');
    oButton.style.margin = '1rem';
    oButton.style.padding = '1rem';
    oButton.textContent = "Other player starts game";
    oButton.onclick = () => onPlayerSelect(Player.OTHER);
    playerWrapper.appendChild(oButton);

    return playerWrapper;
}
export {ChoosePlayer};