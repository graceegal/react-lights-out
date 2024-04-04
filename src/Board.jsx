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

// nrows = board.length
// ncols = board[0].length

function Board({ nrows = 5, ncols = 5 }) {
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
    for (let row in board) {
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
      const filteredCoords = coordinates.filter(c => board[c[0]][c[1]] != undefined);
      const boardCopy = structuredClone(oldBoard);


      filteredCoords.forEach(e => flipCell(e, boardCopy));
      const flipCell = (arr, boardCopy) => {
        // if this coord is actually on board, flip it
        const x = arr[1];
        const y = arr[0];
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      filteredCoords.forEach(e => flipCell(e, boardCopy));


      return boardCopy;
      // TODO: Make a (deep) copy of the oldBoard


      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  return (
    <div>
      for (let row of board){
        <div className="row">
          {row.map(c => <Cell flipCellsAroundMe={flipCellsAround} isLit={c} />)}
        </div>
      }
    </div>
    // <div className="cell" flipCellsAroundMe={flipCellsAround} coord={[x, y]}></div>
  );
  // make table board

  // TODO
}

export default Board;
