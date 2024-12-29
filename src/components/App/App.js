import React from 'react';
import BigBoard from '../BigBoard';

function App() {
  const [board, setBoard] = React.useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(undefined))
  );
  const [turn, setTurn] = React.useState('X');
  const [activeBoard, setActiveBoard] = React.useState(4);

  function handleMove(index, innerIndex) {
    // Update Grid
    nextBoard = board.map((row) => [...row]);
    nextBoard[index][innerIndex] = turn;
    setBoard(nextBoard);
    // Update Active Board
    console.log(index, innerIndex);
    setActiveBoard(innerIndex);
    // Set Active Player
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  return (
    <BigBoard
      board={board}
      activeBoard={activeBoard}
      handleMove={handleMove}
    />
  );
}

export default App;
