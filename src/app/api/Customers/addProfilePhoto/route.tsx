import { AdminUrl } from "@/app/layout";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    // var form = formidable({});

    try {
        // Get form data instead of JSON
        let formData = await request.formData();

        console.log(formData);

        const response = await fetch(`${AdminUrl}/api/uploadCustomerProfileImage`, {
            method: 'POST',
            body: formData,
        });


        if (response.ok) {
            // Image upload was successful
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // Handle upload failure
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
