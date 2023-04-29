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

//question and answer set. add questions here.
var QAlist = [
    {
    question: "What can be done to Arrays?",
    choices: 
        [
        {choice: "merge", correct: false },
        {choice: "sort", correct: false },
        {choice: "get length", correct: false },
        {choice: "all of the above", correct: true }
        ]
    },
    {
    question: "Can you have multiple variables with the same name?",
    choices: 
        [
        {choice: "No definately", correct: false },
        {choice: "Yes definately", correct: false },
        {choice: "Yes, but only between functions", correct: true },
        {choice: "Yes, but only inside a function", correct: false }
        ]
    },
    {
    question: "Which of the following will not be boolean false?",
    choices: 
        [
        {choice: "null", correct: false },
        {choice: "NaN", correct: false },
        {choice: "-infinity", correct: true },
        {choice: "0", correct: false }
        ]
    },
    {
    question: "which of the folloing will be false for == 1?",
    choices: 
        [
        {choice: "1.0", correct: false },
        {choice: "'one'", correct: true },
        {choice: "'1'", correct: false },
        {choice: "00001", correct: false }
        ]
    }    
]
;
//main variables
var QAcaller = (Object.keys(QAlist));
var questionNumber = 0
var stopTimer = false
var scoreList = {}
var currentScore = 0
var quizTime = 70;

function setDefault() {
  questionNumber = 0;
  currentScore = 0;
  quizTime = 70;
  stopTimer = false
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

//initial state
startPage.style.display="";
quizPage.style.display="none";
submitPage.style.display="none";
restartPage.style.display="none";
highScorePage.style.display="none";
timer.style.display="none";
highScoreBtn.style.display="";

//buttons
startBtn.addEventListener("click", function(event){
    event.preventDefault();
    setDefault();
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
  generateHighscoresPage();
  nameInput.value = "";
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

//generate page functions
function generateSubmitPage() {
    questionNumber = 0
    quizPage.style.display="none";
    submitPage.style.display="";
    displayScore.textContent = "Your Score is: " + currentScore;
    return;
}

function generateHighscoresPage() {
  top1.textContent = "#1 Score: " + scoreList[0].score + " by " + scoreList[0].name;
  top2.textContent = "#2 Score: " + scoreList[1].score + " by " + scoreList[1].name;
  top3.textContent = "#3 Score: " + scoreList[2].score + " by " + scoreList[2].name;
  top4.textContent = "#4 Score: " + scoreList[3].score + " by " + scoreList[3].name;
  top5.textContent = "#5 Score: " + scoreList[4].score + " by " + scoreList[4].name;
  submitPage.style.display="none";
  highScorePage.style.display="";
  return;
}

function generateRestartPage() {
    questionNumber = 0
    quizPage.style.display="none";
    restartPage.style.display="";
    return;
}
  
      //from https://github.com/WebDevSimplified/JavaScript-Quiz-App/blob/master/script.js
    function generateQuestion() {
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
    quizTime -= 5
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
  return;
}
  
function setTime() {
    var countDown = setInterval(function() {
      quizTime--;
      timer.style.display="";
      timer.textContent = quizTime + " seconds left";
  
      if(quizTime <= 0) {
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
      quitBtn.addEventListener("click", function(event){
        event.preventDefault();
        clearInterval(countDown);
        return;
      });
    }, 1000);
}
