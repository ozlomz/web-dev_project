const circle = document.getElementById('circle');
const startBtn = document.querySelector('.start-btn');
const currentTime = document.getElementById('current-time');
const bestTime = document.getElementById('best-time');

let isReady = false;
let startTime;
let timeoutId;

// load the record 
let bestTimeValue = localStorage.getItem('bestTime');
if (bestTimeValue) {
    bestTime.textContent = `Record : ${bestTimeValue} ms`;
} else {
    bestTime.textContent = `Record : -- ms`;
}

// the test
startBtn.addEventListener('click', () => {
    // reset
    circle.style.backgroundColor = 'red';
    circle.textContent = 'Patientez...';
    currentTime.textContent = '';
    isReady = false;
    
    // random delay between 2s and 5s
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timeoutId = setTimeout(() => {
        circle.style.backgroundColor = 'green';
        circle.textContent = 'Cliquez !';
        startTime = Date.now();
        isReady = true;
    }, randomDelay);
});

// when you click on the circle
circle.addEventListener('click', () => {
    // If you click too early
    if (!isReady) {
        clearTimeout(timeoutId); // Stop the timer 
        circle.style.backgroundColor = 'orange';
        circle.textContent = 'Trop tôt !';
        currentTime.textContent = 'Trop rapide... Essayez encore.';
        isReady = false;
        return;
    }

    // If you click at the right moment
    const reactionTime = Date.now() - startTime;
    currentTime.textContent = `Temps de réaction : ${reactionTime} ms`;

    // Check if it's a new record
    if (!bestTimeValue || reactionTime < bestTimeValue) {
        bestTimeValue = reactionTime;
        localStorage.setItem('bestTime', bestTimeValue);
        bestTime.textContent = `Record : ${bestTimeValue} ms`;
    }

    circle.textContent = 'Cliquez ici';
    circle.style.backgroundColor = 'red';
    isReady = false;
});
