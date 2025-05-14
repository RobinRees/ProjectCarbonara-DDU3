
import { createOptions } from "./utilities.js";

async function handler(request) {
    const url = new URL(request.url);


    if (request.method === "OPTIONS") {
        return new Response(null, createOptions())
    }

    
    if (request.method === "GET" && url.pathname === "") {


        
    }


}



Deno.serve(handler);