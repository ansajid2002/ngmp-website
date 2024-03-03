import { AdminUrl } from "@/app/layout";

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        console.log(requestData);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        };

        const response = await fetch(
            `${AdminUrl}/api/conversations`,
            requestOptions
        );

        const responseData = await response.json();
        console.log(responseData,"dddd");
        

        return new Response(JSON.stringify(responseData), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
