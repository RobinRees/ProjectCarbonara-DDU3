


export function createOptions(status = 200) {
    return {
        status: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    };
}

export function checkContentType(contentType) {
    return contentType === "application/json"
}


export function isValidPassword(password) {
    for (let char of password) {
        if (!isNaN(char)) return true;
    }
    return false;
}


export class User {
    constructor(data) {
        const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");
        let scoreboard = JSON.parse(JSONscoreboard);

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

export function createNewUser(userData) {
    const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");
    let scoreboard = JSON.parse(JSONscoreboard);

    const nameTaken = scoreboard.some(x => x.username === userData.username);

    if (nameTaken) {
        return { nameTaken: "Username already exists" }
    } else {
        const newUser = new User(userData);
        scoreboard.push(newUser)
        Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(scoreboard, null, 2))
        return { addedUser: newUser };
    }
}

export function checkUserCredentials(loginData) {
    const JSONusers = Deno.readTextFileSync("database/scoreboard.json");
    const users = JSON.parse(JSONusers);
    console.log(users);

    const user = users.find(x => x.username === loginData.username);
    console.log(user);

    if (!user) {
        return { status: "no user" };
    }

    if (user.password !== loginData.password) {
        return { status: "wrong password" };
    }

    return { status: "success", user }; // Logga in OK
}


export function updateUserScore(newScore) {
    const users = JSON.parse(Deno.readTextFileSync("database/scoreboard.json"))
    const user = users.find(u => u.loggedIn == true);

    if (newScore > user.score) {
        user.score = Number(newScore);
    } else {
        user.roundScore = newScore;
    }
    Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(users, null, 2));
}


export function logInUser(username) {
    const users = JSON.parse(Deno.readTextFileSync("database/scoreboard.json"));

    for (const user of users) {
        user.loggedIn = (user.username === username);
    }
    Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(users, null, 2));
}

export function logOutUser() {
    const users = JSON.parse(Deno.readTextFileSync("database/scoreboard.json"));

    const loggedOutUser = users.find(user => user.loggedIn);
    console.log(loggedOutUser, "132");

    if (loggedOutUser) {
        loggedOutUser.loggedIn = false;
    }
    Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(users, null, 2));
    console.log(loggedOutUser, "138");

    return loggedOutUser;
}


export async function createTopTen(currentPlayer) {
    console.log(currentPlayer);

    const response = await fetch("/getTopTen");
    const topPlayers = await response.json();

    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {

        row.querySelector(".rank").classList.remove("currentPlayer");
        row.querySelector(".name").classList.remove("currentPlayer");
        row.querySelector(".score").classList.remove("currentPlayer");

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

            row.querySelector(".rank").classList.add("currentPlayer");
            row.querySelector(".name").classList.add("currentPlayer");
            row.querySelector(".score").classList.add("currentPlayer");
        }
    });

    for (let i = topPlayers.length; i < rows.length; i++) {
        const row = rows[i];
        row.querySelector(".rank").textContent = i + 1;
        row.querySelector(".name").textContent = "No user";
        row.querySelector(".score").textContent = "-";
    }

}