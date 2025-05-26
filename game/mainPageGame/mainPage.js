import { createTopTen } from "../utilities.js";

let currentPlayer = null;

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
                    await fetch("http://localhost:8000/updateScore", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ score: currentScore })
                    });
                    window.location.href = "../gameOver"
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