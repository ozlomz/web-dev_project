// Variables du jeu
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// winning combinations 
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// DOM elements
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');

// click handling on cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// click handling on reset button
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // check if the cell is already occupied or if the game is over
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // update game state
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // check if the player has won
    checkWin();
}

function checkWin() {
    let roundWon = false;
    let winningLine = null;

    // check all winning combinations
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    // if someone has won
    if (roundWon) {
        // highlight the winning combination
        highlightWinningCells(winningLine);
        
        statusDisplay.textContent = `Joueur ${currentPlayer} a gagné!`;
        gameActive = false;
        return;
    }

    // check for a draw
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = 'Match nul!';
        gameActive = false;
        return;
    }

    // change player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Au tour de: ${currentPlayer}`;
}

function highlightWinningCells(winningCombination) {
    // highlight the winning combination
    winningCombination.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `Au tour de: ${currentPlayer}`;
    
    // empty all cells and remove highlight
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}
