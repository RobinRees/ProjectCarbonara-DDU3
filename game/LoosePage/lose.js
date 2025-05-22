// import { getLoggedInUser } from "../utilities.js";

let currentPlayer = null;

(async () => {
    const response = await fetch("/getLoggedInUser", {
        method: "GET",
        headers: { "content-type": "application/json" }
    });
    if (response.status === 200) {
        currentPlayer = await response.json();
        console.log(currentPlayer);
    }

    const responseTwo = await fetch("../database/scoreboard.json")
    const scoreboard = await responseTwo.json();

    const user = scoreboard.find(u => u.loggedIn == true);
    console.log(user);
    console.log(user.score);
    console.log(user.roundScore);
    document.getElementById("scorePersonalBest").textContent = `${user.score}`
    if (!user.roundScore) {
        document.getElementById("finalScore").textContent = `${user.score}`
    } else {
        document.getElementById("finalScore").textContent = `${user.roundScore}`
    }



    document.getElementById("finalScore").textContent = `${currentScore}`

    document.getElementById("usernameDisplay").textContent = `Current player: ${currentPlayer.username}`;

    createTopTen()
})();


async function createTopTen() {

    const table = document.getElementById("tabell");
    const response = await fetch("../database/scoreboard.json")
    const scoreboard = await response.json();



    


    let topPlayers = scoreboard.sort((a, b) => b.score - a.score);

    table.innerHTML = ""
    table.innerHTML = `
                    <div id="rankColumn">Rank</div>
                    <div id="nameColumn">Name</div>
                    <div id="scoreColumn">TotalScore</div>
                    `

    for (let i = 0; i <= 9; i++) {
        const player = topPlayers[i];

        const rankCell = document.createElement("div");
        rankCell.textContent = i + 1;

        const nameCell = document.createElement("div");
        const scoreCell = document.createElement("div");
        if (player === undefined) {
            nameCell.textContent = "No user"
            scoreCell.textContent = "No user"

        } else {
            nameCell.textContent = player.username;
            scoreCell.textContent = player.score;
        }


        table.appendChild(rankCell);
        table.appendChild(nameCell);
        table.appendChild(scoreCell);
    }
}


const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboard = document.getElementById("leaderboard");

leaderboardButton.addEventListener("click", () => {
    leaderboard.style.display = "block";
    createTopTen();
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    leaderboard.style.display = "none";
});


const homeButton = document.getElementById("homeButton");


homeButton.addEventListener("click", async () => {
    const response = await fetch("/logOutUser", {
        method: "POST"
    });

    if (response.status === 200) {
        alert("You logged out");

        window.location.href = "/home";
    } else {
        alert("Något gick fel vid utloggning.");
    }
});