import React from 'react';
import { range } from '../../utils';

import Board from '../Board';
import styles from './BigBoard.module.css';

function BigBoard({ board, activeBoard, handleMove }) {
  return (
    <div className={styles.wrapper}>
      {range(3).map((rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {range(3).map((colIndex) => (
            <Board
              key={`col-${colIndex}`}
              board={board}
              active={activeBoard === rowIndex * 3 + colIndex}
              handleMove={handleMove}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BigBoard;
