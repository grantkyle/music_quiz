document.getElementById("start").addEventListener("click", setTime);

var questionIndex = 0;
myQuestions[questionIndex].question.answers

var questionDiv = document.getElementById('questions');
questionDiv.textContent = myQuestions[questionIndex].question;

// timer set to count down from 75
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till you dead";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}

// if time runs out, send message to start over
// i need to add function to reset page
function sendMessage() {
    timeEl.textContent = alert("you dead... START OVER!");

}

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        // code to show output 
        var output = [];
        var answers;
        // code to create a for loop to loop through all the questions

        for (var i = 0; i < questions.length; i++) {
            // make sure answers are reset when quiz starts
            answers = [];

            // make sure that an html button is added to each possible answer choice

            for (letter in questions[i].answers) {

                // html radio button
                // honestly, what is happening in this code below? 
                // i understand holistically that it is creating buttons for the choices 
                // but what are all the moving parts doing?

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>');
            }

            // add current question and its choices to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {
        // code to collect answer containers from the quiz

        var answerContainers = quizContainer.querySelectorAll('.answers');

        // track user response
        var userAnswer = '';

        // specify to start count from 0
        var numCorrect = 0;

        // create a for loop for each question

        for (var i = 0; i < questions.length; i++) {

            // and find selected choice...  what is happening in below code
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the total number of questions answered correctly
                // the two plus signs at the end of numCorrect
                // ensure the number of correct responses keeps aggregating

                numCorrect++;

                // manipulate DOM to color correct answer green
                answerContainers[i].style.color = 'lightgreen';
            }

            // else below is for when answer is incorrect or blank

            else {
                answerContainers[i].style.color = 'red';
            }
        }
        // display aggregated number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // display questions 

    showQuestions(questions, quizContainer);

    // when user clicks submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
        console.log('startButton')
    }
}
// can "choices" be changed into curly brackets