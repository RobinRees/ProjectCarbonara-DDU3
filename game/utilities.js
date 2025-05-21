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
        this.score = 0;

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



export async function updateUserScore(userInfo) {

    const id = userInfo.id;
    const newScore = userInfo.newScore;

    // Hämta alla användare
    const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));

    // Uppdatera rätt användares score
    const user = users.find(u => u.id === id);
    if (newScore > user.score) {
        user.score = newScore;
    }
    await Deno.writeTextFile("database/scoreboard.json", JSON.stringify(users, null, 2));
}