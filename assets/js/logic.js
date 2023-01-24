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
let error       = document.querySelector("#error");
let feedbackDiv = document.querySelector("#feedback");
let feedbackEl  = feedbackDiv.firstChild;
let highscores  = JSON.parse(localStorage.getItem("highscores"));

let timeLeft, currentScore, remainingQuestions, questionNumber;

startButton.addEventListener("click", init);
scoreSubmit.addEventListener("click", saveHighScore);

// ensures good start values
function init(){
    timeLeft = questions.length * 10;
    currentScore = 0;
    questionNumber = 0;
    timerEl.textContent = "Timer: "+timeLeft;
    scoreEl.textContent = "Score: "+currentScore;

    if(highscores === null) { highscores = []; }
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

// iterates through the possible answers for the given question and prints them out, 
// creating a button for each one
function renderQuestion(questionNumber) {
    let theseAnswers = answers[questionNumber];
    choiceList.innerHTML = "";
    document.querySelector("#question-title").textContent = questions[questionNumber][0];
    //gets the correct answer from the arrays in questions.js
    correctAnswerIndex = questions[questionNumber][1] - 1;
    correctAnswer = answers[questionNumber][correctAnswerIndex];
    questionNumber++;
    
    for (var i = 0; i < 4; i++){
        var answer = theseAnswers[i];       
        var select = document.createElement("button");
        select.textContent = answer;
        
        choiceList.appendChild(select);

        select.addEventListener("click", function(){
            //checks if this button's answer is the correct answer
            if(this.textContent !== correctAnswer){ 
                //feedback will show for a short time if wrong, longer if wrong to see right answer
                feedbackEl.textContent = `This answer was incorrect. The correct answer was "${correctAnswer}"`;
                feedbackDiv.classList.replace("hide","incorrect");
                setTimeout(function () {
                    feedbackDiv.classList.replace("incorrect","hide");
                }, 3000);
                timeLeft -= 10; 
            }
            else { 
                //feedback will show for a short time if right
                feedbackEl.textContent = `This answer was correct.`;
                feedbackDiv.classList.replace("hide","correct");
                setTimeout(function () {
                    feedbackDiv.classList.replace("correct","hide");
                }, 1000);
                currentScore++; 
            }
            if(questionNumber > questions.length-1){ endQuiz(); }
            // will only run if there is more questions unanswered
            else{ renderQuestion(questionNumber); }
        });
    }
}

function saveHighScore(){
    let initials = initialsEl.value;
    if(!initials || initials.length > 3){
        error.classList.remove("hide");
    }
    else{
        error.classList.add("hide");
        highscores.push([initials,currentScore]);
        // sorts the highscores beforing updating local storage
        highscores.sort(function(a,b) {
            return b[1]-a[1];
        });
        
        localStorage.setItem("highscores",JSON.stringify(highscores));

        document.location.href = "highscores.html";
    }
}