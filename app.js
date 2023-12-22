const selectionButtons = document.querySelectorAll("[data-selection]");
const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
];

const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const playerScoreSpan = document.querySelector("[data-player-score]");

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      selection => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const playerWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);
  console.log(computerSelection);
  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, playerWinner);

  if (playerWinner) incrementScore(playerScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan);
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText= selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}