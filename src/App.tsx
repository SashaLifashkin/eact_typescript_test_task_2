import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import { Game } from './components/Game/Game';

export const App: React.FC = () => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [goToPlay, setGoToPlay] = useState(false);
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkSecondName, setCheckSecondName] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!playerOne.trim()) {
      setCheckFirstName(true);
    } else {
      setCheckFirstName(false);
    }

    if (!playerTwo.trim()) {
      setCheckSecondName(true);
    } else {
      setCheckSecondName(false);
    }

    if (playerOne.trim() && playerTwo.trim()) {
      setGoToPlay(!goToPlay);
    }
  };

  return (
    <div className="App">
      {goToPlay
        ? (
          <Game
            playerOne={playerOne}
            playerTwo={playerTwo}
          />
        )
        : (
          <form
            className="App__form"
            onSubmit={handleSubmit}
          >
            <p className="App__title-input">Enter first player name (X): </p>
            <input
              type="text"
              className={classNames('App__input', { 'App__input-error': checkFirstName })}
              placeholder="Player one (x)"
              value={playerOne}
              onChange={(event) => setPlayerOne(event.target.value)}
            />
            <div className="App__check-input">
              {checkFirstName && (
                <p className="App__check-input-text">*please enter a name</p>
              )}
            </div>
            <p className="App__title-input">Enter second player name (O): </p>
            <input
              type="text"
              className={classNames('App__input', { 'App__input-error': checkSecondName })}
              placeholder="Player two (0)"
              value={playerTwo}
              onChange={(event) => setPlayerTwo(event.target.value)}
            />
            <div className="App__check-input">
              {checkSecondName && (
                <p className="App__check-input-text">*please enter a name</p>
              )}
            </div>
            <button
              type="submit"
              className="App__button-form"
            >
              Enter players name
            </button>
          </form>
        )}
    </div>
  );
};
