
import { createOptions } from "./utilities.js";

async function handler(request) {
    const url = new URL(request.url);


    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }


    if (request.method === "GET" && url.pathname === "/carbonaraGame") {
        const fetchedRecipe = Deno.readTextFileSync("test.json");
        console.log(fetchedRecipe);

        return new Response(fetchedRecipe, createOptions());
    }
    console.log("ERROR");

    return new Response(JSON.stringify({ error: "Method not allowed" }), createOptions(400))

}



Deno.serve(handler);