// import { logInUser } from "../utilities.js";

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const startButton = document.querySelector("#startButton");
const signUp = document.querySelector("#signUp");
const createPassword = document.querySelector("#createPassword");
const createPlayer = document.querySelector("#createPlayer");
const logInDiv = document.querySelector("#logInDiv");
const signInDiv = document.querySelector("#signInDiv");

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

        if (response.status === 403) {
            alert("Username or password is incorrect")
        }

        if (response.status === 200) {
            console.log("Seccessful login");
            window.location.href = "/game"

            if (response.status === 200) {
                console.log("Login success", loggedInUser);
                window.location.href = "/game"
            }
        }
    }
}

async function createNewProfile() {
    let usernameInput = signUp.value
    let passwordInput = createPassword.value

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
    if (response.status === 400) {
        alert(newUser.error)
    }
    if (response.status === 200) {
        window.location.href = "/game"
    }
}

startButton.addEventListener("click", logIn)
createPlayer.addEventListener("click", createNewProfile)

logInDiv.style.display = "flex";
signInDiv.style.display = "none";

const goToSignUp = document.querySelector("#goToSignUp");
const goToLogin = document.querySelector("#goToLogin");

goToSignUp.addEventListener("click", () => {
    logInDiv.style.display = "none";
    signInDiv.style.display = "flex";
});

goToLogin.addEventListener("click", () => {
    logInDiv.style.display = "flex";
    signInDiv.style.display = "none";
});

if (window.location.pathname === "/") {
    window.history.replaceState(null, "", "/home");
}