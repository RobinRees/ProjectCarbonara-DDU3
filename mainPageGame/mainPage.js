import { createOptions } from "../utilities.js";

const foodImageDiv = document.getElementById("foodImage");
const choicesBox = document.getElementById("choicesBox");
let correctGuesses = 0;
const allCorrect = 3;
let lives = 9;

console.log(lives);

async function createChoices() {
    const currentMealData = await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(response => response.json());
    const ingredientsData = await fetch("/database/ingredients.json", createOptions()).then(response => response.json());

    const meal = currentMealData.meals[0];

    const mealName = meal.strMeal;
    console.log(mealName)

    const mealRecipie = meal.strInstructions;

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    console.log(meal.strMealThumb);

    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    foodImageDiv.appendChild(img);


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

    const selectedFakeIngredients = getRandomItem(filteredIngredients, 6);

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
            div.style.backgroundSize = "cover";
            div.style.backgroundRepeat = "no-repeat";
            // const img = document.createElement("img");
            img.src = choice.image;
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.marginTop = "5px"
            div.appendChild(img);
            div.style.flexDirection = "column";
        }

        div.addEventListener("click", () => {
            if (div.classList.contains("clicked")) return;
            div.classList.add("clicked");

            if (choice.isCorrect) {
                div.style.border = "3px solid lightGreen";
                div.style.backgroundColor = "lightGreen"

                correctGuesses++;
                if (correctGuesses === allCorrect) {
                    document.getElementById("nextButton").style.display = "block";
                    document.getElementById("foodTitle").textContent = mealName;
                    document.getElementById("recepieBox").innerHTML = `<h2>Insructions for ${mealName}</h2>
                    <br>
                    <p>${mealRecipie}</p>
                    `;
                    foodTitle.style.display = "block"

                }
            } else {
                div.style.border = "3px solid tomato";
                div.style.backgroundColor = "tomato"
                lives--
                livesBox.innerHTML = `Life left: ${lives}`;
                if (lives === 0) {
                    looseScreen.style.display = "flex"; //Detta är loose screen, kanske en endpoint istället
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
    recepieBox.innerHTML = "";
    createChoices();
});


createChoices()