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