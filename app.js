/* ================== ELEMENTOS ================== */

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

/* ================== ESTADO ================== */
let legalMoves = [];
let selected = null;
let turn = "white";

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

const initialBoard = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

let board = structuredClone(initialBoard);

/* ================== RENDER ================== */

function render() {
  boardEl.innerHTML = "";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement("div");
      sq.className = "square " + ((r + c) % 2 === 0 ? "light" : "dark");

      const piece = board[r][c];
      if (piece !== ".") {
        sq.textContent = pieces[piece];
        sq.classList.add(
          piece === piece.toUpperCase() ? "white-piece" : "black-piece"
        );
      }

      sq.onclick = () => onSquareClick(r, c);
      boardEl.appendChild(sq);
if (
  legalMoves.some(m => m[0] === r && m[1] === c)
) {
  sq.classList.add(
    board[r][c] === "." ? "legal-move" : "capture"
  );
}

     

    }
  }

  statusEl.innerText = `Vez das ${turn === "white" ? "brancas" : "pretas"}`;
}

/* ================== INTERAÇÃO ================== */

function onSquareClick(r, c) {
  const piece = board[r][c];

  // destino
  if (selected) {
    const [sr, sc] = selected;

    if (
      legalMoves.some(m => m[0] === r && m[1] === c)
    ) {
      movePiece(sr, sc, r, c);
      turn = turn === "white" ? "black" : "white";
    }

    selected = null;
    legalMoves = [];
    render();
    return;
  }

  // selecionar peça
  if (piece !== "." && isPlayersPiece(piece)) {
    selected = [r, c];
    legalMoves = getLegalMoves(r, c);
    render();
  }
}


/* ================== MOVIMENTO ================== */

function movePiece(sr, sc, r, c) {
  board[r] =
    board[r].substring(0, c) +
    board[sr][sc] +
    board[r].substring(c + 1);

  board[sr] =
    board[sr].substring(0, sc) +
    "." +
    board[sr].substring(sc + 1);
}

/* ================== TURNO ================== */

function isPlayersPiece(piece) {
  return turn === "white"
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase();
}

function getLegalMoves(sr, sc) {
  const moves = [];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (isLegalMove(board, sr, sc, r, c)) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
}

/* ================== RESET ================== */

function resetGame() {
  board = structuredClone(initialBoard);
  turn = "white";
  selected = null;
  render();
}

/* ================== START ================== */

render();
