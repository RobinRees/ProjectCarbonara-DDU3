const username = document.querySelector("#username");
const password = document.querySelector("#password");
const startButton = document.querySelector("#startButton");
const signUp = document.querySelector("#signUp");
const createPassword = document.querySelector("#createPassword");
const createPlayer = document.querySelector("#createPlayer");
const helpButton = document.querySelector("#helpButton");
const littleLeft = document.querySelector("#littleLeft");

const rulesDiv = document.createElement("div");
rulesDiv.id = "rulesDiv"


let rulesText = document.createElement("p");
rulesText.id = "rulesText"
rulesText.textContent = "Här är reglerna för spelet:";


let cancelButton = document.createElement("button");
cancelButton.id = "cancelButton"
cancelButton.textContent = "X";


rulesDiv.appendChild(cancelButton);
rulesDiv.appendChild(rulesText);
littleLeft.appendChild(rulesDiv);

helpButton.addEventListener("click", () => {
    rulesDiv.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
    rulesDiv.style.display = "none";
});

startButton.addEventListener("click", logIn)

async function logIn() {
    console.log("skall addera user");

    let usernameInput = username.value
    let passwordInput = password.value

    if (usernameInput === "" || passwordInput === "") {
        Alert("Input field cannot be empty")
    } else {
        let request = new Request("http://localhost:8000/logIn")
        let myOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": usernameInput, "password": passwordInput })
        }

        let response = await fetch(request, myOpt)
        let checkSignUp = await response.json()

        if (response.status === 404) {
            alert(checkSignUp.error)
        }
       if (response.status === 200){
            window.location.href = "../mainPageGame/mainPage.html"
        }

    }
}


createPlayer.addEventListener("click", createNewProfile)

async function createNewProfile() {
    console.log("skall addera user");

    let usernameInput = signUp.value
    let passwordInput = createPassword.value

    if (usernameInput === "" || passwordInput === "") {
        Alert("Input field cannot be empty")
    } else {
        let request = new Request("http://localhost:8000/signUp")
        let myOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": usernameInput, "password": passwordInput })
        }

        let response = await fetch(request, myOpt)
        let checkSignUp = await response.json()

        if (response.status === 409) {
            alert(checkSignUp.error)
        }
        if (response.status === 200){
            window.location.href = "../mainPageGame/mainPage.html"
        }

    }
}