
import { createOptions } from "./utilities.js";
import { checkContentType } from "./utilities.js";

async function handler(request) {
    const url = new URL(request.url);
    const contentType = request.headers.get("Content-Type")

    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }


    if (request.method === "GET" && url.pathname === "/carbonaraGame") {
        if (checkContentType(contentType)) {
            const fetchedRecipe = Deno.readTextFileSync("test.json");
            console.log(fetchedRecipe);

            return new Response(fetchedRecipe, createOptions());
        } else {
            return new Response(JSON.stringify({ error: "Bad Content-Type" }), createOptions(400));
        }

    }
    console.log("ERROR");

    return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(400))

}



Deno.serve(handler);