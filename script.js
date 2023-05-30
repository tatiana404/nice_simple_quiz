//  define questions
const quizQuestions = [
    {
      question: "Where the most romantic tower is located",
      choices: ["Paris", "London", "Warsaw"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet was named after ancient Roman God of a war?",
      choices: ["Mars", "Earth", "Jupiter"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the symbol for the chemical element Oxygen?",
      choices: ["O", "K", "As"],
      correctAnswer: "O"
    }
  ];
  
 // define variabsed
  let currentQuestionIndex = 0;
  let score = 0;
  

  var initInput = document.getElementById('initInput')
  var saveButton = document.getElementById('save')
  var inputSection = document.getElementById('initials')
  var questionElement = document.getElementById('question');
  var choicesElement = document.getElementById('choices');
  var scoreElement = document.getElementById('score');
  var startButton = document.getElementById('start');
  var timerElement = document.querySelector(".timer-count");
  var timer;
  var timerCount;
  
//  start quiz function
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timerCount = 40;
    startButton.disabled = true;
    showQuestion();
    startTimer();
  }
  
  
  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
  
    currentQuestion.choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', () => {
        checkAnswer(choice);
      });
      choicesElement.appendChild(choiceButton);
    });
  }
  
//  time counter
function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;

    if (timerCount <= 0) {
        clearInterval(timer);
      }

    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

// condition whether the answer is correct
  function checkAnswer(choice) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (choice === currentQuestion.correctAnswer) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }
    else {
      timerCount = timerCount-10;
    }
    currentQuestionIndex++;
  
    if (currentQuestionIndex === quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
// end quiz
  function endQuiz() {
    startButton.disabled = false;
    questionElement.textContent = 'Quiz finished!';
    choicesElement.innerHTML = '';
    scoreElement.textContent = `Score: ${score}`;
    clearInterval(timer);
    inputSection.classList.remove("hide");
   
  }
  
  function saveInitials(){
    var highscore = JSON.parse (localStorage.getItem("scores")) || [];
    var playerScore = {
      initials: initInput.value,
      score: score,
    }
    highscore.push (playerScore);
    console.log(initInput.value);
    localStorage.setItem("scores",JSON.stringify(highscore))
  }

  // Add click event to element
  startButton.addEventListener('click', startQuiz);
  saveButton.addEventListener('click', saveInitials);