import React, { createContext, useReducer, useEffect } from 'react';

export const BOARD_SIZE = 10;
const SHIPS = [5, 4, 3, 3, 2];

const initialState = {
  playerBoard: createEmptyBoard(),
  enemyBoard: createEmptyBoard(),
  playerShips: [],
  enemyShips: [],
  turn: 'player',
  gameOver: false,
  winner: '',
  startTime: Date.now(),
  elapsed: 0,
  mode: 'normal',
  aiTargets: [] // AI logic
};

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        hit: false,
        miss: false,
        ship: false,
        shipId: null
      }))
  );
}

// Random placement for ships
function placeShipsRandomly(board) {
  const ships = [];
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  SHIPS.forEach((length, shipIndex) => {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (
          (orientation === 'H' && col + length > BOARD_SIZE) ||
          (orientation === 'V' && row + length > BOARD_SIZE)
      ) {
        continue;
      }
      let overlap = false;
      for (let i = 0; i < length; i++) {
        const r = orientation === 'H' ? row : row + i;
        const c = orientation === 'H' ? col + i : col;
        if (newBoard[r][c].ship) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        const positions = [];
        for (let i = 0; i < length; i++) {
          const r = orientation === 'H' ? row : row + i;
          const c = orientation === 'H' ? col + i : col;
          newBoard[r][c].ship = true;
          newBoard[r][c].shipId = shipIndex;
          positions.push({ row: r, col: c, hit: false });
        }
        ships.push({ shipIndex, length, positions });
        placed = true;
      }
    }
  });
  return { board: newBoard, ships };
}

function loadState() {
  const stored = localStorage.getItem('battleship-state');
  if (stored) return JSON.parse(stored);
  return null;
}

const GameContext = createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME': {
      const modeParam = action.payload.mode;
      const mode = modeParam === 'easy' ? 'free' : modeParam;
      let playerBoard = createEmptyBoard();
      let enemyBoard = createEmptyBoard();
      const playerPlacement = placeShipsRandomly(playerBoard);
      const enemyPlacement = placeShipsRandomly(enemyBoard);
      return {
        ...state,
        mode,
        playerBoard: playerPlacement.board,
        enemyBoard: enemyPlacement.board,
        playerShips: playerPlacement.ships,
        enemyShips: enemyPlacement.ships,
        turn: 'player',
        gameOver: false,
        winner: '',
        startTime: Date.now(),
        elapsed: 0,
        aiTargets: []
      };
    }

    case 'PLAYER_ATTACK': {
      const { row, col } = action.payload;
      const enemyBoard = state.enemyBoard.map(r => r.map(cell => ({ ...cell })));

      // If attacked, do not process.
      if (enemyBoard[row][col].hit || enemyBoard[row][col].miss) return state;

      if (enemyBoard[row][col].ship) {
        enemyBoard[row][col].hit = true;
      } else {
        enemyBoard[row][col].miss = true;
      }

      // Check if all enemy ships have been sunk
      const allEnemyShipsSunk = state.enemyShips.every(ship =>
          ship.positions.every(pos => enemyBoard[pos.row][pos.col].hit)
      );

      if (allEnemyShipsSunk) {
        return {
          ...state,
          enemyBoard,
          gameOver: true,
          winner: 'Player',
          turn: ''
        };
      }

      // Based on the pattern to decide the next step
      if (state.mode === 'free') {
        return {
          ...state,
          enemyBoard,
          turn: 'player'
        };
      } else {
        return {
          ...state,
          enemyBoard,
          turn: 'enemy'
        };
      }
    }

    case 'ENEMY_ATTACK': {
      if (state.mode === 'free') return state;

      const playerBoard = state.playerBoard.map(r => r.map(cell => ({ ...cell })));
      let target;
      let newAiTargets = state.aiTargets ? [...state.aiTargets] : [];

      // AI attack logic
      if (newAiTargets.length > 0) {
        target = newAiTargets.shift();
      } else {
        const available = [];
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (!playerBoard[r][c].hit && !playerBoard[r][c].miss) {
              available.push({ row: r, col: c });
            }
          }
        }
        if (available.length === 0) return state;
        target = available[Math.floor(Math.random() * available.length)];
      }

      if (playerBoard[target.row][target.col].ship) {
        playerBoard[target.row][target.col].hit = true;
        const directions = [
          { dr: -1, dc: 0 },
          { dr: 1, dc: 0 },
          { dr: 0, dc: -1 },
          { dr: 0, dc: 1 }
        ];
        directions.forEach(({ dr, dc }) => {
          const nr = target.row + dr;
          const nc = target.col + dc;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
            if (!playerBoard[nr][nc].hit && !playerBoard[nr][nc].miss) {
              if (!newAiTargets.some(t => t.row === nr && t.col === nc)) {
                newAiTargets.push({ row: nr, col: nc });
              }
            }
          }
        });
      } else {
        playerBoard[target.row][target.col].miss = true;
      }

      const allPlayerShipsSunk = state.playerShips.every(ship =>
          ship.positions.every(pos => playerBoard[pos.row][pos.col].hit)
      );

      if (allPlayerShipsSunk) {
        return {
          ...state,
          playerBoard,
          gameOver: true,
          winner: 'AI',
          turn: ''
        };
      }

      return {
        ...state,
        playerBoard,
        turn: 'player',
        aiTargets: newAiTargets
      };
    }

    case 'UPDATE_TIMER': {
      return {
        ...state,
        elapsed: Date.now() - state.startTime
      };
    }

    case 'RESET_GAME': {
      localStorage.removeItem('battleship-state');
      return initialState;
    }

    case 'LOAD_STATE': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const persistedState = loadState();
  const [state, dispatch] = useReducer(
      gameReducer,
      persistedState || initialState
  );

  useEffect(() => {
    localStorage.setItem('battleship-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.gameOver) return;
    const interval = setInterval(() => {
      dispatch({type: 'UPDATE_TIMER'});
    }, 1000);
    return () => clearInterval(interval);
  }, [state.gameOver]);

  useEffect(() => {
    if (state.turn === 'enemy' && !state.gameOver) {
      const delay = setTimeout(() => {
        dispatch({type: 'ENEMY_ATTACK'});
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [state.turn, state.gameOver]);

  return (
      <GameContext.Provider value={{state, dispatch}}>
        {children}
      </GameContext.Provider>);
};

export { GameContext};
