// app/api/variants/route.ts
import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';


async function getSubcategoryProducts(subcat: string) {
    try {
        const apiUrl = `${AdminUrl}/api/getProductBySubcategories?subcat=${subcat}&currency=USD`;

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


export async function GET(request: Request, { params }: { params: { subcat: string } }) {
    const { subcat } = params;

    // Fetch product variant based on the provided parameters
    const subcatProducts = await getSubcategoryProducts(subcat);

    return NextResponse.json(subcatProducts);
}