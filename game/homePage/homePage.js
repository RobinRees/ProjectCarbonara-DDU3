import { logInUser } from "../utilities.js";

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

headerDivLeft.addEventListener("click", () =>{
    logInDiv.style.display = "flex"
    signInDiv.style.display = "none"
})

headerDivRight.addEventListener("click", ()=>{
    logInDiv.style.display = "none"
    signInDiv.style.display = "flex"
})

/*
.addEventListener("click", ()=>{
    logInDiv.style.display = "none"
    signInDiv.style.display = "none"
})
    */

async function logIn() {

    console.log("skall addera user");

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
        console.log(loggedInUser);

        console.log(response.status);


        if (response.status === 404) {
            alert("User not found")
        }
        if (response.status === 200) {
            console.log("Seccessful login");
            window.location.href = "/game"

        }
    }
}

async function createNewProfile() {
    console.log("skall addera user");

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
            console.log("anropar logInUser");

            window.location.href = "/game"
        }

    }
}

startButton.addEventListener("click", logIn)
createPlayer.addEventListener("click", createNewProfile)

if (window.location.pathname === "/") {
    window.history.replaceState(null, "", "/home");
}