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
var $highScoresDiv = document.getElementById('highscores')


var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var questionIndex = 0;
var secondsLeft = 75;
var numCorrect = 0;

// timer set to count down from 75

//this is to reset test
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

function saveScore() {
    var userInitials = prompt("Enter Name Here");

    var userObj = {
        name: userInitials + "  ",
        score: numCorrect
    };

    var userInfo = localStorage.getItem("userInfo");

    var userArr;
    if (!userInfo) {
        userArr = [];
    } else {
        userArr = JSON.parse(userInfo);
    }

    userArr.push(userObj);
    localStorage.setItem("userInfo", JSON.stringify(userArr));


    for (var end = userArr.length - 1, userCount = 1; end > -1; end-- , userCount++) {

        if (userCount === 5) {
            break;
        }

        $highScoresDiv.innerHTML += (userArr[end].score + " - " + userArr[end].name);
    }

}
