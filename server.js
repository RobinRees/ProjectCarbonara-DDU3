
import { createOptions } from "./utilities.js";
import { checkContentType } from "./utilities.js";
import { createNewUser } from "./utilities.js";

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

    if (url.pathname === "/completedGame") {
        console.log("request to completedGame");
        const userData = await request.json()

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
    console.log("ERROR");

    return new Response(JSON.stringify({ error: "Bad pathname or Method not allowed" }), createOptions(400))

}



Deno.serve(handler);