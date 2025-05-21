import { serveDir, serveFile } from "jsr:@std/http/file-server";
import {
    checkUserCredentials,
    createOptions,
    checkContentType,
    createNewUser,
    updateUserScore,
    retrieveUserByName
} from "./utilities.js";


async function handler(request) {
    const url = new URL(request.url);
    const contentType = request.headers.get("Content-Type")


    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }


    if (request.method === "GET" && url.pathname === "/carbonaraGame") {
        if (checkContentType(contentType)) {
            const fetchedRecipe = Deno.readTextFileSync("database/test.json");
            console.log(fetchedRecipe);

            return new Response(fetchedRecipe, createOptions());
        } else {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }
    }

    if (url.pathname === "/signUp") {
        console.log("request to signUp");
        const userData = await request.json()
        console.log(userData);

        if (request.method === "POST") {
            console.log("POST request recieved");
            if (checkContentType(contentType)) {

                const resultNewUser = await createNewUser(userData)

                if (resultNewUser.addedUser) {
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
                console.log("HUND");

                const userExists = await checkUserCredentials(loginData);
                console.log(loginData, "rad 69");
                console.log(userExists);


                const user = await retrieveUserByName(loginData);
                console.log(user, "rad 70 server");

                if (userExists) {
                    console.log("användaren finns");

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
    console.log("ERROR");


    if (url.pathname === "/completedGame" && request.method === "POST") {
        if (checkContentType(contentType)) {

            const userInfo = await request.json();
            await updateUserScore(userInfo);
            return new Response("Score updated", createOptions(200));
        }

    }
    return await serveDir(request, {
        fsRoot: ".",
        urlRoot: "",       // <- inga prefix krävs i URL
        showDirListing: false,
        enableCors: true,
    });
}



Deno.serve(handler);