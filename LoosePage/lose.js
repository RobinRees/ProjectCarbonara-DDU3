function createTopTen() {
    const table = document.getElementById("tabell");

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement("tr");
        
        const rankCell = document.createElement("td");
        rankCell.textContent = i;

        const nameCell = document.createElement("td");
        nameCell.textContent = "Name";

        const scoreCell = document.createElement("td");
        scoreCell.textContent = "Number";


        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    }
}

createTopTen();

const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboard = document.getElementById("leaderboard");

leaderboardButton.addEventListener("click", () => {
    leaderboard.style.display = "block";
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    leaderboard.style.display = "none";
});