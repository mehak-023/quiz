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
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false },
            { text: "222", correct: false },
            { text: "2222", correct: false },
        ],
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "HyperText Machine Language", correct: false },
            { text: "HighText Markup Language", correct: false },
        ],
    },
    // Add more questions as needed...
];

let shuffledQuestions, currentQuestionIndex, score;

// Start the quiz
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
