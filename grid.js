const main = document.body.appendChild(document.createElement("main"));

main.style.display = `grid`;
main.style.gridTemplateRows = `repeat(3, 1fr)`;
main.style.gridTemplateColumns = `repeat(3, 1fr)`;
main.style.width = "300px";
main.style.height = "300px";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function fetchIngredients() {
    const response = await fetch("ingredients.json");
    const ingredients = await response.json();
    return ingredients;
}

async function createGrid() {
    let ingredients = await fetchIngredients();

    ingredients = shuffle(ingredients).slice(0, 9);

    let index = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.style.border = `1px solid green`;
            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";
            div.style.fontSize = "14px";
            div.style.color = "white";
            div.style.backgroundSize = "cover";
            div.style.backgroundPosition = "center";
            div.style.backgroundColor = "Black";

            const ingredient = ingredients[index];
            div.textContent = ingredient.name;
            div.style.backgroundImage = `url(${ingredient.image})`;

            div.addEventListener("click", (event) => {
                if (ingredient.name === "Tomato") {
                    div.classList.add("Correct");
                    div.style.backgroundColor = `green`;
                } else {
                    div.style.backgroundColor = `red`;
                }
            });

            main.appendChild(div);
            index++;
        }
    }
}

createGrid();