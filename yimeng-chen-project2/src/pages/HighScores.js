import React from 'react';

const HighScores = () => {
  return (
      <main style={styles.main}>
        <h1>High Scores</h1>
        <table style={styles.scoresTable}>
          <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Alba</td>
            <td>42</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Yeji</td>
            <td>38</td>
            <td>8</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Yuna</td>
            <td>35</td>
            <td>12</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Iga</td>
            <td>32</td>
            <td>15</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Ophelia</td>
            <td>30</td>
            <td>10</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Yujin</td>
            <td>28</td>
            <td>11</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Ally</td>
            <td>26</td>
            <td>13</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Karina</td>
            <td>25</td>
            <td>14</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Minji</td>
            <td>23</td>
            <td>16</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Hanni</td>
            <td>22</td>
            <td>18</td>
          </tr>
          </tbody>
        </table>
      </main>
  );
};

const styles = {
  main: {
    paddingTop: '80px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#fff'
  },
  scoresTable: {
    width: '80%',
    margin: '30px auto',
    borderCollapse: 'collapse',
    background: 'rgba(51,51,51,0.9)',
    color: '#fff'
  },
  th: {
    padding: '12px',
    border: '1px solid #00bfff',
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#00bfff'
  },
  td: {
    padding: '12px',
    border: '1px solid #00bfff',
    textAlign: 'center'
  }
};

export default HighScores;
