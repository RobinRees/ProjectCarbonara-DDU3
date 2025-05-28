import { createTopTen } from "../utilities.js";

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
    console.log(user.roundScore); // NÅGOT SOM UPPDATERAR FEL MED POÄNG
    document.getElementById("scorePersonalBest").textContent = `${user.score}`
    if (!user.roundScore) {
        document.getElementById("finalScore").textContent = `${user.score}`
    } else {
        document.getElementById("finalScore").textContent = `${user.roundScore}`
    }

    document.getElementById("usernameDisplay").textContent = currentPlayer.username;

    createTopTen(currentPlayer)
})();

const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboard = document.getElementById("leaderboard-container");

leaderboardButton.addEventListener("click", () => {
    createTopTen(currentPlayer)
    leaderboard.style.display = "block";
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    leaderboard.style.display = "none";
});


const homeButton = document.getElementById("homeButton");
const playAgain = document.getElementById("playAgain")


playAgain.addEventListener("click",  async () => {
    console.log("navigating to /game");
    window.location.href = "/game"
});


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