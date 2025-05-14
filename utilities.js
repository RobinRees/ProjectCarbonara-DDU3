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
        this.username = data.username
        this.score = data.score
    }


    get username() {
        return this._username
    }

    set username(value) {
        if (typeof value !== "string") {
            throw new Error("Username must be a string");
        }

        this._username = value
    }

    get score() {
        return this._score
    }

    set score(value) {
        if (typeof value !== "number") {
            throw new Error("Score must be a positive numebr");
        }

        this._score = value
    }
}

export async function createNewUser(userData) { // user har undefined på båda värena atm
    console.log(userData);

    const user = new User(userData)
    const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");

    let scoreboard = JSON.parse(JSONscoreboard);
    console.log(user), "rad 56 utilities";

    const existingUser = scoreboard.find(x => x._username === user._username)
    console.log(existingUser);

    if (scoreboard.length == 0 || existingUser == undefined) {
        scoreboard.push(user)
        Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(scoreboard))
        return user;
    } else {
        console.log("Username already exists");
        return { error: "Username already exists" }
    }
}
