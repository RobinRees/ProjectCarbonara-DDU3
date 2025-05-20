const main = document.body.appendChild(document.createElement("main"));

let username = main.appendChild(document.createElement("input"));
username.placeholder = "Username"

let password = main.appendChild(document.createElement("input"));
password.placeholder = "Password"

let startButton = main.appendChild(document.createElement("button"));
startButton.id = "startButton";
startButton.type = "button"
startButton.textContent = "Start";


let helpButton = main.appendChild(document.createElement("button"));
helpButton.id = "helpHowToPlay";
helpButton.textContent = "Help";


let rulesDiv = document.createElement("div");
rulesDiv.id = "rulesDiv"
rulesDiv.style.display = "none";
rulesDiv.style.flexDirection = "column";
rulesDiv.style.height = "150px";
rulesDiv.style.width = "300px";
rulesDiv.style.background = "lightgreen";
rulesDiv.style.justifyContent = "space-between";
rulesDiv.style.alignItems = "center";
rulesDiv.style.padding = "10px";
rulesDiv.style.position = "relative";
rulesDiv.style.border = "2px solid green";


let rulesText = document.createElement("p");
rulesText.textContent = "Här är reglerna för spelet:";
rulesText.style.margin = "0";


let cancelButton = document.createElement("button");
cancelButton.textContent = "X";
cancelButton.style.position = "absolute";
cancelButton.style.top = "5px";
cancelButton.style.right = "5px";

rulesDiv.appendChild(cancelButton);
rulesDiv.appendChild(rulesText);

main.appendChild(rulesDiv);

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

let signUp = main.appendChild(document.createElement("input"));
signUp.placeholder = "Sign Up"

let createPassword = main.appendChild(document.createElement("input"));
createPassword.placeholder = "Create Password"

let createPlayer = main.appendChild(document.createElement("button"));
createPlayer.id = "createPlayer";
createPlayer.type = "button"
createPlayer.textContent = "Create and start Playing";


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