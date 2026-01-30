function onSquareClick(square) {
  clearHighlights();

  // clique em destino
  if (selectedSquare) {
    const move = chess.move({
      from: selectedSquare,
      to: square,
      promotion: "q"
    });

    selectedSquare = null;

    if (move) {
      drawBoard();
    }

    return;
  }

  const piece = chess.get(square);
  if (!piece) return;

  selectedSquare = square;
  document
    .querySelector(`[data-square="${square}"]`)
    .classList.add("selected");

  const moves = chess.moves({
    square,
    verbose: true
  });

  moves.forEach(m => {
    const el = document.querySelector(
      `[data-square="${m.to}"]`
    );
    if (el) el.classList.add("valid");
  });
}

function clearHighlights() {
  document.querySelectorAll(".selected")
    .forEach(e => e.classList.remove("selected"));
  document.querySelectorAll(".valid")
    .forEach(e => e.classList.remove("valid"));
}
