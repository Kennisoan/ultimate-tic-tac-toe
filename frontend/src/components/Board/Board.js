import React from 'react';
import { range, checkWinner } from '../../utils';

import styles from './Board.module.css';

function Board({
  active,
  boardIndex,
  setActiveBoard,
  gameGrid,
  setGameGrid,
  activePlayer,
  toggleActivePlayer,
}) {
  const [board, setBoard] = React.useState(Array(9).fill(undefined));
  const boardWinner = gameGrid[boardIndex];

  function handleMove(index) {
    if (board[index]) {
      return;
    }

    // Update the board
    const nextBoard = [...board];
    nextBoard[index] = activePlayer;
    setBoard(nextBoard);

    // Check for a winner
    const winner = checkWinner(nextBoard);
    const nextGameGrid = [...gameGrid];
    if (winner) {
      nextGameGrid[boardIndex] = winner;
      setGameGrid(nextGameGrid);
    }

    // Set active board(s)
    nextGameGrid[index] === undefined
      ? setActiveBoard(index)
      : setActiveBoard(undefined);
    toggleActivePlayer();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        {range(3).map((rowIndex) => (
          <div key={`inner-row-${rowIndex}`} className={styles.row}>
            {range(3).map((colIndex) => (
              <button
                key={`inner-col-${rowIndex}-${colIndex}`}
                className={styles.cell}
                disabled={!active || boardWinner}
                onClick={() => handleMove(rowIndex * 3 + colIndex)}
              >
                {board[rowIndex * 3 + colIndex]}
              </button>
            ))}
          </div>
        ))}
      </div>
      {boardWinner && (
        <div className={styles.winnerOverlay}>{boardWinner}</div>
      )}
    </div>
  );
}

export default Board;
