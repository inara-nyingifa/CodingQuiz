
var resultsEl = document.getElementById("result");

var gameoverDiv = document.getElementById("gameover");

var quizBody = document.getElementById("quiz");

var questionsEl = document.getElementById("questions");

var finalScoreEl = document.getElementById("finalScore");

var quizTimer = document.getElementById("timer");

var startQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("startpage");

var highscoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var highscoreDisplayName = document.getElementById("highscore-initials");

var highscoreInputName = document.getElementById("initials");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var highscoreDisplayScore = document.getElementById("highscore-score");

var buttonA = document.getElementById("a");

var buttonB = document.getElementById("b");

var buttonC = document.getElementById("c");

var buttonD = document.getElementById("d");

// Questions 
var quizQuestions = [{
    question:"Inside which HTML element do we put the JavaScript?",
    choiceA: "scripting",
    choiceB: "js",
    choiceC: "script",
    choiceD: "javascript",
    correctAnswer: "c"},
  {
    question: "Where is the correct place to insert a JavaScript?",
    choiceA: "The 'head' section",
    choiceB: "Both the 'head' section and the 'body' section are correct",
    choiceC: "The 'body' section",
    choiceD: "you can't insert it in an html page",
    correctAnswer: "b"},
    {
    question: "What is the correct syntax for referring to an external script called 'xxx.js' ",
    choiceA: "script href='xxx.js' ",
    choiceB: "script name=xxx.js' ",
    choiceC: "script src='xxx.js' ",
    choiceD: "script title='xxx.js' ",
    correctAnswer: "a"},
    {
    question: "How do you create a function in JavaScript?",
    choiceA: "function:myFunction()",
    choiceB: "function=myFunction()",
    choiceC: "function myFunction()",
    choiceD: "Create myFunction()",
    correctAnswer: "c"},  
    {
    question: "What is the correct way to debug a javascript file in a repo",
    choiceA: "Close your computer and try again tomorrow",
    choiceB: "Delete the repo from your computer and repull the clean code",
    choiceC: "Ask God for help",
    choiceD: "Look to see what errors show up in your terminal and take time fixing each error",
    correctAnswer: "c"},
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var count = 60;
var timerInterval;
var score = 0;
var penalty = 5;
var correct;

// Generate a question with answers
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<h2>" + currentQuestion.question + "</h2>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Make the Start Quiz button work and present the first question
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    // Start the timer
    timerInterval = setInterval(function() {
        count--;
        quizTimer.textContent = "Time: " + count;
    
        if(count === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// After completing the questions or when the time is up, I am presented with my final score
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "All done! Your final score is " + score + ".";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in localStorage
// We push the user initials and score into the array we are saving in localStorage. 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("You must enter your initials.");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Generate a new list from data saved in from localStorage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Display the High scores page hiding all the other pages
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clear localStorage and High scores list
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Play again Function
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    count = 76;
    score = 0;
    currentQuestionIndex = 0;
}


// Check if the answer is correct or incorrect
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        // If incorrect, subtract 10sec from timer
        count = count - penalty;
        alert("Incorrect!")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);