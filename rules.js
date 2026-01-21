/* ================== UTIL ================== */

function isSameColor(a, b) {
  return (a === a.toUpperCase()) === (b === b.toUpperCase());
}

/* ================== CAMINHO LIVRE ================== */

function clearPath(board, sr, sc, r, c) {
  const stepR = Math.sign(r - sr);
  const stepC = Math.sign(c - sc);

  let cr = sr + stepR;
  let cc = sc + stepC;

  while (cr !== r || cc !== c) {
    if (board[cr][cc] !== ".") return false;
    cr += stepR;
    cc += stepC;
  }
  return true;
}

/* ================== MOVIMENTO DAS PEÇAS ================== */

function pawnMove(board, piece, sr, sc, r, c) {
  const dr = r - sr;
  const dc = c - sc;
  const dir = piece === "P" ? -1 : 1;
  const startRow = piece === "P" ? 6 : 1;

  // andar para frente
  if (dc === 0 && board[r][c] === ".") {
    if (dr === dir) return true;
    if (
      sr === startRow &&
      dr === 2 * dir &&
      board[sr + dir][sc] === "."
    ) return true;
  }

  // captura
  if (Math.abs(dc) === 1 && dr === dir && board[r][c] !== ".") {
    return true;
  }

  return false;
}

function rookMove(board, sr, sc, r, c) {
  if (sr !== r && sc !== c) return false;
  return clearPath(board, sr, sc, r, c);
}

function bishopMove(board, sr, sc, r, c) {
  if (Math.abs(r - sr) !== Math.abs(c - sc)) return false;
  return clearPath(board, sr, sc, r, c);
}

function queenMove(board, sr, sc, r, c) {
  return (
    rookMove(board, sr, sc, r, c) ||
    bishopMove(board, sr, sc, r, c)
  );
}

function knightMove(sr, sc, r, c) {
  const dr = Math.abs(r - sr);
  const dc = Math.abs(c - sc);
  return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
}

function kingMove(sr, sc, r, c) {
  return Math.abs(r - sr) <= 1 && Math.abs(c - sc) <= 1;
}

/* ================== API PRINCIPAL ================== */

function isLegalMove(board, sr, sc, r, c) {
  const piece = board[sr][sc];
  const target = board[r][c];

  if (piece === ".") return false;
  if (target !== "." && isSameColor(piece, target)) return false;

  switch (piece.toLowerCase()) {
    case "p": return pawnMove(board, piece, sr, sc, r, c);
    case "r": return rookMove(board, sr, sc, r, c);
    case "n": return knightMove(sr, sc, r, c);
    case "b": return bishopMove(board, sr, sc, r, c);
    case "q": return queenMove(board, sr, sc, r, c);
    case "k": return kingMove(sr, sc, r, c);
  }
  return false;
}
