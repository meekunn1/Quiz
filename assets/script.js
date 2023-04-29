var timer = document.querySelector(".timer");
var startPage = document.querySelector("#generateStart");
var quizPage = document.querySelector("#generateQuiz");
var submitPage = document.querySelector("#generateSubmit");
var restartPage = document.querySelector("#generateRestart");
var highScorePage = document.querySelector("#generateHighScore");
var startBtn = document.querySelector("#startBtn");
var startBtn2 = document.querySelector("#startBtn2");
var restartBtn = document.querySelector("#restartBtn");
var submitBtn = document.querySelector("#submitBtn");
var highScoreBtn = document.querySelector(".highScoreBtn");
var quitBtn = document.querySelector(".quitBtn");
var displayScore = document.querySelector("#displayScore");
var questionCount = document.querySelector("#questionCount");
var question = document.querySelector("#question");
var answerButtons = document.querySelector("#answers");
var answerChecker = document.querySelector("#answerChecker");
var nameInput = document.querySelector("#scoreName");
var scoreBoard = document.querySelector("#scoreBoard");
var top1 = document.querySelector("#top1");
var top2 = document.querySelector("#top2");
var top3 = document.querySelector("#top3");
var top4 = document.querySelector("#top4");
var top5 = document.querySelector("#top5");
//question and answer set
var QAlist = [
    {
    question: "question1",
    choices: 
        [
        {choice: "A", correct: true },
        {choice: "B", correct: false },
        {choice: "C", correct: false },
        {choice: "D", correct: false }
        ]
    },
    {
    question: "question2",
    choices: 
        [
        {choice: "A", correct: true },
        {choice: "B", correct: false },
        {choice: "C", correct: false },
        {choice: "D", correct: false }
        ]
    },
    {
    question: "question3",
    choices: 
        [
        {choice: "A", correct: true },
        {choice: "B", correct: false },
        {choice: "C", correct: false },
        {choice: "D", correct: false }
        ]
    },
    {
    question: "question4",
    choices: 
        [
        {choice: "A", correct: true },
        {choice: "B", correct: false },
        {choice: "C", correct: false },
        {choice: "D", correct: false }
        ]
    }    
]
;
var QAcaller = (Object.keys(QAlist));
var questionNumber = 0
var stopTimer = false
var scoreList = {}
var currentScore = 0

function setDefault() {
  questionNumber = 0;
  stopTimer = false;
  currentScore = 0;
}

function getScore() {
  
  var storedScore = JSON.parse(localStorage.getItem("scoreList"));

  if (storedScore !== null) {
    scoreList = storedScore;
  }
  else {
    scoreList = [
     {name: "empty", score: 0},
     {name: "empty", score: 0},
     {name: "empty", score: 0},
     {name: "empty", score: 0},
     {name: "empty", score: 0}
    ]
  
  }
  return;
}

getScore()
console.log(scoreList);
//tester
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));
console.log(QAlist[1]);
QAlist.forEach(element => console.log(element));
var choiceList = QAlist[1];
console.log(choiceList);
var choiceSet = QAlist[1].choices;
console.log(QAlist[1].choices);
console.log(choiceSet);
console.log(choiceSet[1].choice);
console.log(choiceSet[1].correct);
console.log(QAlist[1].choices[1].correct);
console.log(QAlist[1].question);
console.log(QAlist.length - 1);
console.log(QAlist[1].choices.length);
// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

//console.log(QAlist.q1[2]);
console.log(QAcaller.length);
console.log(QAlist[0]);
console.log(QAcaller);
console.log(timer);
console.log(startPage);
console.log(Object.keys(QAlist));

//initial state
startPage.style.display="";
quizPage.style.display="none";
submitPage.style.display="none";
restartPage.style.display="none";
highScorePage.style.display="none";
timer.style.display="none";
highScoreBtn.style.display="";

startBtn.addEventListener("click", function(event){
    event.preventDefault();
    setTime();
    startPage.style.display="none";
    highScoreBtn.style.display="none";
    quizPage.style.display="";
    questionNumber = 0
    generateQuestion(question);
    return;
});

startBtn2.addEventListener("click", function(event){
    event.preventDefault();
    setDefault();
    setTime();
    highScorePage.style.display="none";
    quizPage.style.display="";
    questionNumber = 0
    generateQuestion(question);
    return;
});

restartBtn.addEventListener("click", function(event){
    event.preventDefault();
    setDefault();
    setTime();
    restartPage.style.display="none";
    quizPage.style.display="";
    return;
});

submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  if (nameInput.value.trim() === ""){
    return;
  }
  console.log(scoreList)
  scoreList.push({ name: nameInput.value.trim(), score: currentScore });
  console.log(scoreList);
  scoreList.sort((a, b) => b.score - a.score);
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
  console.log(scoreList[0].score)
  console.log(scoreList[0].name)
  console.log(scoreList[4].score)
  console.log(scoreList[4].name)
  top1.textContent = "#1 Score: " + scoreList[0].score + " by " + scoreList[0].name;
  top2.textContent = "#2 Score: " + scoreList[1].score + " by " + scoreList[1].name;
  top3.textContent = "#3 Score: " + scoreList[2].score + " by " + scoreList[2].name;
  top4.textContent = "#4 Score: " + scoreList[3].score + " by " + scoreList[3].name;
  top5.textContent = "#5 Score: " + scoreList[4].score + " by " + scoreList[4].name;
  generateHighscoresPage();
  return;
});

highScoreBtn.addEventListener("click", function(event){
  event.preventDefault();
  generateHighscoresPage();
  startPage.style.display="none";
  highScoreBtn.style.display="none";
  highScorePage.style.display="";
  return;
});

quitBtn.addEventListener("click", function(event){
  event.preventDefault();
  stopTimer = true;
  setDefault();
  removeChoice();
  startPage.style.display="";
  quizPage.style.display="none";
  submitPage.style.display="none";
  restartPage.style.display="none";
  highScorePage.style.display="none";
  timer.style.display="none";
  highScoreBtn.style.display="";
  return;
});

function generateSubmitPage() {
    questionNumber = 0
    quizPage.style.display="none";
    submitPage.style.display="";
    displayScore.textContent = "Your Score is: " + currentScore;
}

function generateHighscoresPage() {
  submitPage.style.display="none";
  highScorePage.style.display="";

}

function generateRestartPage() {
    questionNumber = 0
    quizPage.style.display="none";
    restartPage.style.display="";
}

    // Clear todoList element and update todoCountSpan
    //var counter = 1
    //questionCount.textContent = "question " + counter + " of" + QAcaller.length;
  
      //from https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js
      function generateQuestion() {
        //console.log(questionNumber);
          question.textContent = QAlist[questionNumber].question;
          QAlist[questionNumber].choices.forEach(answer => {
            var button = document.createElement('button');
            button.textContent = answer.choice;
            button.classList.add('btn');
            if (answer.correct) {
              button.dataset.correct = answer.correct
              button.addEventListener('click', resultCorrect)
            answerButtons.appendChild(button)
            }
            else{
            button.addEventListener('click', resultWrong)
            answerButtons.appendChild(button)
            }
          });
          return;
    }

    function resultCorrect(){
      answerChecker.textContent= "correct"
      questionNumber++;
      var delay = 1;
      var delayCountDown = setInterval(function() {
        delay--;    
        if(delay === 0) {
        removeChoice();
        if (questionNumber === QAlist.length){
          stopTimer = true;
          return;
        }
        else{
        generateQuestion();
        return;
        }
    }},1000);
  }

  function resultWrong(){
    answerChecker.textContent= "wrong"
    questionNumber++;
    var delay = 1;
    var delayCountDown = setInterval(function() {
      delay--;    
      if(delay === 0) {
      removeChoice();
      if (questionNumber === QAlist.length){
        stopTimer = true;
        return;
      }
      else{
      generateQuestion();
      return;
      }
  }},1000);
}

function removeChoice(){
  answerChecker.textContent= "";
  while (answerButtons.firstChild) {
  answerButtons.removeChild(answerButtons.firstChild)
  }
}
    
//generate question page. reference 04-01-26
function generateChoices() {
       // Render a new li for each todo
       for (var i = 0; i < QAcaller.length; i++) {
        var QAcall = QAcaller[i] + "[0]";
      question.textContent = QAlist.QAcall;
      var li = document.createElement("li");
      li.textContent = QAlist.QAcall[0];
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete ✔️";
  
      li.appendChild(button);
      todoList.appendChild(li);
    }
}

//timer function from 04-02-09
function setTime() {
    var quizTime = 20;
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
      if(stopTimer) {
        currentScore = quizTime
        clearInterval(countDown);
        timer.style.display="none";
        generateSubmitPage();
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