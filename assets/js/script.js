
const startButton = document.getElementById('button');
const countdownOutput = document.getElementById('countdownOutput');
const questionOutput = document.getElementById('questionOutput');
const answerAOutput = document.getElementById('answerAOutput');
const answerBOutput = document.getElementById('answerBOutput');
const answerCOutput = document.getElementById('answerCOutput');
const answerDOutput = document.getElementById('answerDOutput');
const correctIncorrect = document.getElementById('correctIncorrect');
const scoreScreen = document.getElementById('scoreScreen');
const currentScore = document.getElementById('currentScore');
const submitButton = document.getElementById('submitButton');
const getInitials = document.getElementById('enterInitials');
const outputHere = document.getElementById('outputHere');
const restartButton = document.getElementById('restartButton');

// For CSS needed to be unhidden later

const scoreBox = document.getElementById('score-box');
const answersContainer = document.getElementById('answers-container');

// Starts the quiz and timer on Start Quiz click

startButton.addEventListener('click', game);
startButton.addEventListener('click', timer);

// Resets the game on Reset click

restartButton.addEventListener('click', restart);

// Initilizes question number, score, and time remaining

let questionIndex = 0;
let score = 0;
let secondsRemaining = 60;
    
// Questions

let quizQuestions = [
    {
       question: 'What number comes after 3?',
       answers: ['One','Two','Eight','Four'],
       rightAnswer: 'Four'    
    },
    {
       question: 'Who was the first president of the United States?',
       answers: ['George Washington','John Mulaney','Jim Dhima','Corey Parker'],
       rightAnswer: 'George Washington'     
    },
    {
       question: 'How many sides does a hexagon have?',
       answers: ['3','4','6','8'],
       rightAnswer: '6'     
    },
    {
       question: 'What is the meaning of life?',
       answers: ['42','To find love','Eating good food', 'JavaScript'],
       rightAnswer: 'JavaScript'       
   },
   {
       question: 'How many quarts are in a gallon',
       answers: ['4','8','12', '3.14'],
       rightAnswer: '4'    
   },
   {
        question: 'The _______ jumped over the moon',
        answers: ['Dog','Person','Cow', 'Turtle'],
        rightAnswer: 'Cow'    
   },
    ]

 //Logic

 function chosenAnswer(val) {
    let chosenAnswer = val.textContent;

    if (quizQuestions[questionIndex].rightAnswer === chosenAnswer) {

        // Tells you correct answer and displays message for 1 second

        correctIncorrect.innerHTML = 'Correct!'
            setTimeout(function(){
                document.getElementById('correctIncorrect').innerHTML = '';
            }, 1000);

        // Adds 100 points to score, updates score, and goes to next question
        
        score = score + 100;
        currentScore.innerHTML = score;
        questionIndex++

            // Takes you to final page if time runs out
            
            if (quizQuestions.length - 1 < questionIndex) {
                secondsRemaining = 0;
                finalScreen();
            } else {
            game();
            }

    } else { 

        // Tells you incorrect answer and displays message for 1 second

        correctIncorrect.innerHTML = 'Incorrect!'
            setTimeout(function(){
                document.getElementById('correctIncorrect').innerHTML = '';
            }, 1000);

        // Updates score, deducts 10 seconds

        questionIndex++
        secondsRemaining = secondsRemaining - 10;

            // Takes you to final page if time runs out

            if (quizQuestions.length - 1 < questionIndex) {
                secondsRemaining = 0;
                finalScreen();
            } else {
                game();
            }
    }
 }

// Initialize Game

function game() {

    // Hides the Start Button when the quiz starts

    document.getElementById('start-button').style.display = 'none';

    //Prints out the score, question, and answer choices for each question

    currentScore.innerHTML = score;
    questionOutput.innerHTML = quizQuestions[questionIndex].question;
    answerAOutput.innerHTML = quizQuestions[questionIndex].answers[0];
    answerBOutput.innerHTML = quizQuestions[questionIndex].answers[1];
    answerCOutput.innerHTML = quizQuestions[questionIndex].answers[2];
    answerDOutput.innerHTML = quizQuestions[questionIndex].answers[3];

    //Note: Using getElementById here becuase getElementsByClassName won't allow for styling

    document.getElementById('answerAOutput').style.display = 'block';
    document.getElementById('answerBOutput').style.display = 'block';
    document.getElementById('answerCOutput').style.display = 'block';
    document.getElementById('answerDOutput').style.display = 'block';
}

//Timer
//Starts the timer on the Start Quiz click, counts down until the game finishes or time runs out

function timer() {

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        countdownOutput.innerHTML = secondsRemaining;
        secondsRemaining--;
        if (secondsRemaining < 0) {
            secondsRemaining = 0;
            finalScreen();
        }
    } 
}

// Quiz complete screen

function finalScreen () {

    //Hides the questions + answers, and displays good job messages

    document.getElementById('questionOutput').style.display = 'none';
    document.getElementById('answerAOutput').style.display = 'none';
    document.getElementById('answerBOutput').style.display = 'none';
    document.getElementById('answerCOutput').style.display = 'none';
    document.getElementById('answerDOutput').style.display = 'none';

    //Displays the Submit and Restart buttons

    document.getElementById('submitButton').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block';

    // Displays input to enter your initials

    document.getElementById('enterInitials').style.display = 'block';


    document.getElementById('score-box').style.display = 'block';
    document.getElementById('answers-container').style.display = 'none';
    currentScore.innerHTML = 'Final Score: ' + score;
    document.getElementById('scoreScreen').style.display = 'flex';

}

// Initilizes aray for stored scores and initials

let storedScoreboard = [];

function getScoreboard() {
    
    //Clears previous score submission while still holding the entire record
    
    outputHere.innerHTML = '';

    //Creates object to hold score and initials
    
    let initialsAndScore = {
        score: score,
        initials: getInitials.value
    };

    //Pushes score/initials to local storage

    storedScoreboard.push(initialsAndScore);

    localStorage.setItem('storedScoreboard', JSON.stringify(storedScoreboard));

    // Prints scoreboard to UI

    for (let i = 0; i < storedScoreboard.length; i++) {
        output = "Score: " + storedScoreboard[i].score + " | " + "Initals: " + storedScoreboard[i].initials;
        let ul = document.createElement('ul');
        ul.textContent = output;
        console.log(output)
        outputHere.appendChild(ul);
    }

    //Resets the initials field to blank after submission

    getInitials.value = '';

}

// Holds scoreboard info

function previousScoreboard() {
    let lastScoreboard = JSON.parse(localStorage.getItem('storedScoreboard'));

    if (lastScoreboard !== null) {
        storedScoreboard = lastScoreboard;
    }
}

// Runs above functions when the submit button is clicked

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    getScoreboard();
    previousScoreboard();
});

//Runs when page loads to hold scoreboard

 function init() {
     previousScoreboard();
 }
 init();


//Resets the game to initial settings

//Reference
// https://www.dummies.com/programming/programming-games/how-to-reset-your-html5-game/
    function restart() {
    document.location.href = '';
 }