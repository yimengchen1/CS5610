import React, { useContext } from 'react';
import { GridContext } from './GridContext';

const Cell = ({ index }) => {
  const { grid, toggleCell } = useContext(GridContext);

  return (
      <div
          onClick={() => toggleCell(index)}
          style={{
            width: '100px',
            height: '100px',
            border: '1px solid grey',
            backgroundColor: grid[index] ? 'black' : 'white',
            cursor: 'pointer'
          }}
      />
  );
};

export default Cell;
