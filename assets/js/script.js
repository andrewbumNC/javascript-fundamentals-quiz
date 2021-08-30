var welcomeMessage = document.querySelector("#welcome-message")
var questionOneDiv = document.querySelector("#question-one-div");
var questionTwoDiv = document.querySelector("#question-two-div");
var questionThreeDiv = document.querySelector("#question-three-div");
var questionFourDiv = document.querySelector("#question-four-div");
var beginQuiz = document.querySelector("#begin-quiz");
var quizCompleted = document.querySelector("#quiz-completed");
var correctOne = document.querySelector("#correct-one");
var correctTwo = document.querySelector("#correct-two");
var correctThree = document.querySelector("#correct-three");
var correctFour = document.querySelector("#correct-four");
var incorrect = document.getElementsByClassName("incorrect")
var correctMessage = document.querySelector("#correct-message");
var incorrectMessage = document.querySelector("#incorrect-message");
var timerElement = document.querySelector("#timer-element");
var submitBtn = document.querySelector("#submit-button")
var initialsList = document.querySelector("#initials-list")
var inputInitials = document.querySelector("#initials")
var highScoreDiv = document.querySelector("#high-score-div");
var clearScores = document.querySelector("#clear-scores")
var goBack = document.querySelector("#go-back")
var viewHighScores = document.querySelector("#scores")
var allBtn = document.querySelectorAll("button")
var timer;
var timerCount;
var scoreCount = 0;



var arrayInitials = [];
var scoreArray = [];


questionOneDiv.setAttribute("style", "display: none");
questionTwoDiv.setAttribute("style", "display:none");
questionThreeDiv.setAttribute("style", "display:none");
questionFourDiv.setAttribute("style", "display:none");
correctMessage.setAttribute("style", "display:none");
incorrectMessage.setAttribute("style", "display:none");
quizCompleted.setAttribute("style", "display:none");
highScoreDiv.setAttribute("style", "display:none");


for (var i = 0; i < allBtn.length; i++) {
    if (allBtn[i] !== beginQuiz && allBtn[i] !== correctOne && allBtn[i] !== correctTwo && allBtn[i] !== correctThree && allBtn[i] !== correctFour && allBtn[i] !== clearScores && allBtn[i] !== goBack) { 
        allBtn[i].addEventListener("click", function(){
            if (timerCount > 6) { 
            timerCount = timerCount - 5;}
            else if (timerCount < 6 && timerCount > 1) {
                timerCount - 1;
            } 
        
        })};
   };



beginQuiz.addEventListener("click", function(){
    welcomeMessage.setAttribute("style", "display:none");
    questionOneDiv.setAttribute("style", "display:flex");
    timerCount = 75;
    startTimer()
})


correctOne.addEventListener("click", function(){
    questionOneDiv.setAttribute("style", "display:none");
    questionTwoDiv.setAttribute("style", "display:flex");
    scoreCount++

})

correctTwo.addEventListener("click", function(){
    questionTwoDiv.setAttribute("style", "display:none");
    questionThreeDiv.setAttribute("style", "display:flex");
    scoreCount++

    
})

correctThree.addEventListener("click", function(){
    questionThreeDiv.setAttribute("style", "display:none");
    questionFourDiv.setAttribute("style", "display:flex");
    scoreCount++
    
})

correctFour.addEventListener("click", function(){
    
    questionFourDiv.setAttribute("style", "display:none");
    quizCompleted.setAttribute("style", "display:flex");
    scoreCount++

    
   
})





function testComplete() {
    quizCompleted.children[0].textContent = `Your final score is ${scoreCount} out of 4.`
    quizCompleted.setAttribute("style", "display:flex");
    questionOneDiv.setAttribute("style", "display:none");
    questionTwoDiv.setAttribute("style", "display:none");
    questionThreeDiv.setAttribute("style", "display:none");
    questionFourDiv.setAttribute("style", "display:none");

}





//When user clicks submit button the function pushes the score and intials into an array, triggers several other functions
submitBtn.addEventListener("click", function(event){

  
    event.preventDefault()

    
   var initials = inputInitials.value.trim();
   if (initials === "") {
       return;
   }

   scoreArray.push(scoreCount);
   arrayInitials.push(initials);
   inputInitials.value = "";
   goToScorePage()
   storage()
   logScore()
});

//When user clicks clear score button the functions clears the scores from local storage and takes the user back to the home page
clearScores.addEventListener("click", function(){
    localStorage.clear()
    highScoreDiv.setAttribute("style", "display:none");
    welcomeMessage.setAttribute("style", "display:flex");
    location.reload();
    
})

//When user clicks go back button it reloads the page and takes them back to the welcome message
goBack.addEventListener("click",function(){
location.reload();

})

//Event listner on View High Scores in top right corner. Triggers function just below this one.
viewHighScores.addEventListener("click", function(){
    goToScorePage()
})



//This is rendering the score page! 
function goToScorePage(){

    welcomeMessage.setAttribute("style", "display:none");
    questionOneDiv.setAttribute("style", "display: none");
    questionTwoDiv.setAttribute("style", "display:none");
    questionThreeDiv.setAttribute("style", "display:none");
    questionFourDiv.setAttribute("style", "display:none");
    correctMessage.setAttribute("style", "display:none");
    incorrectMessage.setAttribute("style", "display:none");
    quizCompleted.setAttribute("style", "display:none");

    highScoreDiv.setAttribute("style", "display:flex");


}



//this is storing the scores and initials that have been pushed into arrays in local storage
function storage (){
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    localStorage.setItem("arrayInitials", JSON.stringify(arrayInitials));
    
}



//This is creating the score entries
function logScore(){
    
    
    initialsList.innerHTML = "";

    for (var i = 0; i < arrayInitials.length; i++) {
        initialsFor = arrayInitials[i]
        scoreFor = scoreArray[i]
        var li = document.createElement("li");
        li.textContent = initialsFor + ": " + scoreFor + " out of 4"
        li.classList.add('scores-li')
        initialsList.appendChild(li)
    }

}

// If there are initials and scores store in local storage then this is retrieving that data when the page initialy loads
function init(){
    var storedScores = JSON.parse(localStorage.getItem("scoreArray"));
    var storedInitials = JSON.parse(localStorage.getItem("arrayInitials"))

    if (storedScores !== null){
        scoreArray = storedScores;
    }

    if (storedInitials !== null){
        arrayInitials = storedInitials;
    }
    logScore()
}






function startTimer(){

timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) { 
        if (scoreCount === 4 || timerCount < 1) {
            clearInterval(timer);
            testComplete()
        }
    }
}
,1000)
}


init()


