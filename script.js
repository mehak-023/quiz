// Select HTML elements by their IDs and assign them to variables
const elements = {
    questionContainer: document.getElementById("question-container"),
    questionElement: document.getElementById("question"),
    answerButtons: document.getElementById("answer-buttons"),
    nextButton: document.getElementById("next-btn"),
    restartButton: document.getElementById("restart-btn"),
    resultDiv: document.getElementById("result"),
};

// Array of quiz questions and answers
const questions = [
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "url", correct: false },
        ],
    },
    {
        question: "What does the <img> tag in HTML do?",
        answers: [
            { text: "It displays an image on the page", correct: true },
            { text: "It links to another webpage.", correct: false },
            { text: "It creates a form.", correct: false },
            { text: "It adds a video.", correct: false },
        ],
    },
    {
        question: "Which of the following is a valid HTML5 doctype declaration?",
        answers: [
            { text: "<!DOCTYPE html>", correct: true },
            { text: "<!DOCTYPE HTML5>", correct: false },
            { text: "<!DOCTYPE document>", correct: false },
            { text: "<!DOCTYPE website>", correct: false },
        ],
    },
    {
        question: "Which property is used to change the text color in CSS?",
        answers: [
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "text-color", correct: false },
            { text: "background-color", correct: false },
        ],
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        answers: [
            { text: "background", correct: true },
            { text: "bgcolor", correct: false },
            { text: "color", correct: false },
            { text: "background-image", correct: false },
        ],
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
        ],
    },
    {
        question: "Which class provides a container that spans the entire width of the viewport in Bootstrap?",
        answers: [
            { text: ".container-fluid", correct: true },
            { text: ".container", correct: false },
            { text: ".row", correct: false },
            { text: ".col", correct: false },
        ],
    },
    {
        question: "What does the .btn-primary class do in Bootstrap?",
        answers: [
            { text: "It creates a blue button", correct: true },
            { text: "It creates a large button.", correct: false },
            { text: "It creates a small button.", correct: false },
            { text: "It creates a red button.", correct: false },
        ],
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "int", correct: false },
        ],
    },
    {
        question: "Which of the following is used to add comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "<!-- -->", correct: false },
            { text: "##", correct: false },
            { text: "**", correct: false },
        ],
    },
    
];

let shuffledQuestions, currentQuestionIndex, score;


startQuiz();

function startQuiz() {
    score = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    toggleVisibility(elements.questionContainer, true);
    toggleVisibility(elements.nextButton, true);
    toggleVisibility(elements.restartButton, false);
    toggleVisibility(elements.resultDiv, false);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    elements.questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const inputGroup = createAnswerOption(answer.text, index);
        elements.answerButtons.appendChild(inputGroup);
    });
}

function createAnswerOption(text, index) {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = radio.id;
    label.innerText = text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    return inputGroup;
}

function resetState() {
    elements.answerButtons.innerHTML = '';
}

elements.nextButton.addEventListener("click", () => {
    const selectedAnswerIndex = getSelectedAnswerIndex();
    if (selectedAnswerIndex !== -1) {
        if (shuffledQuestions[currentQuestionIndex].answers[selectedAnswerIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert("You need to pick an answer.");
    }
});

elements.restartButton.addEventListener("click", startQuiz);

function getSelectedAnswerIndex() {
    const radios = elements.answerButtons.querySelectorAll("input[type='radio']");
    return Array.from(radios).findIndex(radio => radio.checked);
}

function endQuiz() {
    toggleVisibility(elements.questionContainer, false);
    toggleVisibility(elements.nextButton, false);
    toggleVisibility(elements.restartButton, true);
    toggleVisibility(elements.resultDiv, true);
    elements.resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}

function toggleVisibility(element, show) {
    element.style.display = show ? "flex" : "none";
}
