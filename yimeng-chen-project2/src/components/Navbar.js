import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const getActive = (path) =>
      location.pathname === path ? 'active' : '';
  return (
      <header style={styles.header}>
        <nav>
          <ul style={styles.navList}>
            <li>
              <Link to="/" style={{...styles.link, ...(location.pathname === '/' ? styles.active : {})}}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/game/normal" style={{...styles.link, ...(location.pathname === '/game/normal' ? styles.active : {})}}>
                Game
              </Link>
            </li>
            <li>
              <Link to="/rules" style={{...styles.link, ...(location.pathname === '/rules' ? styles.active : {})}}>
                Rules
              </Link>
            </li>
            <li>
              <Link to="/highscores" style={{...styles.link, ...(location.pathname === '/highscores' ? styles.active : {})}}>
                High Scores
              </Link>
            </li>
          </ul>
        </nav>
      </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '10px 0',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    gap: '25px'
  },
  link: {
    color: '#00bfff',
    textDecoration: 'none',
    fontSize: '1.1em',
    padding: '5px 10px',
    transition: 'color 0.3s, background-color 0.3s'
  },
  active: {
    color: '#fff',
    backgroundColor: '#00bfff',
    borderRadius: '4px'
  }
};

export default Navbar;
