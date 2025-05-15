const main = document.querySelector("main");
const test1BTN = document.getElementById("test1")
const test2BTN = document.getElementById("test2")
const test3BTN = document.getElementById("test3")
const test4BTN = document.getElementById("test4")
const test5BTN = document.getElementById("test5")


function test1() {
    return fetch("http://localhost:8000/carbonaraGame", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            const createDivOne = document.createElement("div");
            createDivOne.textContent = `Status: ${response.status}`;
            main.appendChild(createDivOne);
            return response.json();
        })
        .then(data => {
            const createDivTwo = document.createElement("div");
            createDivTwo.textContent = `Data: ${JSON.stringify(data)}`;
            main.appendChild(createDivTwo);
        })
        .catch(error => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = `Fel: ${error.message}`;
            main.appendChild(errorDiv);
        });
}



function test2() {
    return fetch("http://localhost:8000/completedGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "mordor", score: 33 })
    })
        .then(response => {
            const createDivOne = document.createElement("div");
            createDivOne.textContent = `Status: ${response.status}`;
            main.appendChild(createDivOne);
            return response.json();
        })
        .then(data => {
            const createDivTwo = document.createElement("div");
            createDivTwo.textContent = `Data: ${JSON.stringify(data)}`;
            main.appendChild(createDivTwo);
        })
        .catch(error => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = `Fel: ${error.message}`;
            main.appendChild(errorDiv);
        });
}

function test3() {
    return fetch("http://localhost:8000/completedGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "dragonslayer", score: 2 })
    })
        .then(response => {
            const createDivOne = document.createElement("div");
            createDivOne.textContent = `Status: ${response.status}`;
            main.appendChild(createDivOne);
            return response.json();
        })
        .then(data => {
            const createDivTwo = document.createElement("div");
            createDivTwo.textContent = `Data: ${JSON.stringify(data)}`;
            main.appendChild(createDivTwo);
        })
        .catch(error => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = `Fel: ${error.message}`;
            main.appendChild(errorDiv);
        });
}

function test4() {
    return fetch("http://localhost:8000/completedGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "mordor", score: 50 })
    })
        .then(response => {
            const createDivOne = document.createElement("div");
            createDivOne.textContent = `Status: ${response.status}`;
            main.appendChild(createDivOne);
            return response.json();
        })
        .then(data => {
            const createDivTwo = document.createElement("div");
            createDivTwo.textContent = `Data: ${JSON.stringify(data)}`;
            main.appendChild(createDivTwo);
        })
        .catch(error => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = `Fel: ${error.message}`;
            main.appendChild(errorDiv);
        });
}
function test5() {
    return fetch("http://localhost:8000/completedGame", {
        method: "POST",
        headers: {
            "Content-Type": "html/text"
        },
        body: JSON.stringify({ username: "mordor", score: 50 })
    })
        .then(response => {
            const createDivOne = document.createElement("div");
            createDivOne.textContent = `Status: ${response.status}`;
            main.appendChild(createDivOne);
            return response.json();
        })
        .then(data => {
            const createDivTwo = document.createElement("div");
            createDivTwo.textContent = `Data: ${JSON.stringify(data)}`;
            main.appendChild(createDivTwo);
        })
        .catch(error => {
            const errorDiv = document.createElement("div");
            errorDiv.textContent = `Fel: ${error.message}`;
            main.appendChild(errorDiv);
        });
}





test1BTN.addEventListener("click", test1);
test2BTN.addEventListener("click", test2);
test3BTN.addEventListener("click", test3);
test4BTN.addEventListener("click", test4);
test5BTN.addEventListener("click", test5);