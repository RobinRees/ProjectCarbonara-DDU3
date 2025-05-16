const main = document.body.appendChild(document.createElement("main"));
main.style.display = "flex";
main.style.flexDirection = "column";
main.style.alignItems = "center";
main.style.justifyContent = "center";
main.style.gap = "10px";

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

startButton.addEventListener("click", addUser)

async function addUser() {
    console.log("skall addera user");

    let usernameInput = username.value
    let passwordInput = password.value

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
        console.log("We did it")

    }
}