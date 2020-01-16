var gameStarted = false;
// this button starts the time and the game
var $startButton = document.getElementById("start")
// this button is for reset after quiz is over
var $resetDiv = document.getElementById("reset")

$startButton.addEventListener("click", startQuiz)
$resetDiv.addEventListener("click", resetQuiz)

// now that i pulled the button in, i need to assign an action to it
var $nextButton = document.getElementById("next")
$nextButton.addEventListener("click", () => {
    questionIndex++
    console.log(questionIndex)
    nextQuestion()
})
var $questionDiv = document.getElementById('questions');
var $answersDiv = document.getElementById('answers');
var $resultsDiv = document.getElementById('results')



var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var questionIndex = 0;
var secondsLeft = 75;
var numCorrect = 0;
//questionDiv.textContent = myQuestions[questionIndex++].question;
//answersDiv.innerHTML = myQuestions[questionIndex].answers.map(answers => {
//return (`${<input type='radio' name="question" value={answers}>${answers}</input>}`)
//})
// timer set to count down from 75

//initialize timer variable at global scope
var timer = ''
function resetQuiz() {
    questionIndex = 0;
    secondsLeft = 75;
    numCorrect = 0;
    $resultsDiv.innerHTML = ''
    showQuestion()
    clearInterval(timer);
    timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till you dead";

        if (secondsLeft <= 0) {
            clearInterval(timer);
            sendMessage();
        }

    }, 1000)
}

function startQuiz() {
    //this is a private variable- only startQuiz has access to this
    var consoleLog = console.log('hello')
    //only start time once
    if (!gameStarted) {
        timer = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft + " seconds left till you dead";

            if (secondsLeft <= 0) {
                clearInterval(timer);
                sendMessage();
            }

        }, 1000)
        gameStarted = true
        $startButton.classList.add('hide')
        questionIndex = 0
        $questionDiv.classList.remove('hide')

        nextQuestion()
    }
}

function sendMessage() {
    timeEl.textContent = alert("you dead... START OVER!");

}

showQuestion()
// bring next question in
function nextQuestion() {
    showQuestion()
}

function showQuestion() {
    let thisQuestion = myQuestions[questionIndex]
    console.log("HERE", myQuestions[questionIndex].question)
    $questionDiv.innerHTML = myQuestions[questionIndex].question;
    $answersDiv.innerHTML = "";

    thisQuestion.answers.forEach(answer => {
        var $button = document.createElement('button');
        $button.classList.add('btn');
        $button.textContent = answer;
        var correctAnswer = thisQuestion.correctAnswer;

        if (answer === correctAnswer) {
            $button.setAttribute("data-answer", true);
        } else {
            $button.setAttribute("data-answer", false);
        }

        $answersDiv.appendChild($button);
        $button.addEventListener("click", function (event) {//answer button listeners
            event.preventDefault()
            var userSelection = this.getAttribute("data-answer")
            console.log(typeof userSelection)
            if (userSelection == "false") {
                console.log("it was wrong")
                secondsLeft -= 15
            } else {
                numCorrect++
            }
            //call next question
            if (questionIndex == myQuestions.length - 1) {
                endGame()

            } else {
                questionIndex++
                showQuestion()
            }


        })
    })
}
function endGame() {
    // timer stops
    clearInterval(timer);
    // results display
    $resultsDiv.innerHTML = numCorrect + ' out of ' + myQuestions.length + ' answered correctly';
    saveScore()
    //questions go away
    $questionDiv.classList.add("hide")
    console.log("hide")
    //check to store high scores
}

/////////******** create function to prompt user for initials, those save to local storage
//////// stringify then parse is option
/////// then appendChild to front end
function saveScore() {

    localStorage.setItem(initials, numCorrect)
}



// answerButtonsElement.addEventListener("click", function (event) {
//     var itemClicked = event.target;

//     if (itemClicked.matches("button")) {
//         if (itemClicked.getAttribute("data-answer") === "false") {
//             // subtract timer 15-    
//             alert("wrong");
//         }

//         currentQuestionIndex++;
//         setNextQuestion();

//     }

// });
// // if time runs out, send message to start over
// // i need to add function to reset page


// var quizContainer = document.getElementById('quiz');
// var resultsContainer = document.getElementById('results');
// var submitButton = document.getElementById('submit');

// generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

// function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

//     function showQuestions(questions, quizContainer) {
//         // code to show output 
//         var output = [];
//         var answers;
//         // code to create a for loop to loop through all the questions

//         for (var i = 0; i < questions.length; i++) {
//             // make sure answers are reset when quiz starts
//             answers = [];

//             // make sure that an html button is added to each possible answer choice

//             for (letter in questions[i].answers) {

//                 // html radio button
//                 // honestly, what is happening in this code below? 
//                 // i understand holistically that it is creating buttons for the choices 
//                 // but what are all the moving parts doing?

//                 answers.push(
//                     '<label>'
//                     + '<input type="radio" name="question' + i + '" value="' + letter + '">'
//                     + letter + ': '
//                     + questions[i].answers[letter]
//                     + '</label>');
//             }

//             // add current question and its choices to the output
//             output.push(
//                 '<div class="question">' + questions[i].question + '</div>'
//                 + '<div class="answers">' + answers.join('') + '</div>'
//             );
//         }

//         quizContainer.innerHTML = output.join('');
//     }

//     function showResults(questions, quizContainer, resultsContainer) {
//         // code to collect answer containers from the quiz

//         var answerContainers = quizContainer.querySelectorAll('.answers');

//         // track user response
//         var userAnswer = '';

//         // specify to start count from 0
//         var numCorrect = 0;

//         // create a for loop for each question

//         for (var i = 0; i < questions.length; i++) {

//             // and find selected choice...  what is happening in below code
//             userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

//             // if answer is correct
//             if (userAnswer === questions[i].correctAnswer) {
//                 // add to the total number of questions answered correctly
//                 // the two plus signs at the end of numCorrect
//                 // ensure the number of correct responses keeps aggregating

//                 numCorrect++;

//                 // manipulate DOM to color correct answer green
//                 answerContainers[i].style.color = 'lightgreen';
//             }

//             // else below is for when answer is incorrect or blank

//             else {
//                 answerContainers[i].style.color = 'red';
//             }
//         }
//         // display aggregated number of correct answers out of total
//         resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
//     }

//     // display questions 

//     showQuestions(questions, quizContainer);

//     // when user clicks submit, show results
//     submitButton.onclick = function () {
//         showResults(questions, quizContainer, resultsContainer);
//         console.log('startButton')
//     }
// }
// // can "choices" be changed into curly brackets