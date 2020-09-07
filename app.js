const store = {
  questions: [
    { // Question 1
      question: 'Which National Park is this?',
      answers: [
        'Kings Canyon',
        'Zion',
        'Coral Sea',
        'Canyonlands',
        'Arches'
      ],
      correctAnswer: 'Zion'
    },
    { // Question 2
      question: 'Which National Park is this?',
      answers: [
        'Joshua Tree',
        'Petrfied Forest',
        'Bryce Canyon',
        'Big Bend'
      ],
      correctAnswer: 'Big Bend'
    },
    { // Question 3
      question: 'Which National Park is this?',
      answers: [
        'Grand Canyon',
        'Kings Canyon',
        'Great Basin',
        'Black Canyon of the Gunnison'
      ],
      correctAnswer: 'Grand Canyon'
    },
    { // Question 4
      question: 'Which National Park is this?',
      answers: [
        'Dry Tortugas',
        'Congaree',
        'Mesa Verde',
        'Saguaro'
      ],
      correctAnswer: 'Mesa Verde'
    },
    { // Question 5
      question: 'Which National Park is this?',
      answers: [
        'Yellowstone',
        'Yosemite',
        'Grand Teton',
        'Rocky Mountain'
      ],
      correctAnswer: 'Yosemite'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,

  currentQuestionState: {
    answerArray: []
  }
};

function welcomePage() {
  return `
    <form>
      <button type="submit"id="getStarted" autofocus>Get Started</button>
    </form>
    `;
}

function quizQuestions(questionObject) {
  return `
  <div class="quiz-interface">
    <p>Question ${questionObject.index} out of ${store.questions.length}</p>
    <p>${questionObject.question.question}</p>
    <form>
      <ol type="A">
        ${generateAnswersList(questionObject.question.answers)}
      </ol>
      <button type="submit" class="submitAnswer">Submit Answer</button>
    </form> 
    <p>Score: ${store.score}</p>
  </div>
  `
}

function generateAnswersList () {
  
}

function renderQuiz() {
  const welcomePageString = welcomePage();
  if (store.quizStarted === false) {
    $("main").html(welcomePageString);
  }
  else {
    const quizQuestionString = quizQuestions(currentQuestion());
    $('main').html(quizQuestionString);
  }
}

function startQuiz() {
  console.log('quiz has begun');
  store.quizStarted = true;
}

function handleStartQuiz() {
  $("main").on("click", "#submitAnswer", (event) =>{
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

  // This function will launch all other functions after the page is loaded
  function handleQuiz (){
    renderQuiz();
    handleStartQuiz();
    handleSubmitAnswer();
    handleNextQuestionSubmit();
    handleRestartQuizSubmit();
    handleSeeResultsSubmit();
  
  }
  
  $(handleQuiz);