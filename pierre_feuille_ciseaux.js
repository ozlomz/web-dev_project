// Game variables
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

const symbols = {
    'pierre': '✊',
    'feuille': '✋',
    'ciseaux': '✌️'
};

// Clics handling
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        playRound(this.id);
    });
});

// reset clic handling
resetButton.addEventListener('click', resetGame);

function playRound(playerChoice) {
    //random computer choice
    const computerChoice = getComputerChoice();
    
    // display the choice
    displayChoices(playerChoice, computerChoice);
    
    // determin the winner
    const result = getWinner(playerChoice, computerChoice);
    
    // update the score
    updateScore(result);
    
    // display the result
    displayResult(result, playerChoice, computerChoice);
}

function getComputerChoice() {
    // random computer choice
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function displayChoices(playerChoice, computerChoice) {
    // show symbols
    playerChoiceDisplay.textContent = symbols[playerChoice];
    computerChoiceDisplay.textContent = symbols[computerChoice];
    
    // remove old winner
    playerChoiceDisplay.classList.remove('winner');
    computerChoiceDisplay.classList.remove('winner');
}

function getWinner(playerChoice, computerChoice) {
    // if draw 
    if (playerChoice === computerChoice) {
        return 'égalité';
    }
    
    // Rules
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
    // update score
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
    // show the winner
    if (result === 'égalité') {
        statusDisplay.textContent = `Égalité !`;
    } else if (result === 'joueur') {
        statusDisplay.textContent = `Vous gagnez ! ${capitalizeFirstLetter(playerChoice)} bat ${computerChoice}.`;
    } else {
        statusDisplay.textContent = `L'ordinateur gagne ! ${capitalizeFirstLetter(computerChoice)} bat ${playerChoice}.`;
    }
}

function capitalizeFirstLetter(string) {
    // just for an better readability to upper case the first letter 
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetGame() {
    // reset scores
    playerScore = 0;
    computerScore = 0;
    
    // update display
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    statusDisplay.textContent = "Faites votre choix !";
    
    // Empty choices
    playerChoiceDisplay.textContent = "";
    computerChoiceDisplay.textContent = "";
    
    // Remove winner classes
    playerChoiceDisplay.classList.remove('winner');
    computerChoiceDisplay.classList.remove('winner');
}
