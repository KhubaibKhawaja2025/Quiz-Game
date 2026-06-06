let quizQuestions = [
  {
    question: "What is the capital of france?",
    answers: [
      { answer: "Riyadh", correct: false },
      { answer: "Paris", correct: true },
      { answer: "Madrid", correct: false },
      { answer: "Islamabad", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in the Solar system?",
    answers: [
      { answer: "Mars", correct: false },
      { answer: "Earth", correct: false },
      { answer: "Jupiter", correct: true },
      { answer: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the periodic symbol for gold?",
    answers: [
      { answer: "Na", correct: false },
      { answer: "Xe", correct: false },
      { answer: "Cu", correct: false },
      { answer: "Au", correct: true },
    ],
  },
  {
    question: "Which one of these is not a programming language",
    answers: [
      { answer: "HTML", correct: true },
      { answer: "Python", correct: false },
      { answer: "Javascript", correct: false },
      { answer: "Java", correct: false },
    ],
  },
  {
    question: "Which nation is the company mclearn from?",
    answers: [
      { answer: "USA", correct: false },
      { answer: "UK", correct: true },
      { answer: "Spain", correct: false },
      { answer: "France", correct: false },
    ],
  },
];
let questionsContainer = document.getElementById("questions");
let startScreenBtn = document.getElementById("start-quiz-btn");
let firstQuestionContainer = document.getElementById(
  "first-question-container",
);
let startScreenContainer = document.getElementById("start-screen-container");
let answersContainer = document.getElementById("answers-container");
let answer = document.getElementById("answer");
let firstQuestion = document.getElementById("first-question");
let currentQuestion = document.getElementById("current-question");
let maxQuestion = document.getElementById("max-questions");
let scoreText = document.getElementById("score");
let progressBar = document.getElementById("progress-bar");
let resultText = document.getElementById("result-text");
let endResults = document.getElementById("end-result");
let restartBtn = document.getElementById("restart-btn");
let currentIndex = 0;
let score = 0;
let audio = new Audio();
startScreenBtn.addEventListener("click", () => {
  startScreenContainer.classList.toggle("remove");
  endResults.classList.toggle("remove");
  firstQuestionContainer.classList.toggle("remove");
});
function displayText() {
  answersContainer.querySelectorAll(".answer").forEach((btn) => {
    btn.disabled = false;
  });
  let questionIndex = quizQuestions[currentIndex].question;
  firstQuestion.textContent = questionIndex;
  // Current Question.
  currentQuestion.textContent = currentIndex + 1;
  // Max Questions
  maxQuestion.textContent = quizQuestions.length;
  // Displaying score
  scoreText.textContent = score;
  answersContainer.querySelectorAll(".answer").forEach((ans, index) => {
    let answerIndex = quizQuestions[currentIndex].answers; // array of all the answers in the first question.
    ans.textContent = answerIndex[index].answer;
    // console.log(ans);
    ans.classList.remove("correct");
    ans.classList.remove("false");
    let freshButton = ans.cloneNode(true);
    ans.parentNode.replaceChild(freshButton, ans);
    freshButton.addEventListener("click", () => {
      console.log(currentIndex);
      console.log(answersContainer.querySelectorAll(".answer"));
      answersContainer.querySelectorAll(".answer").forEach((button) => {
        button.disabled = true;
      });
      if (answerIndex[index].correct === false) {
        freshButton.classList.add("false");
        audio.src = "assets/sounds/answer-wrong.mp3";
        audio.play();
      } else if (answerIndex[index].correct === true) {
        audio.src = "assets/sounds/duolingo-correct.mp3";
        audio.play();
        freshButton.classList.add("correct");
        console.log(freshButton.classList);
        score++;
        scoreText.textContent = score;
      }
      currentIndex++;
      setTimeout(() => {
        currentQuestion.textContent = currentIndex + 1;
        if (currentIndex < quizQuestions.length) {
          questionIndex = quizQuestions[currentIndex].question;
          firstQuestion.textContent = questionIndex;
          displayText();
        } else {
          resultScreen();
        }
      }, 1000);
      let progressPercent = (currentIndex / quizQuestions.length) * 100;
      progressBar.style.width = progressPercent + "%";
      console.log(progressPercent);
    });
  });
}
displayText();
function resultScreen() {
  firstQuestionContainer.classList.toggle("remove");
  endResults.classList.toggle("hide");
  if (score === 1) {
    resultText.textContent = "Keep Learning, You Will Get Better";
  } else if (score === 2) {
    resultText.textContent = "Good Try! Try a bit more.";
  } else if (score === 3) {
    resultText.textContent = "Great Effort! You Are Close.";
  } else if (score === 4) {
    resultText.textContent = "Amazing! You tried very well, nice";
  } else {
    resultText.textContent = "Your A Genius! You Nailed It, Well Done";
  }
}
restartBtn.addEventListener("click", () => {
  startScreenContainer.classList.toggle("remove");
  endResults.classList.toggle("hide");
  currentIndex = 0;
  score = 0;
  progressBar.style.width = "0%";
  displayText();
});
