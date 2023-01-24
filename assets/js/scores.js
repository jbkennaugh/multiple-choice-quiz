let highscores  = JSON.parse(localStorage.getItem("highscores"));
let rankings    = document.querySelector("#highscores");
let clearButton = document.querySelector("#clear");

printHighscores();

function printHighscores(){
    rankings.innerHTML = "";
    for (let i=0; i<highscores.length; i++){
        var li = document.createElement("li");
        rankings.appendChild(li);
        li.textContent = `${i+1}. ${highscores[i][0]} - ${highscores[i][1]}`;
    }
}

// removes all highscores and reprints the rankings
clearButton.addEventListener("click",function(){
    highscores = [];
    localStorage.setItem("highscores", JSON.stringify(highscores));
    printHighscores();
});