function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


async function createTriviaQuestion() {
    const questionBox = document.getElementById("questionBox")
    questionBox.style.display = "flex";
    const response = await fetch("https://opentdb.com/api.php?amount=1");
    const data = await response.json();

    const questionData = data.results[0];
    const question = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;


    const allAnswers = [
        {
            answer: correctAnswer,
            isCorrect: true
        },
        ...incorrectAnswers.map(answer => ({
            answer: answer,
            isCorrect: false
        }))
    ];

    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    const questionText = document.getElementById("questionText");
    questionText.textContent = decodeHTML(question);

    shuffledAnswers.forEach(choice => {
        const multipleAnswersBox = document.getElementById("multipleAnswersBox")
        const div = document.createElement("div");
        div.classList.add("choice");

        const text = document.createElement("p");
        text.textContent = decodeHTML(choice.answer);
        div.appendChild(text);
        multipleAnswersBox.appendChild(div);

        div.addEventListener("click", async () => {
            div.classList.add("clicked");

            if (choice.isCorrect) {
                div.style.backgroundColor = "lightGreen";
                const winText = document.getElementById("winText");
                winText.style.display = "block";
                // Life + 1;

                setTimeout(() => {
                    questionBox.style.display = "none";
                    winText.style.display = "none";
                }, 2000)
                
            } else {
                div.style.backgroundColor = "tomato";
                const spanText = document.getElementById("correctAnswer");
                spanText.textContent = `correct answer was: ${correctAnswer}`;
                const loseText = document.getElementById("lostText");
                loseText.style.display = "block";

                setTimeout(() => {
                    window.location.href = "/gameOver";
                }, 2000)
                // redirect - Loosescreen timer? 
            }
        })
    })
}

createTriviaQuestion()