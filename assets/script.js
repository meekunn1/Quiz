var timer = document.querySelector(".timer");
console.log(document);

//timer function from 04-02-09
function setTime() {
    // Sets interval in variable
    var quizTime = 70;
    var countDown = setInterval(function() {
      quizTime--;
      timer.textContent = "second remaining" + quizTime;
  
      if(quizTime === 0) {
        // Stops execution of action at set interval
        clearInterval(countDown);
        // Calls function to create and append image
        generateEndGame();
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