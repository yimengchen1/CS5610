import React, { useState, createContext } from 'react';

export const GridContext = createContext();

export const GridProvider = ({ children }) => {
  // The state of each cell, using false represents off, true represents on.
  const [grid, setGrid] = useState([false, false, false, false]);

  const toggleCell = (index) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[index] = !newGrid[index];
      return newGrid;
    });
  };

  return (
      <GridContext.Provider value={{ grid, toggleCell }}>
        {children}
      </GridContext.Provider>
  );
};
