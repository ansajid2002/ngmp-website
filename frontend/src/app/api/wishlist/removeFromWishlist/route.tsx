import { AdminUrl } from "@/app/layout";

export async function DELETE(request: Request) {
    try {
        const requestData = await request.json();
        console.log(requestData, 'req');

        const requestOptions = {
            method: 'DELETE', // Updated method to 'DELETE'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        };

        const response = await fetch(`${AdminUrl}/api/removeFromWishlist`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

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
