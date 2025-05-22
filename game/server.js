import { serveDir, serveFile } from "jsr:@std/http/file-server";
import {
    checkUserCredentials,
    createOptions,
    checkContentType,
    createNewUser,
    updateUserScore,
    retrieveUserByName,
    logInUser,
    logOutUser
} from "./utilities.js";


async function handler(request) {
    const url = new URL(request.url);
    const contentType = request.headers.get("Content-Type")


    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }
    // if (request.method === "GET" && url.pathname === "/randomDish") {
    //     if (checkContentType(contentType)) {
    //         const fetchedRecipe = Deno.readTextFileSync("database/test.json");
    //         console.log(fetchedRecipe);

    //         return new Response(fetchedRecipe, createOptions());
    //     } else {
    //         return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
    //     }
    // }


    if (url.pathname === "/user" && request.method === "GET") {
        const users = await Deno.readTextFile("database/scoreboard.json");
        return new Response(JSON.stringify(users), createOptions())

    }

    if (url.pathname === "/signUp") {
        console.log("request to signUp");

        if (request.method === "POST") {
            if (checkContentType(contentType)) {
                const userData = await request.json()
                const resultNewUser = await createNewUser(userData)
                const newUser = resultNewUser.addedUser;
                if (newUser) {
                    await logInUser(newUser.username)
                    return new Response(JSON.stringify(resultNewUser.addedUser), createOptions())
                }

                if (resultNewUser.nameTaken) {
                    return new Response(JSON.stringify({ error: resultNewUser.nameTaken }), createOptions(409))
                }

            } else {
                return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
            }
        } else {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(400))
        }
    }

    if (url.pathname === "/logIn") {
        console.log("request to log in page");
        const loginData = await request.json()

        if (request.method === "POST") {
            if (checkContentType(contentType)) {

                const userExists = await checkUserCredentials(loginData);
                const user = await retrieveUserByName(loginData);

                if (userExists) {
                    console.log("användaren finns");
                    await logInUser(user.username)

                    return new Response(JSON.stringify(user), createOptions())
                } else {
                    console.log("användaren finns EJ");
                    return new Response(JSON.stringify({ error: "User does not exist" }), createOptions(404))
                }
            } else {
                return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
            }
        } else {
            return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(400))
        }
    }


    if (url.pathname === "/getLoggedInUser" && request.method === "GET") {
        const users = JSON.parse(await Deno.readTextFile("database/scoreboard.json"));
        const loggedInUser = users.find(u => u.loggedIn === true);

        if (loggedInUser) {
            return new Response(JSON.stringify(loggedInUser), createOptions())
        } else {
            return new Response(JSON.stringify({ error: "Ingen användare inloggad" }), createOptions(404));
        }
    }

    if (url.pathname === "/logOutUser" && request.method === "POST") {
        await logOutUser();
        return new Response(JSON.stringify({ message: "You logged out" }, createOptions()));
    }

    if (url.pathname === "/updateScore" && request.method === "PATCH") {
        if (checkContentType(contentType)) {

            const { score } = await request.json();
            await updateUserScore(score);
            return new Response("Score updated", createOptions(200));
        } else {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }

    }

    if (url.pathname === "/game") {
        return serveFile(request, "./mainPageGame/mainPage.html");
    }

    if (url.pathname === "/gameOver") {
        return serveFile(request, "./LoosePage/lose.html")
    }

    if (url.pathname === "/" || url.pathname === "/home") {
        return serveFile(request, "./homePage/homePage.html")
    }


    return serveDir(request, {
        fsRoot: ".",
        urlRoot: "",       // <- inga prefix krävs i URL
        showDirListing: false,
        enableCors: true,
    });
}



Deno.serve(handler);