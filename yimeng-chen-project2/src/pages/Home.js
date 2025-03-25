import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <main style={styles.main}>
        <div style={styles.heroSection}>
          <i className="fas fa-ship" style={styles.gameIcon}></i>
          <h1>Battleship Game</h1>
          <p>Play Battleship online with a modern HTML5 version.</p>
          <div style={styles.buttonContainer}>
            <Link to="/game/normal" style={styles.ctaButton}>
              <i className="fas fa-play"></i> Start Normal Game!
            </Link>
            <Link to="/game/easy" style={styles.ctaButton}>
              <i className="fas fa-play"></i> Start Free Play Game!
            </Link>
          </div>
        </div>
      </main>
  );
};

const styles = {
  main: {
    paddingTop: '80px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  heroSection: {
    padding: '40px 20px'
  },
  gameIcon: {
    fontSize: '4rem',
    color: '#00bfff',
    margin: '30px 0',
    opacity: 0.9
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  ctaButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#00bfff',
    color: '#1a1a1a',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  }
};

export default Home;
