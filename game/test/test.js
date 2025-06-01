
const main = document.querySelector("main");

test1();

async function test1() {
    const response = await fetch("http://localhost:8000/getLoggedInUser");
    const data = await response.json();
    console.log(data);

    statusResponse1.textContent = `Status: ${response.status}`;
    const expectedStatus = 404;
    if (response.status === expectedStatus) {
        document.getElementById("test1").classList.add("testOK");
        dataResponse1.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test1").classList.add("testFAIL");
        dataResponse1.textContent = `Error: ${JSON.stringify(data)}`;
    }
    test2()
}

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
        dataResponse4.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test4").classList.add("testFAIL");
        dataResponse4.textContent = `Error: ${data}`;
    }
    test5()
}

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
        dataResponse5.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test5").classList.add("testFAIL");
        dataResponse5.textContent = `Error: ${data}`;
    }
    test6()

}

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
    const expectedStatus = 405;
    if (response.status === expectedStatus) {
        document.getElementById("test6").classList.add("testOK");
        dataResponse6.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test6").classList.add("testFAIL");
        dataResponse6.textContent = `Error: ${data}`;
    }
    test7()
}

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
        dataResponse9.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test9").classList.add("testFAIL");
        dataResponse9.textContent = `Error: ${data.error}`;
    }
    test10()
}

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
        dataResponse10.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test10").classList.add("testFAIL");
        dataResponse10.textContent = `Error: ${data.error}`;
    }
    test11();
}

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
    const expectedStatus = 405;
    if (response.status === expectedStatus) {
        document.getElementById("test11").classList.add("testOK");
        dataResponse11.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test11").classList.add("testFAIL");
        dataResponse11.textContent = `Error: ${data.error}`;
    }
    test12();
}

async function test12() {
    const response = await fetch("http://localhost:8000/logIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "example", password: "tester123" })
    });
    const data = await response.json();
    console.log(data);

    statusResponse12.textContent = `Status: ${response.status}`;
    const expectedStatus = 404;
    if (response.status === expectedStatus) {
        document.getElementById("test12").classList.add("testOK");
        dataResponse12.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test12").classList.add("testFAIL");
        dataResponse12.textContent = `Error: ${data.error}`;
    }
    test13();
}


async function test13() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "wo", password: "testing123" })
    });

    const data = await response.json();
    console.log(data);

    statusResponse13.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test13").classList.add("testOK");
        dataResponse13.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test13").classList.add("testFAIL");
        dataResponse13.textContent = `Error: ${data}`;
    }
    test14();
}
async function test14() {
    const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: "Bowser", password: "cake" })
    });

    const data = await response.json();
    console.log(data);

    statusResponse14.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test14").classList.add("testOK");
        dataResponse14.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test14").classList.add("testFAIL");
        dataResponse14.textContent = `Error: ${data}`;
    }
    test15();
}
async function test15() {
    const response = await fetch("http://localhost:8000/updateScore", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: 100 })
    });

    const data = await response.json();
    console.log(data);

    statusResponse15.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test15").classList.add("testOK");
        console.log(data.message);

        dataResponse15.textContent = JSON.stringify(data);
    } else {
        document.getElementById("test15").classList.add("testFAIL");
        dataResponse15.textContent = `Error: ${data}`;
    }
    test16();
}

async function test16() {
    const response = await fetch("http://localhost:8000/logOutUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log(data);

    statusResponse16.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test16").classList.add("testOK");
        console.log(data.message);
        console.log(data.user);


        dataResponse16.innerHTML = `${data.message} <br> ${JSON.stringify(data.user)}`;
    } else {
        document.getElementById("test16").classList.add("testFAIL");
        dataResponse16.textContent = `Error: ${data}`;
    }
    test17();
}

async function test17() {
    const response = await fetch("http://localhost:8000/game");

    const data = await response.text();

    statusResponse17.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test17").classList.add("testOK");
        console.log(data.message);
        console.log(data.user);


        dataResponse17.textContent = "HTML page loaded correctly";
    } else {
        document.getElementById("test17").classList.add("testFAIL");
        dataResponse17.textContent = `Error: ${data}`;
    }
    test18();
}

async function test18() {
    const response = await fetch("http://localhost:8000/gameOver");

    const data = await response.text();

    statusResponse18.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test18").classList.add("testOK");

        dataResponse18.textContent = "HTML page loaded correctly";
    } else {
        document.getElementById("test18").classList.add("testFAIL");
        dataResponse18.textContent = `Error: ${data}`;
    }
    test19();
}
async function test19() {
    const response = await fetch("http://localhost:8000/");
    const data = await response.text();

    statusResponse19.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test19").classList.add("testOK");

        dataResponse19.textContent = "HTML page loaded correctly";
    } else {
        document.getElementById("test19").classList.add("testFAIL");
        dataResponse19.textContent = `Error: ${data}`;
    }
    test20();
}
async function test20() {
    const response = await fetch("http://localhost:8000/home");
    const data = await response.text();

    statusResponse20.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test20").classList.add("testOK");

        dataResponse20.textContent = "HTML page loaded correctly";
    } else {
        document.getElementById("test20").classList.add("testFAIL");
        dataRespons20.textContent = `Error: ${data}`;
    }
    test21();
}
async function test21() {
    const response = await fetch("http://localhost:8000/getTopTen");
    const data = await response.json();

    statusResponse21.textContent = `Status: ${response.status}`;
    const expectedStatus = 200;
    if (response.status === expectedStatus) {
        document.getElementById("test21").classList.add("testOK");

        dataResponse21.textContent = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test21").classList.add("testFAIL");
        dataRespons21.textContent = `Error: ${data}`;
    }
    test22();
}

async function test22() {
    const response = await fetch("http://localhost:8000/otherRandomPaths");
    const data = await response.json();

    statusResponse22.textContent = `Status: ${response.status}`;
    const expectedStatus = 400;
    if (response.status === expectedStatus) {
        document.getElementById("test22").classList.add("testOK");

        dataResponse22.textContent = `${JSON.stringify(data)}`;
    } else {
        document.getElementById("test22").classList.add("testFAIL");
        dataRespons22.textContent = `Error: ${data}`;
    }
}
