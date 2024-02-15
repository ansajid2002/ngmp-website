import { AdminUrl } from "@/app/layout";

export async function PUT(request: Request) {
    try {
        const requestData = await request.json();
        
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        };

        const response = await fetch(`${AdminUrl}/api/getSingleProduct`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        return new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}