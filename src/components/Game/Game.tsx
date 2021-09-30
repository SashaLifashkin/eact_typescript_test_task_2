import React, { useState } from 'react';
import './Game.scss';
import { Board } from '../Board/Board';

const whoIsWinner = (cells: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [x, y, z] = lines[i];

    if (cells[x] && cells[x] === cells[y] && cells[x] === cells[z]) {
      return cells[x];
    }
  }

  return null;
};

type Props = {
  playerOne: string;
  playerTwo: string;
};

export const Game: React.FC<Props> = (props) => {
  const {
    playerOne,
    playerTwo,
  } = props;

  const [cells, setCells] = useState<string[]>(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [isWinner, setIsWinner] = useState(true);
  const [playerOneWin, setPlayerOneWin] = useState(0);
  const [playerTwoWin, setPlayerTwoWin] = useState(0);

  const winner: string | null = whoIsWinner(cells);
  const isDraw = cells.some(item => item === null);
  let status = '';

  const handleClick = (i: number) => {
    const cellsCopy = [...cells];
    const isWinnerNow = whoIsWinner(cellsCopy);

    if (isWinnerNow || cellsCopy[i]) {
      return;
    }

    cellsCopy[i] = xIsNext ? 'X' : 'O';

    setCells(cellsCopy);
    setXisNext(!xIsNext);
  };

  const handleResetClick = () => {
    setCells(Array(9).fill(null));
    setIsWinner(true);
  };

  if (winner === 'X') {
    status = `Winner is ${playerOne}!`;
    if (isWinner) {
      setPlayerOneWin(current => current + 1);
      setIsWinner(false);
    }
  } else if (winner === 'O') {
    status = `Winner is ${playerTwo}!`;
    if (isWinner) {
      setPlayerTwoWin(current => current + 1);
      setIsWinner(false);
    }
  } else if (!isDraw) {
    status = 'Draw!';
  } else {
    status = xIsNext ? `Next move: ${playerOne}` : `Next move: ${playerTwo}`;
  }

  return (
    <div className="Game">
      <Board
        cells={cells}
        clickOnCell={handleClick}
      />
      <div className="Game__info Info">
        <button
          type="button"
          className="Game__button"
          onClick={handleResetClick}
        >
          Reset
        </button>
        <div className="Game__status">
          <p>{status}</p>
        </div>
        <div>
          <p>Score</p>
          <p>{`${playerOne} (X) wins: ${playerOneWin}`}</p>
          <p>{`${playerTwo} (O) wins: ${playerTwoWin}`}</p>
        </div>
      </div>
    </div>
  );
};
