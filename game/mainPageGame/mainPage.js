import { createTopTen } from "../utilities.js";

let currentPlayer = null;

const livesBox = document.getElementById("livesBox");

(async () => {
    const response = await fetch("/getLoggedInUser", {
        method: "GET",
        headers: { "content-type": "application/json" }
    });
    if (response.status === 200) {
        currentPlayer = await response.json();
        console.log(currentPlayer);
    }
    createChoices();
    createTopTen(currentPlayer);

})();

const foodImageDiv = document.getElementById("foodImage");
const choicesBox = document.getElementById("choicesBox");
const showScore = document.getElementById("showScore");
const showCorrectGuess = document.getElementById("correctGuesses");
let correctGuesses = 0;
const allCorrect = 3;
let lives = 9;
let currentScore = 0;
showScore.innerHTML = `Current score: ${currentScore}`


async function createChoices() {
    document.getElementById("usernameDisplay").textContent = `Current player: ${currentPlayer.username}`;

    const currentMealData = await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json());
    const ingredientsData = await fetch("../database/ingredients.json").then(response => response.json());

    const meal = currentMealData.meals[0];

    const mealName = meal.strMeal;
    console.log(mealName)

    const mealRecipie = meal.strInstructions;

    const img = document.getElementById("foodImage");

    img.style.backgroundImage = `url("${meal.strMealThumb}")`
    img.style.backgroundRepeat = "no-repeat";
    img.style.backgroundSize = "cover";

    const ingredientsArray = [];
    for (let i = 1; i <= 20; i++) {
        let ingredientName = "strIngredient" + i;
        let ingredient = meal[ingredientName];

        if (ingredient && ingredient !== "") {
            ingredientsArray.push(ingredient)
        }
    }

    const selectedIngredients = getRandomItem(ingredientsArray, 3);

    const filteredIngredients = ingredientsData.filter(ingredients => !selectedIngredients.includes(ingredients.name))

    const selectedFakeIngredients = getRandomItem(filteredIngredients, 7);

    const allChoices = [
        ...selectedIngredients.map(name => ({
            name,
            image: `https://www.themealdb.com/images/ingredients/${name}.png`,
            isCorrect: true
        })),
        ...selectedFakeIngredients.map(item => ({
            name: item.name,
            image: item.image,
            isCorrect: false
        }))
    ];

    shuffleArray(allChoices);

    allChoices.forEach(choice => {
        const div = document.createElement("div");
        div.classList.add("choice");

        const text = document.createElement("p");
        text.textContent = choice.name;
        div.appendChild(text);

        if (choice.image) {
            div.style.backgroundImage = `url("${choice.image}")`
            div.style.backgroundSize = "contain";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "center";
            div.style.flexDirection = "column";

        }

        div.addEventListener("click", async () => {
            if (div.classList.contains("clicked")) return;
            div.classList.add("clicked");

            if (choice.isCorrect) {
                div.style.backgroundColor = "lightGreen"

                correctGuesses++;
                showCorrectGuess.innerHTML = `Correct: ${correctGuesses}/3`

                currentScore = currentScore + 10;
                showScore.innerHTML = `Current score: ${currentScore}`
                if (correctGuesses === allCorrect) {
                    document.getElementById("nextButton").style.display = "block";
                    document.getElementById("foodTitle").textContent = mealName;
                    document.getElementById("recipeBox").innerHTML = `<p>${mealRecipie}</p>`;
                    foodTitle.style.display = "block"
                    showCorrectGuess.style.display = "none";


                }
            } else {
                div.style.backgroundColor = "tomato"
                lives--
                livesBox.innerHTML = `Lives left: ${lives}`;
                if (lives === 0) {
                    createTriviaQuestion()
                }
            }
        });

        choicesBox.appendChild(div);
    })

}


function getRandomItem(array, count) {
    const result = [];
    while (result.length < count) {
        const item = array[Math.floor(Math.random() * array.length)];
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.getElementById("nextButton").addEventListener("click", () => {
    document.getElementById("nextButton").style.display = "none";
    foodTitle.style.display = "none";
    correctGuesses = 0;
    choicesBox.innerHTML = "";
    foodImageDiv.innerHTML = "";
    recipeBox.innerHTML = "";
    showCorrectGuess.innerHTML = `Correct: ${correctGuesses}/3`

    showCorrectGuess.style.display = "block";

    createChoices();
});


const logOutButton = document.getElementById("logOutButton")

logOutButton.addEventListener("click", async () => {

    const response = await fetch("/logOutUser", {
        method: "POST"
    });

    if (response.status === 200) {
        alert("You logged out");

        window.location.href = "/home";
    } else {
        alert("Något gick fel vid utloggning.");
    }
})


const leaderboardButton = document.getElementById("leaderboardNav");
const leaderboard = document.getElementById("leaderboard-container");

leaderboardButton.addEventListener("click", () => {
    leaderboard.style.display = "block";
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    leaderboard.style.display = "none";
});

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
    document.getElementById("multipleAnswersBox").innerHTML = "";


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
        div.classList.add("choiceTwo");

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