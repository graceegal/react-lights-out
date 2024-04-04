import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    function randomBool() {
      const bools = [true, false];
      const idx = Math.floor(Math.random() * 2);
      return bools[idx];
    }

    for (let r = 0; r < nrows; r++) {
      initialBoard.push([]);
      for (let c = 0; c < ncols; c++) {
        initialBoard[r].push(randomBool());
      }
    }
    console.log(initialBoard);
    return initialBoard;
  }

  function hasWon() {
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord, filteredCoords) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const coordinates = [[y, x], [y + 1, x], [y, x + 1], [y - 1, x], [y, x - 1]];

      const flipCell = (arr, boardCopy) => {
        // if this coord is actually on board, flip it
        const x = arr[1];
        const y = arr[0];
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      coordinates.forEach(c => flipCell(c, boardCopy));

      return boardCopy;
    });
  }
  console.log("hasWon func", hasWon());

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={evt => flipCellsAround(coord)}
        />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );

  // return (
  //   <div>
  //     for (let row of board){
  //       <div className="row">
  //         {row.map(c => <Cell flipCellsAroundMe={flipCellsAround} isLit={c} />)}
  //       </div>
  //     }
  //   </div>
    // <div className="cell" flipCellsAroundMe={flipCellsAround} coord={[x, y]}></div>
  // );
}

export default Board;
