var timer = document.querySelector(".timer");
var startPage = document.querySelector("#generateStart");
var quizPage = document.querySelector("#generateQuiz");
var submitPage = document.querySelector("#generateSubmit");
var restartPage = document.querySelector("#generateRestart");
var highScorePage = document.querySelector("#generateHighScore");
var startBtn = document.querySelector("#startBtn");
var restartBtn = document.querySelector("#restartBtn");
var displayScore = document.querySelector("#displayScore");
var question = document.querySelector("#question");
var choices = document.querySelector("choices");

console.log(timer);
console.log(startPage);
startPage.style.display="";
quizPage.style.display="none";
submitPage.style.display="none";
restartPage.style.display="none";
highScorePage.style.display="none";
timer.style.display="none";



startBtn.addEventListener("click", function(event){
    event.preventDefault();
    setTime();
    startPage.style.display="none";
    quizPage.style.display="";
    return;
});

restartBtn.addEventListener("click", function(event){
    event.preventDefault();
    setTime();
    restartPage.style.display="none";
    quizPage.style.display="";
    return;
});

function generateSubmitPage() {
    quizPage.style.display="none";
    submitPage.style.display="";
    displayScore.textContent = "Your Score is: " + quizTime;
}

function generateRestartPage() {
    quizPage.style.display="none";
    restartPage.style.display="";
}

//generate question page
function generateChoices() {
    // Clear todoList element and update todoCountSpan
    
    todoCountSpan.textContent = todos.length;
  
    // Render a new li for each todo
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
  
      var li = document.createElement("li");
      li.textContent = todo;
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete ✔️";
  
      li.appendChild(button);
      todoList.appendChild(li);
    }
}

//timer function from 04-02-09
function setTime() {
    // Sets interval in variable
    var quizTime = 10;
    var countDown = setInterval(function() {
      quizTime--;
      timer.style.display="";
      timer.textContent = quizTime + " seconds left";
  
      if(quizTime === 0) {
        clearInterval(countDown);
        generateRestartPage();
        timer.style.display="none";
        return;
      }
    }, 1000);
}



//array shuffle function by ashleedawg, the updated version of durstendfeld shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}