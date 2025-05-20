async function createTopTen() {

    const table = document.getElementById("tabell");
    const response = await fetch("../database/scoreboard.json")
    const scoreboard = await response.json();


    let topPlayers = scoreboard.sort((a, b) => b.score - a.score);
  
    table.innerHTML = ""
    table.innerHTML = `
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>TotalScore</th>
                    </tr>
                    `

    for (let i = 0; i <= 9; i++) {
        const player = topPlayers[i];
        const row = document.createElement("tr");
        
        const rankCell = document.createElement("td");
        rankCell.textContent = i + 1;

        const nameCell = document.createElement("td");
        const scoreCell = document.createElement("td");
        if (player === undefined) {
            nameCell.textContent = "undifined"
            scoreCell.textContent = "undifined"
            
        } else {
            nameCell.textContent = player.username;
            scoreCell.textContent = player.score;
        }


        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
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