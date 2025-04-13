// Variables du jeu
let playerScore = 0;
let computerScore = 0;
const choices = ['pierre', 'feuille', 'ciseaux'];

// Éléments DOM
const statusDisplay = document.getElementById('status');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const choiceButtons = document.querySelectorAll('.choice');
const resetButton = document.getElementById('resetBtn');

// Symboles pour les choix
const symbols = {
    'pierre': '✊',
    'feuille': '✋',
    'ciseaux': '✌️'
};

// Gestion des clics sur les boutons de choix
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        playRound(this.id);
    });
});

// Gestion du clic sur le bouton de réinitialisation
resetButton.addEventListener('click', resetGame);

function playRound(playerChoice) {
    // Choix aléatoire pour l'ordinateur
    const computerChoice = getComputerChoice();
    
    // Afficher les choix
    displayChoices(playerChoice, computerChoice);
    
    // Déterminer le gagnant
    const result = getWinner(playerChoice, computerChoice);
    
    // Mettre à jour le score et l'affichage
    updateScore(result);
    
    // Afficher le résultat
    displayResult(result, playerChoice, computerChoice);
}

function getComputerChoice() {
    // Générer un choix aléatoire pour l'ordinateur
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function displayChoices(playerChoice, computerChoice) {
    // Afficher les symboles correspondant aux choix
    playerChoiceDisplay.textContent = symbols[playerChoice];
    computerChoiceDisplay.textContent = symbols[computerChoice];
    
    // Retirer les classes winner précédentes
    playerChoiceDisplay.classList.remove('winner');
    computerChoiceDisplay.classList.remove('winner');
}

function getWinner(playerChoice, computerChoice) {
    // Si égalité
    if (playerChoice === computerChoice) {
        return 'égalité';
    }
    
    // Règles du jeu
    if (
        (playerChoice === 'pierre' && computerChoice === 'ciseaux') ||
        (playerChoice === 'feuille' && computerChoice === 'pierre') ||
        (playerChoice === 'ciseaux' && computerChoice === 'feuille')
    ) {
        return 'joueur';
    } else {
        return 'ordinateur';
    }
}

function updateScore(result) {
    // Mettre à jour le score selon le résultat
    if (result === 'joueur') {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        playerChoiceDisplay.classList.add('winner');
    } else if (result === 'ordinateur') {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        computerChoiceDisplay.classList.add('winner');
    }
}

function displayResult(result, playerChoice, computerChoice) {
    // Afficher le résultat du tour
    if (result === 'égalité') {
        statusDisplay.textContent = `Égalité !`;
    } else if (result === 'joueur') {
        statusDisplay.textContent = `Vous gagnez ! ${capitalizeFirstLetter(playerChoice)} bat ${computerChoice}.`;
    } else {
        statusDisplay.textContent = `L'ordinateur gagne ! ${capitalizeFirstLetter(computerChoice)} bat ${playerChoice}.`;
    }
}

function capitalizeFirstLetter(string) {
    // Mettre la première lettre en majuscule
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetGame() {
    // Réinitialiser les scores
    playerScore = 0;
    computerScore = 0;
    
    // Mettre à jour l'affichage
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    statusDisplay.textContent = "Faites votre choix !";
    
    // Vider les choix affichés
    playerChoiceDisplay.textContent = "";
    computerChoiceDisplay.textContent = "";
    
    // Retirer les classes winner
    playerChoiceDisplay.classList.remove('winner');
    computerChoiceDisplay.classList.remove('winner');
}