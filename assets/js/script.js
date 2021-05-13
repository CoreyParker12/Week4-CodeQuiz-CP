
const startButton = document.querySelector('button');
const countdownOutput = document.getElementById('countdownOutput');
const questionOutput = document.getElementById("questionOutput");
const answerAOutput = document.getElementById("answerAOutput");
const answerBOutput = document.getElementById("answerBOutput");
const answerCOutput = document.getElementById("answerCOutput");
const answerDOutput = document.getElementById("answerDOutput");
const correctIncorrect = document.getElementById('correctIncorrect');
const nextButton = document.getElementById('nextButton');

startButton.addEventListener('click', game);
startButton.addEventListener('click', timer);

questionIndex = 0;
    
// Questions

let quizQuestions = [
    {
       question: "What number comes after 3?",
       answers: ["One","Two","Eight", "Four"],
       rightAnswer: "Four"    
    },
    {
       question: "Here is a question",
       answers: ["strings","booleance","alerts", "numbers"],
       rightAnswer: "alerts"     
    },
    {
       question: "Question 3",
       answers: ["1","2","3", "4"],
       rightAnswer: "1"     
    },
    {
       question: "Question 4",
       answers: ["1","2","3", "4"],
       rightAnswer: "1"       
   },
   {
       question: "Question 5",
       answers: ["1","2","3", "4"],
       rightAnswer: "1"    
   },
]


 //Logic

 function chosenAnswer(val) {
    let chosenAnswer = val.textContent;
    if (quizQuestions[0].rightAnswer === chosenAnswer) {
            console.log('Correct');
            questionIndex++;
        } else console.log('Incorrect');

 }

// Initialize Question

function game() {

 // Had to call on the array position, then the object inside

    questionOutput.innerHTML = quizQuestions[questionIndex].question;
    answerAOutput.innerHTML = quizQuestions[questionIndex].answers[0];
    answerBOutput.innerHTML = quizQuestions[questionIndex].answers[1];
    answerCOutput.innerHTML = quizQuestions[questionIndex].answers[2];
    answerDOutput.innerHTML = quizQuestions[questionIndex].answers[3];
}



function nextQuestion() {

questionIndex++
console.log(questionIndex)
game()

}

//Timer

function timer() {

    let secondsRemaining = 60;

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        countdownOutput.innerHTML = secondsRemaining;
        secondsRemaining--;
        if (secondsRemaining < 0) {
            secondsRemaining = 0;
        }
    }

}

