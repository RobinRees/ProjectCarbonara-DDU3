import { createTopTen } from "../utilities.js";

let currentPlayer = null;

(async () => {
    const response = await fetch("/getLoggedInUser");
    if (response.status === 200) {
        currentPlayer = await response.json();
        console.log(currentPlayer);
    }
    console.log(currentPlayer);
    console.log(currentPlayer.score);
    console.log(currentPlayer.roundScore);
    document.getElementById("scorePersonalBest").textContent = `${currentPlayer.score}`
    if (!currentPlayer.roundScore) {
        document.getElementById("finalScore").textContent = `${currentPlayer.score}`
    } else {
        document.getElementById("finalScore").textContent = `${currentPlayer.roundScore}`
    }
    createTopTen(currentPlayer)

})();

const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboard = document.getElementById("hidden-leaderboard-container");

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


playAgain.addEventListener("click", async () => {
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