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
    constructor(data = {}) {
        this._username = data.username
        this._score = data.score
    }

    get username() {
        return this._username
    }

    set username(value) {
        if (typeof value !== "string") {
            return console.log("ERROR")
        }

        this._username = value
    }

    get score() {
        return this._score
    }

    set score(value) {
        if (typeof value !== "number") {
            return console.log("ERROR")
        }

        this._score = value
    }


}
// Har justerat denna function, kanske fungerar som tänkt nu // oscar
export async function createNewUser(username, score) {
    const user = new User({ username: username, score: score })
    const JSONscoreboard = Deno.readTextFileSync("/database/scoreboard.json");

    let scoreboard = JSON.parse(JSONscoreboard);

    const existingUser = scoreboard.find(x => x.username === user.username)

    if (existingUser != undefined) {
        scoreboard.push(user)
    } else {
        console.log("Username already exists");
        // här händer något med score om användare redan finns. Bör lägga in att det endast uppdatera 
        // score är högre    }
    }
}

// const user = new User({ username: "Anna", score: 10 });

// let myOPT = {
//     method: "POST",
//     headres: {"Content-Type": "application/json"},
//     body: JSON.stringify({username: username})
// }