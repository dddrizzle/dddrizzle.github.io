// Universal Navigation Logic
function nextStage(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

// STAGE 1: Distance Closer
let distance = 500;
function reduceDistance() {
    distance -= 100;
    document.getElementById('dist-text').innerText = distance + ' km';
    if (distance <= 0) {
        setTimeout(() => nextStage('stage1', 'stage2'), 500);
    }
}

// STAGE 2: Lab Quiz
function correctAnswer() {
    document.getElementById('quiz-feedback').classList.add('hidden');
    nextStage('stage2', 'stage3');
}
function wrongAnswer() {
    const feedback = document.getElementById('quiz-feedback');
    feedback.innerText = "Try again! (Hint: It creates ATP)";
    feedback.classList.remove('hidden');
}

// STAGE 3: Bass Track
function unlockNextStage() {
    // Listens for the audio 'play' event and reveals the Next button
    document.getElementById('audio-next-btn').classList.remove('hidden');
}

// STAGE 4: Heart Catcher
let caughtHearts = 0;
let spawnInterval;

function startCatchGame() {
    document.getElementById('start-catch-btn').classList.add('hidden');
    
    spawnInterval = setInterval(() => {
        let heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.className = 'falling-heart';
        heart.style.left = (Math.random() * 80 + 10) + 'vw';
        
        heart.onclick = () => {
            heart.remove();
            caughtHearts++;
            document.getElementById('catch-score').innerText = caughtHearts + ' / 5 Caught';
            
            if (caughtHearts >= 5) {
                clearInterval(spawnInterval);
                document.querySelectorAll('.falling-heart').forEach(e => e.remove());
                setTimeout(() => nextStage('stage4', 'stage5'), 500);
            }
        };
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 800);
}
