// app/api/variants/route.ts
import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';


async function getVariantsOfCatSubcat(category: string, subcategory: string, uniquepid: number) {
    try {
        const apiUrl = `${AdminUrl}/api/getvariantsofcatsubcat?category=${category}&subcategory=${subcategory}&uniquepid=${uniquepid}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Adjust headers as needed
                // Add any other headers you may need, such as authentication headers
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData; // This will be the response data from your API
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in your application
    }
}

// GET /api/variants/[category]/[subcategory]/[uniqueId]
export async function GET(request: Request, { params }) {
    //const { category, subcategory, uniqueId } = params;
    console.log(params);

    // Fetch product variant based on the provided parameters
    // const variant = await getVariantsOfCatSubcat(category, subcategory, uniqueId);

    // return NextResponse.json({ variant });
}