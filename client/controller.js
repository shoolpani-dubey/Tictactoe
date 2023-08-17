function tictactoeController(){
    let game = {
        id:null,
        board:null,
        status:null
    };
    const selfIcon = 'x';
    const setGame = (data) => {
        game = {
            ...game,
            ...data
        };
    };
    return {
        onClickTicRowEle:(indexEleChanged)=>onClickTicRowEleImpl(game, selfIcon, setGame, indexEleChanged)
    }
}

async function onClickTicRowEleImpl(game, selfIcon, setGame, indexEleChanged){
    if(game?.status && game.status !== 'RUNNING'){
        return;
    }
    // Get new board data
    const newGameBoardRep = getNewBoardData(indexEleChanged, selfIcon);
    // Update local representation
    const newGameRep = {
        ...game,
        board: newGameBoardRep
    }
    setGame(newGameRep);
    // now we either create or update the game.
    let playersGame = null;
    if(!game.id){
        // start a new game.
        playersGame = await startNewGame(newGameRep);
        // const newBoardRep = playersGame.board;
        // setGame(playersGame);
        // updateBoardWithBoardRep(newBoardRep);
        // updateStatus(playersGame.status.toUpperCase());
    }else{
        // update the existing game.
        playersGame = await updateExistingGame(newGameRep)
        
    }
    const newBoardRep = playersGame.board;
        setGame(playersGame);
        updateBoardWithBoardRep(newBoardRep);
        // check if win or loss or continue, if win/loss, anounce and reset gameboard and gameid
        updateStatus(playersGame.status.toUpperCase());

}

function updateStatus(status){
    switch(status){
        case "X_WON":
            document.getElementById("status").innerText = "You won the game";
            document.getElementById("status").style.backgroundColor = "green";
            document.getElementById("status").style.padding = "1rem 0"
            break;
        case "O_WON":
            document.getElementById("status").innerText = "You lost the game";
            document.getElementById("status").style.backgroundColor = "red";
            document.getElementById("status").style.padding = "1rem 0"
            break;
        case "RUNNING":
            document.getElementById("status").innerText = "Game in progress";
            document.getElementById("status").style.backgroundColor = "lightgrey";
            document.getElementById("status").style.padding = "1rem 0"
            break;
        case "DRAW":
            document.getElementById("status").innerText = "The match is a draw";
            document.getElementById("status").style.backgroundColor = "orange";
            document.getElementById("status").style.padding = "1rem 0"
            break;
    }
}
async function updateExistingGame(newGameRep){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": newGameRep.id,
      "board": newGameRep.board,
      "status": newGameRep.status
    });
    
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
      
}
async function startNewGame(newGameRep){
    // post this to server and retun the recieved data.
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "board": newGameRep.board
    });

    var requestOptions = {
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
    
    
}
function getNewBoardData(indexEleChanged, selfIcon){
    // first update the board representation if no value present
    const boxValue = document.getElementById('label_'+indexEleChanged)
    if(boxValue?.innerText){
        return;
    }
    boxValue.innerText = selfIcon;
    // next get the updated board representation
    let boardRep = '';
    for(let index=0;index<9;index++){
        const val = document.getElementById('label_'+index).innerText;
        if(!val){
            boardRep = boardRep + '-';
        }else{
            boardRep = boardRep + val;
        }
        
    }
    return boardRep;
}
function updateBoardWithBoardRep(boardRep){
    for(let index=0;index<9;index++){
        if(boardRep[index]==="-"){
            continue;
        }
        document.getElementById('label_'+index).innerText = boardRep[index];
    }
}
export {tictactoeController};