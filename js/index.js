let boardSize = 3;
let board = [];
let currentPlayer = "X";

function drawBoard() {
  let boardDiv = document.getElementById("tic-tac-toe-board");
  boardDiv.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      boardDiv.innerHTML += `<div onclick="makeMove(${i}, ${j})">${board[i][j]}</div>`;
    }
    boardDiv.innerHTML += "<br>";
  }
}

function resetBoard() {
  board = Array(boardSize)
    .fill()
    .map(() => Array(boardSize).fill(""));
  currentPlayer = "X";
  drawBoard();
}

function makeMove(i, j) {
  if (board[i][j] === "") {
    board[i][j] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    drawBoard();
    let winner = checkWin();
    if (winner) {
      alert(winner + " wins!");
      resetBoard();
    } else if (checkDraw()) {
      alert("It is a draw!");
      resetBoard();
    }
  }
}

function checkWin() {
  // Check rows
  for (let i = 0; i < boardSize; i++) {
    if (board[i][0] && board[i].every((val, j) => val === board[i][0])) {
      return board[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < boardSize; j++) {
    if (board[0][j] && board.every((row) => row[j] === board[0][j])) {
      return board[0][j];
    }
  }

  // Check diagonals
  if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) {
    return board[0][0];
  }
  if (
    board[0][boardSize - 1] &&
    board.every((row, i) => row[boardSize - i - 1] === board[0][boardSize - 1])
  ) {
    return board[0][boardSize - 1];
  }

  return null;
}

function checkDraw() {
  // Check if there is a winner
  if (checkWin()) {
    return false;
  }
  // Check if there are empty cells
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }
  // If no winner and no empty cells, it is a draw
  return true;
}

function endApp() {
  document.getElementById("tic-tac-toe-board").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("end-btn").style.display = "none";
  document.getElementById("tic-tac-toe-control-container").style.display =
    "flex";
}

function startApp() {
  document.getElementById("tic-tac-toe-board").style.display = "block";
  // Show reset button
  document.getElementById("reset-btn").style.display = "block";
  // Show start button
  document.getElementById("tic-tac-toe-control-container").style.display =
    "none";
  // Show end button
  document.getElementById("end-btn").style.display = "block";
  // Get the board size from the input element
  let input = document.getElementById("board-size");
  let size = parseInt(input.value);
  // Validate the input
  if (isNaN(size) || size < 3 || size > 10) {
    alert("Please enter a valid number between 3 and 10");
  } else {
    // Set the board size and reset the board
    boardSize = size;
    resetBoard();
  }
}
