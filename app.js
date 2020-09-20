const store = {
  questions: [
    { // Question 1
      question: 'Which National Park is this?',
      image: "zion.jpg",
      altImage: "zion2.jpg",
      answers: [
        'Kings Canyon',
        'Zion',
        'Bryce Canyon',
        'Canyonlands',
        'Arches'
      ],
      correctAnswer: 'Zion'
    },
    { // Question 2
      question: 'Which National Park is this?',
      image: "bigbend.jpg",
      altImage: "bigbend2.jpg",
      answers: [
        'Joshua Tree',
        'Petrfied Forest',
        'Bryce Canyon',
        'Big Bend',
        'Canyonlands'
      ],
      correctAnswer: 'Big Bend'
    },
    { // Question 3
      question: 'Which National Park is this?',
      image: "grandcanyon.jpg",
      altImage: "grandcanyon2.jpg",
      answers: [
        'Grand Canyon',
        'Kings Canyon',
        'Acadia',
        'Great Basin',
        'Black Canyon of the Gunnison'
      ],
      correctAnswer: 'Grand Canyon'
    },
    { // Question 4
      question: 'Which National Park is this?',
      image: "mesaverde.jpg",
      altImage: "mesaverde.jpg",
      answers: [
        'Dry Tortugas',
        'Congaree',
        'Joshua Tree',
        'Mesa Verde',
        'Saguaro'
      ],
      correctAnswer: 'Mesa Verde'
    },
    { // Question 5
      question: 'Which National Park is this?',
      image: "yosemite.jpg",
      altImage: "yosemite2.jpg",
      answers: [
        'Grand Teton',
        'Yellowstone',
        'Yosemite',
        'Glacier',
        'Rocky Mountain'
      ],
      correctAnswer: 'Yosemite'
    }
  ],
  quizStarted: false,
  submitAnswer: false,
  questionNumber: 0,
  score: 0,
};





// renderHeader associated functions

function renderHeader() {
  $("header").html(generateHeader());
}



function generateHeader() {
  return `
    <h1>National Parks Quiz</h1>
  `;
}



// handleStartQuiz associated functions

function startQuiz() {
  store.quizStarted = true;
}

function welcomePage() {
  return `
    <button type="submit"id="getStarted">Get started</button>
  `;
}



// handleSubmitAnswer associated functions

function submitAnswerButton() {
  return `
    <button type="submit"id="submitAnswer">Submit Answer</button>
  `;
}



// renderAnswer function and associated functions

function renderAnswer() {
  let radios = $('input:not(:checked)');
  for (let i = 0; i < radios.length; i++) {
    if (radios.length === 5) {
      alert('Please select an answer.');
      return;
    }
  }
  let answerVerify = verifyAnswer();
  let i = store.questionNumber;
  let answerCorrect = store.questions[i].correctAnswer;
  let answerText = "Sorry, that's incorrect";
  store.questionNumber += 1;
  if (answerVerify === answerCorrect) {
    store.score += 1;
    answerText = "That's correct!";
  }
  let response = nextQuestionButton(answerText, answerVerify, answerCorrect);
  return $("main").html(response);
}

function verifyAnswer() {
  let radios = $('input:radio[name=mltlpChoice]');
  let answersArrayList = answersArray();
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return answersArrayList[i];
    }
  }
}

function answersArray() {
  let i = store.questionNumber;
  let list = store.questions[i].answers;
  return list;
}

function nextQuestionButton(answerText, answerVerify, answerCorrect) {
  let totalQuestions = store.questions.length;
  let questionNumber = store.questionNumber;
  if (questionNumber === totalQuestions) {
    return `
      ${answerText}<p/>
      You selected: <strong>${answerVerify}</strong><p/>
      The correct answer is: <strong>${answerCorrect}</strong><p/>
      ${currentScore()}<p/>
      <button type="submit"id="finalResults">Final Results</button>
    `;
  }
  return `
    ${answerText}<p/>
    You selected: <strong>${answerVerify}</strong><p/>
    The correct answer is: <strong>${answerCorrect}</strong><p/>
    ${currentScore()}<p/>
    <button type="submit"id="nextQuestion">Next Question</button>
  `;
}



// Score and question tracker

function currentScore() {
  let questionNumber = store.questionNumber;
  let correctScore = store.score;
  let incorrectScore = (questionNumber - correctScore);
  return `
    <p>Score: ${correctScore} correct, ${incorrectScore} incorrect</p>
  `;
}

function currentQuestion() {
  let questionNumber = store.questionNumber + 1;
  let total = store.questions.length;
  return `
    <p>Question ${questionNumber} out of ${total}</p>
  `
}



// handleFinalAnswer associated functions

function renderFinalResultsPage() {
  let finalScore = store.score;
  let total = store.questionNumber;
  let response = newQuizButton(finalScore, total);
  return $("main").html(response);
}


function newQuizButton(finalScore, total) {
  return `
    <p>You answered ${finalScore} out of ${total} questions correct</p>
    <button type="submit"id="newQuiz">Start a new quiz</button>
  `;
}



// renderQuiz and associated functions

function renderQuiz() {
  if(store.quizStarted === false) {
    renderWelcome();
  }
  if(store.quizStarted === true) {
    renderQuestion();
  }
}

function renderWelcome() {
  const welcome = welcomePage();
  $("main").html(welcome);
}

function renderQuestion() {
  const list = generateQuestion();
  $("main").html(list);
}

function generateQuestion() {
  let ulList = generateLiTags();
  return `
    <div class="group">
      <div class="item">
        ${renderImage()}
      </div>
      <div class="item">
        <form name="answerForm">
          <div class="addQuestions">
            ${addQuestions()}
          </div>
          <ul>  
            ${ulList}
            <li>${submitAnswerButton()}</li>
          </ul>
        </form>
        
      </div>
    </div>
    <ul class="questionAndScore">
      <li class="questionScoreItems">${currentQuestion()}</li>
      <li class="questionScoreItems">${currentScore()}</li>
    </ul>
  `;
}

function generateLiTags() {
  let answersArrayList = answersArray()
  let liList = [];
  for (let n = 0; n < answersArrayList.length; n++) {
    console.log(answersArrayList[n]);
    liList += `<li> <input type="radio" name="mltlpChoice" id="answer-${n}" value="${answersArrayList[n]}"/><label for="answer-${n}">${answersArrayList[n]}</label></li>`
    }
  return liList;
}

function renderImage() {
  let i = store.questionNumber;
  let picture = store.questions[i].image;
  let altPicture = store.questions[i].altImage;
  return `
    <img src="images/${picture}" alt="${altPicture}" class="image"/>
  `;
}

function addQuestions() {
  let i = store.questionNumber;
  let questions = store.questions[i].question;
  return `
    <li>${questions}</li>
  `;
}



// Handle functions

function handleStartQuiz() {
  $("main").on("click", "#getStarted", (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $("main").on("click", "#submitAnswer", (event) => {
    event.preventDefault();
    renderAnswer();
  });
}

function handleNextQuestion() {
  $("main").on("click", "#nextQuestion", (event) => {
    event.preventDefault();
    return renderQuiz();
  })
}

function handleFinalResults() {
  $("main").on("click", "#finalResults", (event) => {
    event.preventDefault();
    renderFinalResultsPage();
  });
}

function handleNewQuiz() {
  $("main").on("click", "#newQuiz", (event) => {
    event.preventDefault();
    store.quizStarted = false;
    store.submitAnswer = false;
    store.questionNumber = 0;
    store.score = 0;
    renderWelcome();
  });
}



// Functions initiated

function handleQuiz() {
  renderHeader();
  renderQuiz();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleFinalResults();
  handleNewQuiz();
}



//Initiating function

$(handleQuiz);
