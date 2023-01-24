let startButton = document.querySelector("#start");
let startDiv    = document.querySelector("#start-screen");
let questionDiv = document.querySelector("#questions");
let endDiv      = document.querySelector("#end-screen");
let scoreSubmit = document.querySelector("#submit");
let statsDiv    = document.querySelector("#current-stats");
let scoreEl     = document.querySelector("#score");
let timerEl     = document.querySelector("#timer");
let choiceList  = document.querySelector("#choice-list");
let initialsEl  = document.querySelector("#initials");
let timeLeft, currentScore, remainingQuestions, questionNumber;

startButton.addEventListener("click", init);
scoreSubmit.addEventListener("click", saveHighScore);

function init(){
    timeLeft = 60;
    currentScore = 0;
    questionNumber = 0;
    timerEl.textContent = "Timer: "+timeLeft;
    scoreEl.textContent = "Score: "+currentScore;

    startQuiz();
}

function timer(){
    let countdown = setInterval(function() {
        timeLeft--;
        if(timeLeft <= 0) { 
            timerEl.textContent = "Timer: "+"0"; 
            endQuiz();
        }
        else { timerEl.textContent = "Timer: "+timeLeft; }
    }, 1000);
}

function startQuiz(){
    timer();
    startDiv.classList.add("hide");
    questionDiv.classList.remove("hide");
    statsDiv.classList.remove("hide");
    renderQuestion(0);
}

function endQuiz(){
    questionDiv.classList.add("hide");
    statsDiv.classList.add("hide");
    endDiv.classList.remove("hide");
    document.querySelector("#final-score").textContent = currentScore;
}

function renderQuestion(questionNumber) {
    let theseAnswers = answers[questionNumber];
    choiceList.innerHTML = "";
    document.querySelector("#question-title").textContent = questions[questionNumber][0];
    correctAnswerIndex = questions[questionNumber][1] - 1;
    correctAnswer = answers[questionNumber][correctAnswerIndex];
    questionNumber++;
    
    for (var i = 0; i < 4; i++){
        var answer = theseAnswers[i];
        var li = document.createElement("li");        
        var select = document.createElement("button");
        select.textContent = answer;
        
        choiceList.appendChild(li);
        li.appendChild(select);

        select.addEventListener("click", function(){
            //checks if this button's answer is the correct answer
            if(this.textContent !== correctAnswer){ timeLeft -= 10; }
            else { currentScore++; }
            renderQuestion(questionNumber); 
        });
    }
}

function saveHighScore(){
    let initials = initialsEl.value;
}