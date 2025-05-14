const main = document.querySelector("main");

function test1() {
    return fetch("http://localhost:8000/carbonaraGame")
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

test1()