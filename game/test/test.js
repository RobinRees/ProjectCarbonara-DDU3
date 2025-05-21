const main = document.querySelector("main");
const test1BTN = document.getElementById("test1")
const test2BTN = document.getElementById("test2")
const test3BTN = document.getElementById("test3")
const test4BTN = document.getElementById("test4")
const test5BTN = document.getElementById("test5")
const test6BTN = document.getElementById("test6")

// TESTAR ATT HÄMTA MÅLTID VIA FETCH
async function test1() {
    const response = await fetch("http://localhost:8000/carbonaraGame", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    console.log(data.error);


    statusResponse1.textContent = `Status: ${response.status}`;
    console.log(response.status);

    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test1").classList.add("testOK");
        dataResponse1.textContent = `${data.meals[0].strMeal}`;
    } else {
        document.getElementById("test1").classList.add("testFAIL");

        dataResponse1.textContent = `Error: ${data.error}`;
    }
}
// TESTAR ATT ADDERA USER
async function test2() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "mordor", password: "hej123" })
    })

    const data = await response.json()
    console.log(data);

    statusResponse2.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test2").classList.add("testOK");
        dataResponse2.textContent = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test2").classList.add("testFAIL");

        dataResponse2.textContent = `Error: ${data.error}`;
    }
}


// TESTAR ATT ADDERA ANNAN NY USER
async function test3() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "dragonslayer", password: "carbonara69" })
    })

    const data = await response.json()
    console.log(data);



    statusResponse3.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test3").classList.add("testOK");
        dataResponse3.textContent = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test3").classList.add("testFAIL");

        dataResponse3.textContent = `Error: ${data.error}`;
    }
}
// ADDERAR REDAN EXISTERANDE USER
async function test4() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "mordor", password: "hej123" })
    })

    const data = await response.json()
    console.log(data);

    statusResponse4.textContent = `Status: ${response.status}`;
    const expectedStatus = 409;
    if (response.status === expectedStatus) {
        document.getElementById("test4").classList.add("testOK");
        dataResponse4.textContent = `${data.error}`;
    } else {
        document.getElementById("test4").classList.add("testFAIL");

        dataResponse4.textContent = `Error: ${data.error}`;
    }
}
// TESTAR MED FEL CONTENT-TYPE
async function test5() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "html/text"
        },
        body: JSON.stringify({ username: "sebbe", password: "husky" })
    })
    const data = await response.json()
    console.log(data);

    statusResponse5.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test5").classList.add("testOK");
        dataResponse5.textContent = `${data.error}`;
    } else {
        document.getElementById("test5").classList.add("testFAIL");

        dataResponse5.textContent = `Error: ${data.error}`;
    }
}
// TESTAR MED FEL METOD
async function test6() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "test", password: "testing" })
    })
    const data = await response.json()
    console.log(data);

    statusResponse6.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test6").classList.add("testOK");
        dataResponse6.textContent = `${data.error}`;
    } else {
        document.getElementById("test6").classList.add("testFAIL");

        dataResponse6.textContent = `Error: ${data.error}`;
    };
}





test1BTN.addEventListener("click", test1);
test2BTN.addEventListener("click", test2);
// test2BTN.addEventListener("click", function (event) {
//     event.preventDefault();
//     test2();
// });
test3BTN.addEventListener("click", test3);
test4BTN.addEventListener("click", test4);
test5BTN.addEventListener("click", test5);
test6BTN.addEventListener("click", test6);