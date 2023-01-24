let highscores  = JSON.parse(localStorage.getItem("highscores"));
let rankings    = document.querySelector("#highscores");
let clearButton = document.querySelector("#clear");

printHighscores();

function printHighscores(){
    rankings.innerHTML = "";
    if(highscores.length === 0){
        var h2 = document.createElement("h2");
        rankings.appendChild(h2);
        h2.textContent = "No highscores yet saved, give the quiz a go and save your initials to view your best attempts!"
    }
    else{
        for (let i=0; i<highscores.length; i++){
            var li = document.createElement("li");
            rankings.appendChild(li);
            li.textContent = `${i+1}. ${highscores[i][0]} - ${highscores[i][1]}`;
        }
    }
}

// removes all highscores and reprints the rankings
clearButton.addEventListener("click",function(){
    highscores = [];
    localStorage.setItem("highscores", JSON.stringify(highscores));
    printHighscores();
});