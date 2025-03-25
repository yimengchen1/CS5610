import React from 'react';
import Tile from './Tile';

const Board = ({ board, onTileClick, isEnemy, mode }) => {
  return (
      <div style={styles.boardWrapper}>
        <h2 style={styles.boardTitle}>{isEnemy ? 'Enemy Board' : 'Player Board'}</h2>
        <table style={styles.table}>
          <thead>
          <tr>
            <th style={styles.headerCell}></th>
            {Array.from({ length: board.length }, (_, idx) => (
                <th key={idx} style={styles.headerCell}>{idx + 1}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {board.map((row, rIndex) => (
              <tr key={rIndex}>
                <th style={styles.headerCell}>{String.fromCharCode(65 + rIndex)}</th>
                {row.map((cell, cIndex) => (
                    <Tile
                        key={cIndex}
                        cell={cell}
                        row={rIndex}
                        col={cIndex}
                        onClick={onTileClick}
                        isEnemy={isEnemy}
                        mode={mode}
                    />
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

const styles = {
  boardWrapper: {
    background: 'rgba(0,191,255,0.05)',
    border: '2px solid rgba(0,191,255,0.1)',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 0 20px rgba(0,191,255,0.1)',
    margin: '10px'
  },
  boardTitle: {
    textAlign: 'center',
    color: '#00bfff'
  },
  table: {
    borderCollapse: 'collapse',
    margin: '0 auto'
  },
  headerCell: {
    width: '35px',
    height: '35px',
    border: '1px solid rgba(0,191,255,0.2)',
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: 'rgba(51,51,51,0.8)',
    color: '#00bfff',
    padding: '5px'
  }
};

export default Board;
