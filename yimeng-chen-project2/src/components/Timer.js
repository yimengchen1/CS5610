import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Timer = () => {
  const { state } = useContext(GameContext);
  const seconds = Math.floor((state.elapsed / 1000) % 60)
  .toString()
  .padStart(2, '0');
  const minutes = Math.floor((state.elapsed / 1000) / 60)
  .toString()
  .padStart(2, '0');
  return (
      <div style={styles.timer}>
        <i className="fas fa-clock"></i> Time: {minutes}:{seconds}
      </div>
  );
};

const styles = {
  timer: {
    fontSize: '1.2em',
    color: '#00bfff',
    margin: '10px'
  }
};

export default Timer;
