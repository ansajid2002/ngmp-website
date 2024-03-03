import { AdminUrl } from "@/app/layout";

export async function POST(request: Request) {
    try {
        console.log("CALLED PRODUCts search");
        
        // Parse the request body as JSON
        const requestData = await request.json();
        console.log(requestData,"REQUESTDDDDAAAATTA");
        
        // Make a POST request to the specified URL
        const response = await fetch(`${AdminUrl}/api/postproducthistoryquery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to update Product history');
        }

        // Return a success response
        return new Response(JSON.stringify({ message: "Product history updated" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing request:', error);
        // Return an error response
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
