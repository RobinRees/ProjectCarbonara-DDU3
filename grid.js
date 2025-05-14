const main = document.body.appendChild(document.createElement("main"))

main.style.display = `grid`
main.style.gridTemplateRows = `repeat(3, 1fr)`
main.style.gridTemplateColumns = `repeat(3, 1fr)`


function createGrid() {
    
    for (let i = 0; i < 3; i++){
        for (let j = 0; j< 3; j++){
            let randomNumbers = Math.floor(Math.random() * 9)+1
            const div = main.appendChild(document.createElement("div"))
            div.classList.add("cell")
            div.style.border = `1px solid black`

            div.textContent = randomNumbers

            div.addEventListener("click", (event)=> {
                if (event.target && event.target.tagName === "DIV"){
                    if(event.target.textContent === "5"){
                        div.classList.add("Correct")
                        div.style.background = `green`
                    }
                    else { 
                        div.style.background = `red`
                    }
                }
            })
        }
    }


}

createGrid()