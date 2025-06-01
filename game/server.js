import { serveDir, serveFile } from "jsr:@std/http/file-server";
import {
    checkUserCredentials,
    createOptions,
    checkContentType,
    createNewUser,
    updateUserScore,
    logInUser,
    logOutUser,
    isValidPassword
} from "./utilities.js";


async function handler(request) {
    const url = new URL(request.url);
    const contentType = request.headers.get("Content-Type")


    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }

    if (url.pathname === "/signUp") {
        if (request.method != "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        }
        if (!checkContentType(contentType)) {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }
        const userData = await request.json()

        if (userData.username.length < 3 || userData.username.length === "") {
            return new Response(JSON.stringify({ error: "Username must be at least 3 characters" }), createOptions(400));
        }

        if (userData.password.length < 5 || !isValidPassword(userData.password)) {
            return new Response(JSON.stringify({ error: "Password must be at least 5 characters and include a number" }), createOptions(400));
        }

        const resultNewUser = createNewUser(userData)
        const newUser = resultNewUser.addedUser;

        if (newUser) {
            logInUser(newUser.username)
            return new Response(JSON.stringify(resultNewUser.addedUser), createOptions())
        }

        if (resultNewUser.nameTaken) {
            return new Response(JSON.stringify({ error: resultNewUser.nameTaken }), createOptions(409))
        }
    }

    if (url.pathname === "/logIn") {
        if (request.method != "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        }
        if (!checkContentType(contentType)) {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }

        const loginData = await request.json();
        const verifiedUser = checkUserCredentials(loginData);

        if (verifiedUser.status === "success") {
            console.log("användaren finns");
            logInUser(verifiedUser.user.username)
            return new Response(JSON.stringify(verifiedUser.user), createOptions())
        }
        if (verifiedUser.status === "wrong password") {
            console.log("wrong password");

            return new Response(JSON.stringify({ error: "Incorrect password" }), createOptions(401));
        }
        if (verifiedUser.status === "no user") {
            return new Response(JSON.stringify({ error: "User does not exist" }), createOptions(404));
        }
    }

    if (url.pathname === "/getLoggedInUser") {
        if (request.method != "GET") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        } else {
            const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));
            const loggedInUser = users.find(u => u.loggedIn);

            if (loggedInUser) {
                return new Response(JSON.stringify(loggedInUser), createOptions())
            } else {
                return new Response(JSON.stringify({ error: "No logged in user yet" }), createOptions(404));
            }
        }
    }

    if (url.pathname === "/logOutUser") {
        if (request.method != "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        }

        const loggedOutUser = logOutUser();
        console.log(loggedOutUser, "server105");
        return new Response(JSON.stringify({ message: "You logged out", user: loggedOutUser }), createOptions());
    }

    if (url.pathname === "/updateScore") {
        if (request.method != "PATCH") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        }
        if (!checkContentType(contentType)) {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }

        const { score } = await request.json();
        updateUserScore(score);
        return new Response(JSON.stringify({ message: "Score updated" }), createOptions());
    }


    if (url.pathname === "/getTopTen") {
        if (request.method != "GET") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(405))
        }
        const scoreboard = JSON.parse(Deno.readTextFileSync("database/scoreboard.json"));
        const topPlayers = scoreboard.sort((a, b) => b.score - a.score).slice(0, 10);
        return new Response(JSON.stringify(topPlayers), createOptions());
    }


    if (url.pathname === "/game") {
        const fileResponse = await serveFile(request, "./mainPageGame/mainPage.html");
        const html = await fileResponse.text();

        return new Response(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    if (url.pathname === "/gameOver") {
        const fileResponse = await serveFile(request, "./LoosePage/lose.html");
        const html = await fileResponse.text();

        return new Response(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    if (url.pathname === "/" || url.pathname === "/home") {
        const fileResponse = await serveFile(request, "./homePage/homePage.html");
        const html = await fileResponse.text();

        return new Response(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const allowedApiPaths = [
        "/signUp",
        "/logIn",
        "/getLoggedInUser",
        "/logOutUser",
        "/updateScore",
        "/getTopTen",
        "/game",
        "/gameOver",
        "/home",
        "/"
    ];

    if (
        request.method === "GET" &&
        !allowedApiPaths.includes(url.pathname)
    ) {
        return new Response(JSON.stringify({ error: "Invalid endpoint" }), createOptions(400));
    }

    if (request.method === "GET") {
        return serveDir(request, {
            fsRoot: ".",
            urlRoot: "",
            showDirListing: false,
            enableCors: true,
        });
    }
}



Deno.serve(handler);