const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
let currentQuestionIndex = 0;
let questions = [];
let totalCorrect = 0; // Variável para armazenar o número total de respostas corretas

// Carregar o JSON com as perguntas e respostas
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion(questions[currentQuestionIndex]);
    });

function showQuestion(question) {
    questionElement.innerHTML = "<p class='text-center text-wrap fs-5 text-info'>" + question.word + "</p>"; // Exibir a palavra em português
    optionsElement.innerHTML = ''; // Limpar as opções

    // Adicionar as opções
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(button, option, question.correctAnswer));
        button.classList.add('btn', 'btn-primary', 'mx-1'); // Adicionar classe Bootstrap padrão
        optionsElement.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        totalCorrect++; // Incrementar o número total de respostas corretas
    } else {
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
        // Destacar a resposta correta
        optionsElement.querySelectorAll('button').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
            }
        });
    }

    // Exibir botão de próxima pergunta após um curto período
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            alert(`Parabéns, você completou o quiz! O total de acertos foram ${totalCorrect}/${questions.length}`);
        }
    }, 1000);
}

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalCorrect = 0;
    showQuestion(questions[currentQuestionIndex]);
});
