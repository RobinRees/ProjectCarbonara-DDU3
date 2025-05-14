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

export async function createNewUser(username, score) { // user har undefined på båda värena atm
    const user = new User({ username: username, score: score })
    const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");

    let scoreboard = JSON.parse(JSONscoreboard);
    console.log(user);

    const existingUser = scoreboard.find(x => x.username === user.username)
    console.log(existingUser);

    if (existingUser != undefined) { // TROR EJ DENNA FUNGERAR KORREKT ÄNNU, EJ FÄRDIG
        scoreboard.push(user)
        Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(scoreboard))
        return user;
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