// Universal Navigation Logic
function nextStage(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

// STAGE 1: Distance Closer (Updated)
const startDistance = 200;
let currentDistance = 200;
const kmPerClick = 10; // Requires 20 clicks to finish

function reduceDistance() {
    if (currentDistance <= 0) return; 
    
    currentDistance -= kmPerClick;
    document.getElementById('dist-text').innerText = currentDistance + ' km';
    
    // Calculate progress
    let progressPercent = ((startDistance - currentDistance) / startDistance) * 90;
    
    // Moves the car
    document.getElementById('car-sprite').style.left = progressPercent + '%'; 
    
    if (currentDistance <= 0) {
        setTimeout(() => {
            nextStage('stage1', 'stage2');
            loadQuestion(); // <--- Added right here
        }, 800);
    }
}

// STAGE 1.5: Floating Car Messages
const sweetMessages = [
    "I love you", 
    "I'm proud of you", 
    "Miss you", 
    "Almost there!", 
    "You got this!"
];

function popMessage(event) {
    let msg = document.createElement('div');
    
    // Pick a random message from the array
    msg.innerText = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    msg.className = 'floating-msg';
    
    // Place the text exactly where she clicked/tapped
    msg.style.left = (event.clientX - 20) + 'px';
    msg.style.top = (event.clientY - 20) + 'px';
    
    document.body.appendChild(msg);
    
    // Clean up the text element after the 1.5s animation finishes
    setTimeout(() => msg.remove(), 1500);
}

// STAGE 2: Personal Quiz
const quizData = [
    {
        question: "[PLACEHOLDER: Where did we first meet?]",
        options: ["[Wrong Option]", "[Right Option]", "[Wrong Option]"],
        correctIndex: 1, // 0 is first, 1 is second, 2 is third
        hint: "Think back to that one afternoon..."
    },
    {
        question: "[PLACEHOLDER: What is my favorite thing about you?]",
        options: ["[Right Option]", "[Wrong Option]", "[Wrong Option]"],
        correctIndex: 0,
        hint: "It has to do with how smart you are."
    }
];

let currentQ = 0;

function loadQuestion() {
    const qData = quizData[currentQ];
    document.getElementById('quiz-question').innerText = qData.question;
    document.getElementById('quiz-feedback').classList.add('hidden');
    
    const btnContainer = document.getElementById('quiz-buttons');
    btnContainer.innerHTML = ''; 
    
    qData.options.forEach((opt, index) => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'neon-button';
        btn.style.display = 'block';
        btn.style.width = '100%';
        
        btn.onclick = () => {
            if (index === qData.correctIndex) {
                currentQ++;
                if (currentQ < quizData.length) {
                    loadQuestion(); // Load next question
                } else {
                    nextStage('stage2', 'stage3'); // Quiz finished
                }
            } else {
                document.getElementById('quiz-feedback').innerText = "Try again! (Hint: " + qData.hint + ")";
                document.getElementById('quiz-feedback').classList.remove('hidden');
            }
        };
        btnContainer.appendChild(btn);
    });
}
// Call this when entering Stage 2 to load the first question
// Update your reduceDistance() function in Stage 1 to call loadQuestion() right after nextStage('stage1', 'stage2')

// STAGE 3: Bass Track
function playAudio() {
    const audio = document.getElementById('bass-audio');
    const playBtn = document.getElementById('custom-play-btn');
    const status = document.getElementById('audio-status');
    
    audio.play();
    playBtn.classList.add('hidden');
    document.getElementById('replay-btn').classList.add('hidden');
    status.classList.remove('hidden');
    
    audio.onended = function() {
        status.classList.add('hidden');
        document.getElementById('replay-btn').classList.remove('hidden');
        document.getElementById('audio-next-btn').classList.remove('hidden');
    };
}

function replayAudio() {
    const audio = document.getElementById('bass-audio');
    audio.currentTime = 0; // Reset to start
    playAudio();
}

// STAGE 4: Heart Catcher
let caughtHearts = 0;
let spawnInterval;
const heartColors = ['💛', '💙']; 

function startCatchGame() {
    document.getElementById('start-catch-btn').classList.add('hidden');
    
    spawnInterval = setInterval(() => {
        let heart = document.createElement('div');
        // Randomly pick yellow or blue
        heart.innerText = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.className = 'falling-heart';
        heart.style.left = (Math.random() * 80 + 10) + 'vw';
        
        heart.onclick = () => {
            heart.remove();
            caughtHearts++;
            document.getElementById('catch-score').innerText = caughtHearts + ' / 15 Caught';
            
            if (caughtHearts >= 15) {
                clearInterval(spawnInterval);
                document.querySelectorAll('.falling-heart').forEach(e => e.remove());
                setTimeout(() => nextStage('stage4', 'stage5'), 500);
            }
        };
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 600); // Spawns slightly faster now (every 600ms instead of 800ms)
}
