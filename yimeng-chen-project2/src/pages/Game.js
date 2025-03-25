import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';
import Timer from '../components/Timer';
import { GameContext } from '../context/GameContext';

const Game = () => {
  const { mode } = useParams();
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    dispatch({ type: 'INIT_GAME', payload: { mode } });
  }, [dispatch, mode]);

  const handleTileClick = (row, col) => {
    if (state.gameOver || state.turn !== 'player') return;
    dispatch({ type: 'PLAYER_ATTACK', payload: { row, col } });
  };

  useEffect(() => {
    if (state.turn === 'enemy' && !state.gameOver && state.mode === 'normal') {
      const aiTimeout = setTimeout(() => {
        dispatch({ type: 'ENEMY_ATTACK' });
      }, 1000);
      return () => clearTimeout(aiTimeout);
    }
  }, [state.turn, state.gameOver, state.mode, dispatch]);

  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'INIT_GAME', payload: { mode } });
  };

  return (
      <main style={styles.main}>
        <h1 style={styles.title}>
          {state.gameOver ? `Game Over! ${state.winner} Won!` : 'Game in Progress'}
        </h1>
        <Timer />
        <div style={styles.info}>
          <p>Current Turn: {state.turn ? state.turn : 'None'}</p>
        </div>
        <div style={styles.boardsContainer}>
          {state.mode === 'normal' && (
              <Board
                  board={state.playerBoard}
                  onTileClick={() => {}}
                  isEnemy={false}
              />
          )}
          <Board
              board={state.enemyBoard}
              onTileClick={handleTileClick}
              isEnemy={true}
              mode={state.mode}
          />
        </div>
        <div style={styles.controls}>
          <button onClick={handleReset} style={styles.restartBtn}>
            <i className="fas fa-redo"></i> Reset
          </button>
        </div>
      </main>
  );
};

const styles = {
  main: {
    paddingTop: '80px',
    maxWidth: '1400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#fff'
  },
  info: {
    margin: '10px',
    fontSize: '1.2em',
    color: '#00bfff'
  },
  boardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '20px',
    flexWrap: 'wrap'
  },
  controls: {
    textAlign: 'center',
    margin: '30px 0'
  },
  restartBtn: {
    padding: '8px 25px',
    backgroundColor: '#00bfff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};

export default Game;
