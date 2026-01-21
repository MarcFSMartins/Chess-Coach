const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

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
    }
  }

  statusEl.innerText = `Vez das ${turn === "white" ? "brancas" : "pretas"}`;
}

/* ================== CLIQUE ================== */

function onSquareClick(r, c) {
  const piece = board[r][c];

  if (selected) {
    const [sr, sc] = selected;

    if (isLegalMove(sr, sc, r, c)) {
      movePiece(sr, sc, r, c);
      turn = turn === "white" ? "black" : "white";
    }

    selected = null;
    render();
    return;
  }

  if (piece !== "." && isPlayersPiece(piece)) {
    selected = [r, c];
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

/* ================== REGRAS ================== */

function isPlayersPiece(piece) {
  return turn === "white"
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase();
}

function isLegalMove(sr, sc, r, c) {
  const piece = board[sr][sc];
  const target = board[r][c];

  if (target !== "." && isSameColor(piece, target)) return false;

  const dr = r - sr;
  const dc = c - sc;

  switch (piece.toLowerCase()) {
    case "p": return pawnMove(piece, sr, sc, r, c, dr, dc);
    case "r": return rookMove(sr, sc, r, c);
    case "n": return knightMove(dr, dc);
    case "b": return bishopMove(sr, sc, r, c);
    case "q": return queenMove(sr, sc, r, c);
    case "k": return kingMove(dr, dc);
  }
  return false;

}

/* ================== START ================== */

render();
