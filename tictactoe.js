// Variables du jeu
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Combinaisons gagnantes
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6]             // diagonales
];

// Éléments DOM
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');

// Gestion des clics sur les cellules
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Gestion du clic sur le bouton de réinitialisation
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Vérifier si la cellule est déjà occupée ou si le jeu est terminé
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Mettre à jour l'état du jeu
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Vérifier si le joueur a gagné
    checkWin();
}

function checkWin() {
    let roundWon = false;
    let winningLine = null;

    // Vérifier toutes les combinaisons gagnantes
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

    // Si quelqu'un a gagné
    if (roundWon) {
        // Mettre en surbrillance la combinaison gagnante
        highlightWinningCells(winningLine);
        
        statusDisplay.textContent = `Joueur ${currentPlayer} a gagné!`;
        gameActive = false;
        return;
    }

    // Vérifier s'il y a match nul
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = 'Match nul!';
        gameActive = false;
        return;
    }

    // Changer de joueur
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Au tour de: ${currentPlayer}`;
}

function highlightWinningCells(winningCombination) {
    // Mettre en évidence les cellules gagnantes
    winningCombination.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `Au tour de: ${currentPlayer}`;
    
    // Vider toutes les cellules et supprimer la mise en évidence
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}