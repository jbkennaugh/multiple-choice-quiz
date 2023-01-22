let startButton = document.querySelector("#start");
let startDiv    = document.querySelector("#start-screen");
let questionDiv = document.querySelector("#questions");
let endDiv      = document.querySelector("#end-screen");

startButton.addEventListener("click", function(event) {
    startDiv.classList.add("hide");
    questionDiv.classList.remove("hide");
    renderQuestion(0);
})

function renderQuestion(questionNumber) {
    let theseAnswers = answers[questionNumber];
    let choices = document.querySelector("#choices");
    document.querySelector("#question-title").textContent = questions[questionNumber][0];
    
    for (var i = 0; i < 4; i++){
        var answer = theseAnswers[i];
        var li = document.createElement("li");
        li.textContent = answer;
        
        var select = document.createElement("button");
        select.textContent = "Select";
        
        li.appendChild(select);
        choices.appendChild(li);
    }
}