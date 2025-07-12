import React, { useState } from "react";
import Square from "./Square";

function Board() {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [count, setCount] = useState(0);

  const checkWinner = function () {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] != null && state[a] == state[b] && state[a] == state[c]) {
        //wrong method as it causes rendering loop
        //instead use within useEffect hook
        // setWinner(state[a]);
        return state[a];
      }
    }
    return false;
  };

  const handleClick = function (index) {
    if (state[index] != null) alert("Square already filled!");
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "0";
    setState(copyState);
    setIsXTurn(!isXTurn);
    setCount(count + 1);
  };

  const winner = checkWinner();
  const handleReset = function () {
    setState(Array(9).fill(null));
    setCount(0);
  };

  return (
    <div className="board-container">
      {winner ? (
        <>
          <h1>{winner} won the game</h1>
          <button className="reset" onClick={handleReset}>
            Play Again
          </button>
        </>
      ) : count == 9 ? (
        <>
          <h1>Game Draw</h1>
          <button className="reset" onClick={handleReset}>
            Play Again
          </button>
        </>
      ) : (
        <>
          <h2>Player {isXTurn ? "X" : "0"} please move</h2>
          <div className="board-row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
}

export default Board;
