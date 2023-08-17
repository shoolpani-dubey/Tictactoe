import {TicTacToe} from './components/TicTacToe.js';
import {tictactoeController} from './controller.js';
import {StatusComponent} from './components/StatusComponent.js';

console.log("Welcome to tic-tac-toe");
const tttController = tictactoeController();
const rootEle = document.getElementById('root');
rootEle.appendChild(StatusComponent());
rootEle.appendChild(TicTacToe(tttController));
