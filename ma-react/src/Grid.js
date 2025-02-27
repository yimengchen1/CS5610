import React, { useContext } from 'react';
import { GridContext } from './GridContext';
import Cell from './Cell';

const Grid = () => {
  const { grid } = useContext(GridContext);
  const countOn = grid.filter(cell => cell).length;

  return (
      <div>
        <h2>Count: {countOn}</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 100px)',
          gridTemplateRows: 'repeat(2, 100px)'
        }}>
          {grid.map((cell, index) => (
              <Cell key={index} index={index} />
          ))}
        </div>
      </div>
  );
};

export default Grid;
