
const startButton = document.querySelector('#button');
startButton.addEventListener('click', game);



// Game Function

function game() {





//Timer

    let secondsRemaining = 60;
    const countdownEl = document.getElementById('countdown');

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        countdownEl.innerHTML = secondsRemaining;
        secondsRemaining--;
        if (secondsRemaining === 0) {
            time = 0;
        }
    }
}