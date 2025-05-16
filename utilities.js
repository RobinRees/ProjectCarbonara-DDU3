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



export class User { // Om vi använder get/set får vi objekt med nycklar som: _.username
    constructor(data) {
        const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");
        let scoreboard = JSON.parse(JSONscoreboard);


        if (typeof data.username !== "string") {
            alert("Username must be at least 3 characters")
        }
        this.username = data.username
        this.password = data.password

        const ids = scoreboard.map(user => user.id)
        if (ids.length === 0) {
            this.id = 1
        } else {
            this.id = Math.max(...ids) + 1
        }
    }
}

export async function createNewUser(userData) {
    console.log(userData);

    const newUser = new User(userData)
    console.log(newUser, "rad 43");

    const JSONscoreboard = Deno.readTextFileSync("database/scoreboard.json");

    let scoreboard = JSON.parse(JSONscoreboard);

    const nameTaken = scoreboard.some(x => x.username === newUser.username) // Kollar om 1 användre redan har det namnet, true elelr false

    if (nameTaken) {
        console.log("Username already exists");
        return { nameTaken: "Username already exists" }
    } else {
        scoreboard.push(newUser)
        Deno.writeTextFileSync("database/scoreboard.json", JSON.stringify(scoreboard))
        return { addedUser: newUser };

    }
}
