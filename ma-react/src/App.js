import React from 'react';
import { GridProvider } from './GridContext';
import Grid from './Grid';
import './App.css';

const App = () => {
  return (
      <GridProvider>
        <div className="app-container">
          <Grid />
        </div>
      </GridProvider>
  );
};

export default App;
