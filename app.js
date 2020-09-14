const store = {
  questions: [
    { // Question 1
      question: 'Which National Park is this?',
      image: "zion.jpg",
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
      answers: [
        'Grand Teton',
        'Yellowstone',
        'Yosemite',
        'Grand Teton',
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

function welcomePage() {
  return `
    <button type="submit"id="getStarted">Get started</button>
  `;
}

function renderWelcome() {
  const welcome = welcomePage();
  $("main").html(welcome);
}

function answersArray() {
  let i = store.questionNumber;
  let list = store.questions[i].answers;
  return list;
}

function submitAnswerButton() {
  return `
    <button type="submit"id="submitAnswer">Submit Answer</button>
  `;
}

function renderImage() {
  let i = store.questionNumber;
  let picture = store.questions[i].image;
  return `
    <img src="images/${picture}" class="image"/>
  `;
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
          <ul>
            ${ulList}
            <li>${submitAnswerButton()}</li>
          </ul>
        </form>
      </div>
    </div>
  `;
}

function renderQuestion() {
  const list = generateQuestion();
  $("main").html(list);
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

function renderQuiz() {
  if(store.quizStarted === false) {
    renderWelcome();
  }
  if(store.quizStarted === true) {
    if (store.submitAnswer === false) {
      renderQuestion();
    }
  }
}

function nextQuestion() {
  store.submitAnswer = true;
}

function startQuiz() {
  store.quizStarted = true;
}
 
function handleStartQuiz() {
  $("main").on("click", "#getStarted", (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
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

function nextQuestionButton() {
  return `
    <button type="submit"id="nextQuestion">Next Question</button>
  `;
}

function generateVerifyAnswer() {
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
  let correct = "That's correct!";
  let incorrect = "Sorry, that's incorrect";
  if (answerVerify === answerCorrect) {
    return $("main").html(correct);
  }
  return $("main").html(incorrect);
}





function handleSubmitAnswer() {
  $("main").on("click", "#submitAnswer", (event) => {
    event.preventDefault();
    generateVerifyAnswer();
  });
}


function handleQuiz() {
  renderQuiz();
  handleStartQuiz();
  handleSubmitAnswer();
}

$(handleQuiz);