import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';

function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:mode" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/highscores" element={<HighScores />} />
        </Routes>
      </>
  );
}

export default App;
