import { ChoosePlayer } from './components/ChoosePlayer.js';
import { ChooseSymbol } from './components/ChooseSymbol.js';
import { Status } from './components/Status.js';
import {TicTacToe} from './components/TicTacToe.js';
import { GameStatus, Player } from './utils/constants.js';
import {storeInstance} from './store.js';

const coreLogic = async (store, setStore) => {
    console.log("Store Rep:",store);
    const rootEle = document.getElementById('root');
    const onRestart = () => {
        setStore({
            game:{
                id:null,
                board:'---------',
                status:null
            },
            gameSymbol:null,
            whoPlaysFirst:null
        })
    }
    const onChooseSymbol = (symbol) => {
        setStore({
            gameSymbol:symbol
        });
    };
    const onPlayerSelect = (player) => {
        setStore({
            whoPlaysFirst:player
        });
    };
    const clearScreen = (rootEle) => {
        rootEle.innerHTML = '';
    };
    async function updateExistingGame(newGameRep){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify(newGameRep);
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        
        try{
            const response = await fetch("http://127.0.0.1:5555/api/v1/games/"+newGameRep.id, requestOptions)
            return await response.json();
        }catch(e){
            // some error
            return null;
        }
          
    };
    async function createBoardInstance(gameInstance){
        // post this to server and retun the recieved data.
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "board": gameInstance.board
        });

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        try{
            const response = await fetch("http://127.0.0.1:5555/api/v1/games", requestOptions)
            return await response.json();
        }catch(e){
            // some error
            return null;
        }
    };
    
    async function onClickTicRowEleImpl(game, selfIcon, setStore, indexEleChanged){
        if(game?.status && game.status !== GameStatus.RUNNING){
            return;
        }
        // Get new board data
        const newGameBoardRepArr = game.board.split('');
        newGameBoardRepArr[indexEleChanged] = selfIcon;
        // Update local representation
        const newGameRep = {
            ...game,
            board: newGameBoardRepArr.join('')
        }
        // now we either create or update the game.
        let playersGame = null;
        if(!game.id){
            // start a new game.
            playersGame = await createBoardInstance(newGameRep);
        }else{
            // update the existing game.
            playersGame = await updateExistingGame(newGameRep)
            
        }
        setStore({
            game:playersGame
        });
    }
    async function onInteraction(indexEleChanged){
        onClickTicRowEleImpl(store.game, store.gameSymbol, setStore, indexEleChanged);
    }

    // If status is one of X_WON, O_WON, DRAW show the relevant messasge.
    const gameStatus = store.game.status;
    if(gameStatus === GameStatus.DRAW
        || gameStatus === GameStatus.O_WON
        || gameStatus === GameStatus.X_WON){
            clearScreen(rootEle);
            const statusComp = Status(store.gameSymbol,gameStatus, onRestart);
            rootEle.appendChild(statusComp);
            return;
        }
    // If symbol is not chosen, then render the option to choose symbol
    if(!store.gameSymbol){
        clearScreen(rootEle);
        const chooseSymbolComponent = ChooseSymbol(onChooseSymbol);
        rootEle.appendChild(chooseSymbolComponent);
        return;
    }
    // Now lets choose who starts the game.
    if(!store.whoPlaysFirst){
        clearScreen(rootEle);
        const whoPlayesComponent = ChoosePlayer(onPlayerSelect);
        rootEle.appendChild(whoPlayesComponent);
        return;
    }
    console.log("Symbol:",store.gameSymbol);
    console.log("Player:",store.whoPlaysFirst);
    // If the other player plays first and this is first time of play
    if(store.whoPlaysFirst === Player.OTHER && store.game.board === '---------'){
        clearScreen(rootEle);
        const newGameData = await createBoardInstance(store.game);
        if(!newGameData){
            return;
        }
        setStore({
            game:newGameData
        });
        return;
    }

    // Render the tictactoe GUI and let's start interacting with it.
    clearScreen(rootEle);
    rootEle.appendChild(TicTacToe(store.game.board, onInteraction));
};
const onStoreChange = (newStore) => {
    coreLogic(newStore, storeInstance.setStore);
}
storeInstance.subscribeToStoreChanges(onStoreChange);
coreLogic(storeInstance.store, storeInstance.setStore);