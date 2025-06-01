import { createTopTen } from "../utilities.js";

let currentPlayer = null;

const livesBox = document.getElementById("livesBox");

(async () => {
  const response = await fetch("/getLoggedInUser");
  if (response.status === 200) {
    currentPlayer = await response.json();
    showCurrentPlayer();
    createChoices();
    createTopTen(currentPlayer);
  }
})();

const foodImageDiv = document.getElementById("foodImage");
const choicesBox = document.getElementById("choicesBox");
const showScore = document.getElementById("showScore");
const showCorrectGuess = document.getElementById("correctGuesses");
let correctGuesses = 0;
const allCorrect = 3;
let lives = 9;
let currentScore = 0;
showScore.innerHTML = `Your score: ${currentScore}`;

let triviaCounter = 0;
console.log(triviaCounter);

function showCurrentPlayer() {
  document.getElementById("usernameDisplay").textContent = `${currentPlayer.username}`;
}

async function createChoices() {


    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => data.meals[0]);


    const localIngredients = await fetch("../database/ingredients.json")
        .then(res => res.json());


    foodImageDiv.style.backgroundImage = `url("${meal.strMealThumb}")`;


    const realIngredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        if (ing && ing.trim()) {
            realIngredients.push(ing.toLowerCase());
        }
    }
    const selectedReal = getRandomItems(realIngredients, 3);


    const fakeIngredients = localIngredients.filter(
        item => !selectedReal.includes(item.name.toLowerCase())
    );
    const selectedFake = getRandomItems(fakeIngredients, 7);


    const allChoices = [
        ...selectedReal.map(name => ({
            name,
            image: `https://www.themealdb.com/images/ingredients/${name}.png`,
            isCorrect: true
        })),
        ...selectedFake.map(item => ({
            name: item.name,
            image: item.image,
            isCorrect: false
        }))
    ];


    shuffleArray(allChoices);
    renderChoices(allChoices, meal);
}


function getRandomItems(array, count) {
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

function renderChoices(choices, meal) {
    choicesBox.innerHTML = "";

    choices.forEach(choice => {
        const div = document.createElement("div");
        div.classList.add("choice");

        const text = document.createElement("p");
        text.textContent = choice.name;
        div.appendChild(text);

        if (choice.image) {
            div.style.backgroundImage = `url("${choice.image}")`;
            div.style.backgroundSize = "contain";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "center";
            div.style.flexDirection = "column";
        }

        div.addEventListener("click", () => handleChoiceClick(div, choice, meal));

        choicesBox.appendChild(div);
    });
}

async function handleChoiceClick(div, choice, meal) {
  if (div.classList.contains("clicked")) return;
  div.classList.add("clicked");

  if (choice.isCorrect) {
    div.style.backgroundColor = "lightGreen";
    correctGuesses++;
    showCorrectGuess.innerHTML = `Correct: ${correctGuesses}/3`;
    currentScore += 10;
    showScore.innerHTML = `Current score: ${currentScore}`;
    await fetch("http://localhost:8000/updateScore", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: currentScore }),
    });
    createTopTen(currentPlayer);

    if (correctGuesses === allCorrect) {
      document.getElementById("nextPopUp").style.display = "flex";
      document.getElementById("foodTitle").textContent = meal.strMeal;
      document.querySelector("#recipeBox p").textContent = meal.strInstructions;
      document.querySelector(
        "#nextPopUp h2"
      ).innerHTML = `Recipe for ${meal.strMeal}`;
      document.getElementById("nextButton").style.display = "block";

      foodTitle.style.display = "block";
    }
  } else {
    div.style.backgroundColor = "tomato";
    lives--;
    livesBox.innerHTML = `Lives left: ${lives}`;
    if (lives === 0 && triviaCounter === 0) {
      document.getElementById("triviaPopUp").style.display = "flex";
      quiz.loadQuestion();
      triviaCounter++;
    } else if (lives === 0 && triviaCounter === 1) {
      console.log(triviaCounter);
      window.location.href = "/gameOver";
    }
  }
}
const logOutButton = document.getElementById("logOutButton");

logOutButton.addEventListener("click", async () => {
  const response = await fetch("/logOutUser", {
    method: "POST",
  });
  if (response.status === 200) {
    alert("You logged out");
    window.location.href = "/home";
  } else {
    alert("Något gick fel vid utloggning.");
  }
});

document.getElementById("nextButton").addEventListener("click", () => {
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("nextPopUp").style.display = "none";

  foodTitle.style.display = "none";
  correctGuesses = 0;
  choicesBox.innerHTML = "";
  foodImageDiv.innerHTML = "";
  // recipeBox.innerHTML = "";
  showCorrectGuess.innerHTML = `Correct: ${correctGuesses}/3`;
  showCorrectGuess.style.display = "block";

  createChoices();
});

class FoodTriviaQuiz {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;

    this.questionText = document.getElementById("questionText");
    this.multipleAnswersBox = document.getElementById("multipleAnswersBox");
  }

  async loadQuestion() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();

      if (!data.length) {
        this.questionText.textContent = "No questions found.";
        return;
      }

      const randomQuestion = data[Math.floor(Math.random() * data.length)];
      this.display(randomQuestion);
    } catch (error) {
      console.error("Failed to fetch trivia question:", error);
      this.questionText.textContent = "Failed to load question.";
    }
  }

  display(questionObj) {
    const { question, correctAnswer, incorrectAnswers } = questionObj;

    this.questionText.innerHTML = this.decodeHTML(question);
    this.multipleAnswersBox.innerHTML = "";

    const allAnswers = [
      { answer: correctAnswer, isCorrect: true },
      ...incorrectAnswers.map((ans) => ({ answer: ans, isCorrect: false })),
    ];

    const shuffled = allAnswers.sort(() => Math.random() - 0.5);

    shuffled.forEach((choice) => {
      const div = document.createElement("div");
      div.classList.add("choiceTwo");

      const text = document.createElement("p");
      text.textContent = this.decodeHTML(choice.answer);
      div.appendChild(text);

      div.addEventListener("click", () =>
        this.handleClick(div, choice, correctAnswer)
      );
      this.multipleAnswersBox.appendChild(div);
    });
  }

  async handleClick(div, choice, correctAnswer) {
    if (div.classList.contains("clicked")) return;
    div.classList.add("clicked");

    const popUpText = document.getElementById("popUptext");

    if (choice.isCorrect) {
      div.style.backgroundColor = "lightGreen";
      popUpText.textContent = "Correct! +1 Extra life!";
      popUpText.style.backgroundColor = "lightGreen";
      lives++;
      livesBox.innerHTML = `Lives left: ${lives}`;
      popUpText.style.display = "block";

      setTimeout(() => {
        popUpText.style.display = "none";
        document.getElementById("triviaPopUp").style.display = "none";
        this.questionText.innerHTML = "";
        this.multipleAnswersBox.innerHTML = "";
      }, 3000);
    } else {
      div.style.backgroundColor = "tomato";
      popUpText.innerHTML = `Wrong! Correct answer: <span>${correctAnswer}</span>`;
      popUpText.style.backgroundColor = "tomato";

      try {
        await fetch("/updateScore", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: currentScore }),
        });
      } catch (error) {
        console.error("Score update failed:", error);
      }

      setTimeout(() => {
        popUpText.style.display = "none";
        document.getElementById("triviaPopUp").style.display = "none";
        this.questionText.innerHTML = "";
        this.multipleAnswersBox.innerHTML = "";
        window.location.href = "/gameOver";
      }, 3000);
    }

    popUpText.style.display = "block";
  }

  decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }
}

const apiUrl =
  "https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=10&difficulty=easy";
const quiz = new FoodTriviaQuiz(apiUrl);

setTimeout(() => {
  const adBox = document.getElementById("footerAdBox");
  if (adBox) {
    adBox.classList.add("show");
    console.log("Ad shown");
  } else {
    console.warn("AdBox not found");
  }
}, 10000);

document.getElementById("closeAdBox").addEventListener("click", () => {
  const adBox = document.getElementById("footerAdBox");
  console.log("Clicking");
  adBox.style.display = "none";
});

document.getElementById("howToPlayButton").addEventListener("click", () => {
  const howToPlayBox = document.getElementById("howToPlayBox");
  howToPlayBox.style.display = "block";
});

document.getElementById("closeHowToPlay").addEventListener("click", () => {
  document.getElementById("howToPlayBox").style.display = "none";
});
