import React from 'react';
import styles from './Alert.module.css';

import { sample } from '../../utils';

function Alert({ gameStatus, activePlayer }) {
  const nextMovePhrases = [
    'Your move, %!',
    '%, it’s your turn!',
    '%, make your move!',
    'Player %, it’s your turn!',
    '%’s move!',
    '%, time to play!',
    '%, take the next step!',
    'Go ahead, %!',
  ];

  const [before, after] = sample(nextMovePhrases).split('%');

  if (gameStatus === 'playing') {
    return (
      <div className={styles.wrapper}>
        {before}
        <div className={styles.player}>{activePlayer}</div>
        {after}
      </div>
    );
  } else if (gameStatus === 'finished') {
    return (
      <div className={styles.wrapper}>
        <b>
          <div className={styles.player}>{activePlayer}</div> won!
        </b>{' '}
        Congratulations!
      </div>
    );
  }
}

export default Alert;
