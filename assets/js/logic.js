let startButton = document.querySelector("#start");
let startDiv    = document.querySelector("#start-screen");
let questionDiv = document.querySelector("#questions");
let endDiv      = document.querySelector("#end-screen");
let scoreEl     = document.querySelector("#score");
let timerEl     = document.querySelector("#timer");
let timer, currentScore, remainingQuestions, questionNumber;

startButton.addEventListener("click", init);

function init(){
    timer = 60;
    currentScore = 0;
    questionNumber = 0;
    timerEl.textContent = timer;
    scoreEl.textContent = currentScore;

    startQuiz();
}

function startQuiz(){
    startDiv.classList.add("hide");
    questionDiv.classList.remove("hide");
    renderQuestion(0);
}

function renderQuestion(questionNumber) {
    console.log(questionNumber)
    let theseAnswers = answers[questionNumber];
    let choices = document.querySelector("#choices");
    document.querySelector("#question-title").textContent = questions[questionNumber][0];
    questionNumber++;
    
    for (var i = 0; i < 4; i++){
        var answer = theseAnswers[i];
        var li = document.createElement("li");
        li.textContent = answer;
        
        var select = document.createElement("button");
        select.textContent = "Select";
        
        li.appendChild(select);
        choices.appendChild(li);

        select.addEventListener("click", function(){ renderQuestion(questionNumber); });
    }
}

