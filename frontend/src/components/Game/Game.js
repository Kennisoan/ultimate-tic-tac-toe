import React from 'react';
import BigBoard from '../BigBoard';
import Alert from '../Alert';

import styles from './Game.module.css';

function Game() {
  const [gameStatus, setGameStatus] = React.useState('playing');
  const [activePlayer, setActivePlayer] = React.useState('X');
  function toggleActivePlayer() {
    const nextActivePlayer = activePlayer === 'X' ? 'O' : 'X';
    setActivePlayer(nextActivePlayer);
  }

  return (
    <div className={styles.container}>
      <h2>Ultimate Tic-Tac-Toe</h2>
      <p className={styles.madeBy}>
        By <a href="https://github.com/Kennisoan">Klim Korovkin</a>{' '}
        and{' '}
        <a href="https://github.com/vitosotdihaet">Vitaly Klimenko</a>
        .
      </p>

      <Alert gameStatus={gameStatus} activePlayer={activePlayer} />
      <BigBoard
        activePlayer={activePlayer}
        toggleActivePlayer={toggleActivePlayer}
        setGameStatus={setGameStatus}
      />

      <p className={styles.credits}>
        Based on the Ultimate tic-tac-toe game from{' '}
        <a href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe">
          Wikipedia
        </a>
        .
      </p>
    </div>
  );
}

export default Game;
