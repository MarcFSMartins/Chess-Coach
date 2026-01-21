const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let selected = null;

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

      sq.onclick = () => onSquareClick(r, c, sq);
      boardEl.appendChild(sq);
    }
  }
}

function onSquareClick(r, c, el) {
  if (selected) {
    const [sr, sc] = selected;

    board[r] =
      board[r].substring(0, c) +
      board[sr][sc] +
      board[r].substring(c + 1);

    board[sr] =
      board[sr].substring(0, sc) +
      "." +
      board[sr].substring(sc + 1);

    selected = null;
    statusEl.innerText = "Lance feito";
    render();
  } else if (board[r][c] !== ".") {
    selected = [r, c];
    statusEl.innerText = "Escolha o destino";
    el.classList.add("selected");
  }
}

function resetGame() {
  board = structuredClone(initialBoard);
  selected = null;
  statusEl.innerText = "Partida reiniciada";
  render();
}

render();
