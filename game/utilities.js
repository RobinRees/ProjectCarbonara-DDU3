


export function createOptions(status = 200) {
    return {
        status: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    };
}

export function checkContentType(contentType) {
    return contentType === "application/json"
}


export class User {
    constructor(data) {
        const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");
        let scoreboard = JSON.parse(JSONscoreboard);


        if (typeof data.username !== "string") {
            alert("Username must be at least 3 characters")
        }
        this.username = data.username
        this.password = data.password
        this.score = 0;
        this.loggedIn = false;
        const ids = scoreboard.map(user => user.id)
        if (ids.length === 0) {
            this.id = 1
        } else {
            this.id = Math.max(...ids) + 1
        }
    }
}

export async function createNewUser(userData) {

    const newUser = new User(userData);
    console.log(newUser, "rad 43");

    const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");

    let scoreboard = JSON.parse(JSONscoreboard);

    const nameTaken = scoreboard.some(x => x.username === newUser.username) // Kollar om 1 användre redan har det namnet, true elelr false

    if (nameTaken) {
        console.log("Username already exists");
        return { nameTaken: "Username already exists" }
    } else {
        scoreboard.push(newUser)
        Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(scoreboard, null, 2))
        return { addedUser: newUser };

    }
}

export async function checkUserCredentials(loginData) {
    const JSONusers = Deno.readTextFileSync("database/scoreboard.json");
    let users = JSON.parse(JSONusers);
    console.log(users);

    return users.some(x => {
        return x.username === loginData.username &&
            x.password === loginData.password
    });
}

export async function retrieveUserByName(loginData) {
    console.log(loginData, "rad 72 utilities");
    console.log(loginData.username);

    const JSONusers = Deno.readTextFileSync("database/scoreboard.json");
    let users = JSON.parse(JSONusers);
    return users.find(x => x.username === loginData.username);
}



export async function updateUserScore(newScore) {
    const users = JSON.parse(Deno.readTextFileSync("database/scoreboard.json"))
    console.log(newScore, "rad 86");

    const user = users.find(u => u.loggedIn == true);
    console.log(user, "rad 89");


    if (newScore > user.score) {
        user.score = Number(newScore);
    } else {
        user.roundScore = newScore;
    }

    await Deno.writeTextFile("database/scoreboard.json", JSON.stringify(users, null, 2));
}



export async function getLoggedInUser() {
    const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));
    const loggedInUser = users.find(user => user.loggedIn === true);

    if (!loggedInUser) {
        console.error("No user is currently logged in.");
        return null;
    }

    return loggedInUser;
}

export async function logInUser(username) {
    const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));

    for (const user of users) {
        user.loggedIn = (user.username === username);
    }
    await Deno.writeTextFile("database/scoreboard.json", JSON.stringify(users, null, 2));
}

export async function logOutUser() {
    const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));

    for (const user of users) {
        user.loggedIn = false;
    }
    await Deno.writeTextFile("database/scoreboard.json", JSON.stringify(users, null, 2));
}


export async function createTopTen(currentPlayer) {
    console.log(currentPlayer);

    console.log("skapar leaderboard");

    // const table = document.getElementById("tabell");
    const response = await fetch("../database/scoreboard.json")
    const scoreboard = await response.json();

    const topPlayers = scoreboard.sort((a, b) => b.score - a.score).slice(0, 10);
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
        row.querySelector(".rank").style.backgroundColor = "initial";
        row.querySelector(".name").style.backgroundColor = "initial";
        row.querySelector(".score").style.backgroundColor = "initial";
        row.querySelector(".name").style.color = "initial";
        row.querySelector(".rank").style.color = "initial";
        row.querySelector(".score").style.color = "initial";
        row.querySelector(".name").style.fontWeight = "initial";
        row.querySelector(".rank").style.fontWeight = "initial";
        row.querySelector(".score").style.fontWeight = "initial";
    });



    topPlayers.forEach((player, i) => {
        const row = rows[i];
        row.querySelector(".rank").textContent = i + 1;
        row.querySelector(".name").textContent = player.username || "No user";

        if (player && player.score != null) {
            row.querySelector(".score").textContent = player.score;
        } else {
            row.querySelector(".score").textContent = "-";
        }



        if (row.querySelector(".name").textContent == currentPlayer.username) {
            row.querySelector(".rank").style.backgroundColor = "#4a90e2"
            row.querySelector(".name").style.backgroundColor = "#4a90e2"
            row.querySelector(".score").style.backgroundColor = "#4a90e2"
            row.querySelector(".name").style.color = "white"
            row.querySelector(".rank").style.color = "white"
            row.querySelector(".score").style.color = "white"
            row.querySelector(".name").style.fontWeight = "bold"
            row.querySelector(".rank").style.fontWeight = "bold"
            row.querySelector(".score").style.fontWeight = "bold"
        }
    });

    for (let i = topPlayers.length; i < rows.length; i++) {
        const row = rows[i];
        row.querySelector(".rank").textContent = i + 1;
        row.querySelector(".name").textContent = "No user";
        row.querySelector(".score").textContent = "-";
    }

}