import React from 'react';
import { range, checkWinner } from '../../utils';

import Board from '../Board';
import styles from './BigBoard.module.css';

function BigBoard({
  activePlayer,
  toggleActivePlayer,
  setGameStatus,
}) {
  const [gameGrid, setGameGrid] = React.useState(
    Array(9).fill(undefined)
  );

  const [activeBoard, setActiveBoard] = React.useState();

  React.useEffect(() => {
    const winner = checkWinner(gameGrid);
    if (winner) {
      setGameStatus('finished');
      setActiveBoard(-1);
      toggleActivePlayer();
      console.log(`${winner} won!`);
    }
  }, [gameGrid]);

  return (
    <div className={styles.wrapper}>
      {range(3).map((rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {range(3).map((colIndex) => (
            <Board
              key={`col-${colIndex}`}
              active={
                activeBoard === rowIndex * 3 + colIndex ||
                activeBoard === undefined
              }
              boardIndex={rowIndex * 3 + colIndex}
              setActiveBoard={setActiveBoard}
              gameGrid={gameGrid}
              setGameGrid={setGameGrid}
              activePlayer={activePlayer}
              toggleActivePlayer={toggleActivePlayer}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BigBoard;
