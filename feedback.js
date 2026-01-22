const pieceValue = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0
};

function evaluateMove(prevBoard, newBoard, move) {
  let score = 0;
  let messages = [];

  // captura
  if (move.captured) {
    const gain =
      pieceValue[move.captured.toLowerCase()] -
      pieceValue[move.piece.toLowerCase()];

    if (gain > 0) {
      score += 2;
      messages.push("Boa captura");
    } else if (gain < 0) {
      score -= 2;
      messages.push("Troca desfavorável");
    }
  }

  // desenvolvimento
  if (["n", "b"].includes(move.piece.toLowerCase())) {
    if (move.from[0] === 7 || move.from[0] === 0) {
      score += 1;
      messages.push("Desenvolvimento de peça");
    }
  }

  // mover a mesma peça cedo
  if (move.timesMoved > 1 && move.moveNumber < 10) {
    score -= 1;
    messages.push("Peça movida muitas vezes na abertura");
  }

  return {
    score,
    label:
      score >= 2 ? "Bom lance" :
      score <= -2 ? "Erro" :
      "Imprecisão",
    messages
  };
}
