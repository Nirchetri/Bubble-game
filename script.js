var timer = 5;
var score = 0;
var hitrn = 0;

// Load the sound effect
const bubbleHitSound = new Audio('./sound/pop.mp3'); // Replace with the path to your sound file

function increaseScore() {
    score += 10;
    document.querySelector('#scoreval').textContent = score;
}

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

function makeBubble() {
    var clutter = "";
    for (var i = 1; i <= 168; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

function resetGame() {
    // Reset values
    timer = 45; // Reset timer
    score = 0;  // Reset score
    hitrn = 0;  // Reset hit random number

    // Update the UI to default values
    document.querySelector('#timerval').textContent = timer;
    document.querySelector('#scoreval').textContent = score;
    document.querySelector("#hitval").textContent = hitrn;

    // Generate new bubbles and start the game
    makeBubble();
    runTimer();
    getNewHit();
}

function runTimer() {
    var timerclear = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector('#timerval').textContent = timer;
        } else {
            clearInterval(timerclear);

            // Display the score and the "Start Again" button
            document.querySelector('#pbtm').innerHTML = `
                <h3>Your Score is ${score}</h3>
                <button id="startButton">Start Again</button>
            `;

            // Add event listener to the "Start Again" button
            document.querySelector('#startButton').addEventListener('click', resetGame);
        }
    }, 1000);
}

// Add event listener for bubble clicks
document.querySelector('#pbtm').addEventListener('click', function (dets) {
    var clicknum = (Number(dets.target.textContent));
    if (clicknum === hitrn) {
        // Play the sound effect
        bubbleHitSound.currentTime = 0; // Reset sound to the start
        bubbleHitSound.play();

        // Game logic
        increaseScore();
        makeBubble();
        getNewHit();
    }
});

// Initialize game
makeBubble();
runTimer();
getNewHit();
