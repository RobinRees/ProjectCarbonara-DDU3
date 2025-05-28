// import { logInUser } from "../utilities.js";

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const startButton = document.querySelector("#startButton");
const signUp = document.querySelector("#signUp");
const createPassword = document.querySelector("#createPassword");
const createPlayer = document.querySelector("#createPlayer");
const headerDivLeft = document.querySelector("#headerDivLeft");
const logInDiv = document.querySelector("#logInDiv");
const headerDivRight = document.querySelector("#headerDivRight");
const signInDiv = document.querySelector("#signInDiv");

headerDivLeft.addEventListener("click", () => {
    logInDiv.style.display = "flex"
    signInDiv.style.display = "none"
})

headerDivRight.addEventListener("click", () => {
    logInDiv.style.display = "none"
    signInDiv.style.display = "flex"
})

// LOGIN
async function logIn() {
    let usernameInput = username.value
    let passwordInput = password.value

    if (usernameInput === "" || passwordInput === "") {
        Alert("Input field cannot be empty")
    } else {
        let request = new Request("/logIn")
        let myOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": usernameInput, "password": passwordInput })
        }

        let response = await fetch(request, myOpt)
        let loggedInUser = await response.json()
        console.log(loggedInUser, "rad44");

        if (response.status === 401) {
            alert(loggedInUser.error)
        }
        if (response.status === 404) {
            alert(loggedInUser.error)
        }

        if (response.status === 200) {
            console.log("Login success", loggedInUser);
            window.location.href = "/game"
        }
    }
}

async function createNewProfile() {
    let usernameInput = signUp.value
    let passwordInput = createPassword.value

    if (usernameInput === "" || passwordInput === "") {
        Alert("Input field cannot be empty")
    } else {
        let request = new Request("/signUp")
        let myOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": usernameInput, "password": passwordInput })
        }

        let response = await fetch(request, myOpt)
        let newUser = await response.json()

        if (response.status === 409) {
            alert(newUser.error)
        }
        if (response.status === 200) {

            window.location.href = "/game"
        }

    }
}

startButton.addEventListener("click", logIn)
createPlayer.addEventListener("click", createNewProfile)

if (window.location.pathname === "/") {
    window.history.replaceState(null, "", "/home");
}