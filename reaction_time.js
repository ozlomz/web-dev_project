const circle = document.getElementById('circle');
const startBtn = document.querySelector('.start-btn');
const currentTime = document.getElementById('current-time');
const bestTime = document.getElementById('best-time');

let isReady = false;
let startTime;
let timeoutId;

// Charger le record depuis le localStorage
let bestTimeValue = localStorage.getItem('bestTime');
if (bestTimeValue) {
    bestTime.textContent = `Record : ${bestTimeValue} ms`;
} else {
    bestTime.textContent = `Record : -- ms`;
}

// Lancer le test
startBtn.addEventListener('click', () => {
    // Réinitialisation
    circle.style.backgroundColor = 'red';
    circle.textContent = 'Patientez...';
    currentTime.textContent = '';
    isReady = false;
    
    // Délai aléatoire entre 2s et 5s
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timeoutId = setTimeout(() => {
        circle.style.backgroundColor = 'green';
        circle.textContent = 'Cliquez !';
        startTime = Date.now();
        isReady = true;
    }, randomDelay);
});

// Quand on clique sur le cercle
circle.addEventListener('click', () => {
    // Si on clique trop tôt
    if (!isReady) {
        clearTimeout(timeoutId); // Stoppe le timer
        circle.style.backgroundColor = 'orange';
        circle.textContent = 'Trop tôt !';
        currentTime.textContent = 'Trop rapide... Essayez encore.';
        isReady = false;
        return;
    }

    // Si on clique au bon moment
    const reactionTime = Date.now() - startTime;
    currentTime.textContent = `Temps de réaction : ${reactionTime} ms`;

    // Vérifie si c'est un nouveau record
    if (!bestTimeValue || reactionTime < bestTimeValue) {
        bestTimeValue = reactionTime;
        localStorage.setItem('bestTime', bestTimeValue);
        bestTime.textContent = `Record : ${bestTimeValue} ms`;
    }

    circle.textContent = 'Cliquez ici';
    circle.style.backgroundColor = 'red';
    isReady = false;
});
