const main = document.querySelector("main");

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
            "Content-Type" : "application/json"
        },
        body : JSON.stringify( { name: "mordor" } )
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

test1()
test2()