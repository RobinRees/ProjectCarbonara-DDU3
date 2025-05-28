
// const url = new URL("http://localhost:8000")
const main = document.querySelector("main");
const test1BTN = document.getElementById("test1")
const test2BTN = document.getElementById("test2")
const test3BTN = document.getElementById("test3")
const test4BTN = document.getElementById("test4")
const test5BTN = document.getElementById("test5")
const test6BTN = document.getElementById("test6")
const test7BTN = document.getElementById("test7")
const test8BTN = document.getElementById("test8")
const test9BTN = document.getElementById("test9")
const test10BTN = document.getElementById("test10")
const test11BTN = document.getElementById("test11")
const test12BTN = document.getElementById("test12")



async function test1() {
    const response = await fetch("http://localhost:8000/getLoggedInUser", {
        headers: {
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    console.log(data);

    statusResponse1.textContent = `Status: ${response.status}`;
    const expectedStatus = 404;
    if (response.status === expectedStatus) {
        document.getElementById("test1").classList.add("testOK");
        dataResponse1.textContent = `${data.error}`;
    } else {
        document.getElementById("test1").classList.add("testFAIL");
        dataResponse1.textContent = `Error: ${JSON.stringify(data)}`;
    }
    test2()
}

// Tidigare test1 → nu test2
async function test2() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "johannes", password: "test123" })
    });

    const data = await response.json();
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
    test3()

}

// Tidigare test2 → nu test3
async function test3() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "pelle", password: "carbonara69" })
    });

    const data = await response.json();
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
    test4()

}

// Tidigare test3 → nu test4
async function test4() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "johannes", password: "hej123" })
    });

    const data = await response.json();
    console.log(data);

    statusResponse4.textContent = `Status: ${response.status}`;
    const expectedStatus = 409;
    if (response.status === expectedStatus) {
        document.getElementById("test4").classList.add("testOK");
        dataResponse4.textContent = `${data.error}`;
    } else {
        document.getElementById("test4").classList.add("testFAIL");
        dataResponse4.textContent = `Error: ${data}`;
    }
    test5()

}

// Tidigare test4 → nu test5
async function test5() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "html/text"
        },
        body: JSON.stringify({ username: "sebbe", password: "husky" })
    });

    const data = await response.json();
    console.log(data);

    statusResponse5.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test5").classList.add("testOK");
        dataResponse5.textContent = `${data.error}`;
    } else {
        document.getElementById("test5").classList.add("testFAIL");
        dataResponse5.textContent = `Error: ${data}`;
    }
    test6()

}

// Tidigare test5 → nu test6
async function test6() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "test", password: "testing" })
    });

    const data = await response.json();
    console.log(data);

    statusResponse6.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test6").classList.add("testOK");
        dataResponse6.textContent = `${data.error}`;
    } else {
        document.getElementById("test6").classList.add("testFAIL");
        dataResponse6.textContent = `Error: ${data}`;
    }
    test7()
}
// TEST FOR LOGIN


// Tidigare test6 → nu test7
async function test7() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "johannes", password: "test123" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse7.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test7").classList.add("testOK");
        dataResponse7.innerHTML = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test7").classList.add("testFAIL");
        dataResponse7.textContent = `Error: ${data.error}`;
    }
    test8()
}

// Tidigare test11 → nu test8
async function test8() {
    const response = await fetch("http://localhost:8000/getLoggedInUser");
    const data = await response.json();
    console.log(data);

    statusResponse8.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test8").classList.add("testOK");
        dataResponse8.textContent = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test8").classList.add("testFAIL");
        dataResponse8.textContent = `Error: ${data.error}`;
    }
    test9()
}

// Tidigare test7 → nu test9
async function test9() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "johannes", password: "korvspad" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse9.textContent = `Status: ${response.status}`;
    const expectedStatus = 401;
    if (response.status === expectedStatus) {
        document.getElementById("test9").classList.add("testOK");
        dataResponse9.textContent = `${data.error}`;
    } else {
        document.getElementById("test9").classList.add("testFAIL");
        dataResponse9.textContent = `Error: ${data.error}`;
    }
    test10()
}

// Tidigare test8 → nu test10
async function test10() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "POST",
        headers: {
            "Content-Type": "text/html"
        },
        body: JSON.stringify({ username: "johannes", password: "test123" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse10.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test10").classList.add("testOK");
        dataResponse10.textContent = `${data.error}`;
    } else {
        document.getElementById("test10").classList.add("testFAIL");
        dataResponse10.textContent = `Error: ${data.error}`;
    }
    test11();
}

// Tidigare test9 → nu test11
async function test11() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "DELETE",
        headers: {
            "Content-Type": "text/html"
        },
        body: JSON.stringify({ username: "johannes", password: "test123" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse11.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test11").classList.add("testOK");
        dataResponse11.textContent = `${data.error}`;
    } else {
        document.getElementById("test11").classList.add("testFAIL");
        dataResponse11.textContent = `Error: ${data.error}`;
    }
    test12();
}

// Tidigare test10 → nu test12
async function test12() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "example", password: "test123" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse12.textContent = `Status: ${response.status}`;
    const expectedStatus = 404;
    if (response.status === expectedStatus) {
        document.getElementById("test12").classList.add("testOK");
        dataResponse12.textContent = `${data.error}`;
    } else {
        document.getElementById("test12").classList.add("testFAIL");
        dataResponse12.textContent = `Error: ${data.error}`;
    }
    test13();
}







test1BTN.addEventListener("click", test1);
test2BTN.addEventListener("click", test2);
test3BTN.addEventListener("click", test3);
test4BTN.addEventListener("click", test4);
test5BTN.addEventListener("click", test5);
test6BTN.addEventListener("click", test6);
test7BTN.addEventListener("click", test7);
test8BTN.addEventListener("click", test8);
test9BTN.addEventListener("click", test9);
test10BTN.addEventListener("click", test10);
test11BTN.addEventListener("click", test11);
test12BTN.addEventListener("click", test12);