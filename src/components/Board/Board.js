import React from 'react';
import { range } from '../../utils';

import styles from './Board.module.css';

function Board({ board, active, handleMove, rowIndex, colIndex }) {
  return (
    <div className={styles.wrapper}>
      {range(3).map((innerRowIndex) => (
        <div
          key={`inner-row-${innerRowIndex}`}
          className={styles.row}
        >
          {range(3).map((innerColIndex) => (
            <button
              key={`inner-col-${innerRowIndex}-${innerColIndex}`}
              className={styles.cell}
              disabled={!active}
              onClick={() =>
                handleMove(
                  rowIndex * 3 + colIndex,
                  innerRowIndex * 3 + innerColIndex
                )
              }
            >
              {
                board[rowIndex * 3 + colIndex][
                  innerRowIndex * 3 + innerColIndex
                ]
              }
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
