import React from 'react';

const Tile = ({ cell, row, col, onClick, isEnemy, mode }) => {
  const handleClick = () => {
    onClick(row, col);
  };

  let backgroundColor = 'rgba(68,68,68,0.3)';
  let content = null;
  if (cell.hit) {
    backgroundColor = 'rgba(255,0,0,0.1)';
    content = <i className="fas fa-times" style={{ color: 'red' }} />;
  } else if (cell.miss) {
    backgroundColor = 'rgba(0,255,0,0.1)';
    content = <i className="fas fa-check" style={{ color: 'green' }} />;
  } else if (!isEnemy && cell.ship) {
    content = <i className="fas fa-circle" style={{ color: 'black' }} />;
  }

  return (
      <td
          className="tile"
          style={{ ...styles.tile, backgroundColor }}
          onClick={isEnemy && !cell.hit && !cell.miss ? handleClick : undefined}
      >
        {content}
      </td>
  );
};

const styles = {
  tile: {
    width: '35px',
    height: '35px',
    border: '1px solid rgba(0,191,255,0.2)',
    textAlign: 'center',
    verticalAlign: 'middle',
    transition: 'all 0.2s ease'
  }
};

export default Tile;
