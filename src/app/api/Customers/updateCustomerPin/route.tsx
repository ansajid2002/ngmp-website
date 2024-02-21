import { AdminUrl } from "@/app/layout";

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        };

        const response = await fetch(`${AdminUrl}/api/updateCustomerPin`, requestOptions);

        const responseData = await response.json();

        // Handle different status codes
        if (response.ok) {
            // If the response status is 2xx (success), return the data with status 200
            return new Response(JSON.stringify(responseData), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // If the response status is not 2xx, return the data with the corresponding status code
            return new Response(JSON.stringify(responseData), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        // Return a generic error response with status 500
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
