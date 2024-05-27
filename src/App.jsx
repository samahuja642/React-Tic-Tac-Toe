import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

function deriveActivePlayer(turns) {
  let currPlayer = 'X';
  if (turns.length > 0) currPlayer = turns[0].symbol === 'X' ? 'O' : 'X';
  return currPlayer;
}

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameBoard,players) {
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)winner = players[firstSquareSymbol];
  }
  return winner;
}

function deriveGameBoard(turns,gameBoard){
  for (const turn of turns){
    const {square,symbol} = turn;
    const {row,col} = square;
    gameBoard[row][col] = symbol;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({
    'X':'Player 1',
    'O':'Player 2'
  });
  let gameBoard = [...INITIAL_BOARD.map(arr => [...arr])];
  const [turns, setTurns] = useState([]);
  const activePlayer = deriveActivePlayer(turns);//turn change logic for player component 
  gameBoard = deriveGameBoard(turns,gameBoard);
  const winner = deriveWinner(gameBoard,players);
  const gameDrawn = turns.length===9?true:false;
  function handleSelectSquare(rowIndex, colIndex) {
    setTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(turns);//turn change logic for board
      return [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          symbol: currPlayer
        },
        ...prevTurns
      ]
    })
  }
  function handleRestart(){
    setTurns([]);
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayers( previousPlayers => {
        return {...previousPlayers,[symbol]:newName};
      }
    )
  }
  return (
    <main>
      <header>
        <img src="game-logo.png" alt="Tic Tac Toe" />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" nameChange={handlePlayerNameChange} isActive={activePlayer === 'X' ? true : false} />
          <Player initialName="Player 2" symbol="O" nameChange={handlePlayerNameChange} isActive={activePlayer === 'O' ? true : false} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} currPlayer={activePlayer} gameBoard={gameBoard} />
        {(winner||gameDrawn)&&<GameOver winner={winner} handleRestart={handleRestart}></GameOver>}
      </div>
      <Log turns={turns}></Log>
    </main>
  )
}

export default App
