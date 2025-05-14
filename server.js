
import { createOptions } from "./utilities.js";

async function handler(request) {

    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }


}



Deno.serve(handler);