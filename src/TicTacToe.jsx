import { useState, useEffect, useRef } from 'react';

export const TicTacToe = () => {
  const initSquares = [
    { id: 1, letter: null },
    { id: 2, letter: null },
    { id: 3, letter: null },
    { id: 4, letter: null },
    { id: 5, letter: null },
    { id: 6, letter: null },
    { id: 7, letter: null },
    { id: 8, letter: null },
    { id: 9, letter: null },
  ];
  const PLAYER_ONE = 'X';
  const PLAYER_TWO = 'O';
  const WINNING_RESULTS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ];
  const [squares, setSquares] = useState(initSquares);
  const [isGameOver, setIsGameOver] = useState('');
  const isPlayerOne = useRef(true);

  useEffect(() => {
    const player = isPlayerOne.current ? PLAYER_ONE : PLAYER_TWO;
    const playerSquares = squares.filter((sq) => sq.letter === player);
    if (playerSquares.length > 0) {
      const isWinner = WINNING_RESULTS.some((arr) =>
        arr.every((num) => playerSquares.some(({ id }) => id === num))
      );
      if (isWinner) {
        setIsGameOver(`The game is over, ${player} wins`);
      }
      isPlayerOne.current = !isPlayerOne.current;
    }
  }, [squares]);

  const resetBoard = () => {
    setSquares(initSquares);
    setIsGameOver('');
    isPlayerOne.current = true;
  };

  const handleSetSquares = (letter, sqId) => {
    setSquares((prevSquares) => {
      const copyPrevSquares = [...prevSquares];
      const prevSqIndex = copyPrevSquares.findIndex(
        (prevSq) => prevSq.id === sqId
      );
      const prevSq = copyPrevSquares[prevSqIndex];
      const updatedSquares = copyPrevSquares.toSpliced(prevSqIndex, 1, {
        ...prevSq,
        letter,
      });
      return updatedSquares;
    });
  };

  const handleSqSelect = (e) => {
    const sqTarget = e.target.closest('[data-id]');
    const sqId = Number(sqTarget.dataset.id);
    const squareData = squares.find((sq) => sq.id === sqId);
    if (Boolean(squareData.letter)) return;
    const player = isPlayerOne.current ? PLAYER_ONE : PLAYER_TWO;
    handleSetSquares(player, sqId);
  };

  const Squares = ({ squares }) => {
    return squares.map((sq) => {
      const id = sq.id;
      const sqLetter = sq.letter;
      return (
        <div key={id} data-id={id} className="ttt-sq" onClick={handleSqSelect}>
          {sqLetter && <span className="ttt-sq-letter">{sqLetter}</span>}
        </div>
      );
    });
  };

  return (
    <>
      <button onClick={resetBoard}>Reset game</button>
      {isGameOver && <div>{isGameOver}</div>}
      <div className="ttt-board">
        <Squares squares={squares} />
      </div>
    </>
  );
};
