// app/api/variants/route.ts
import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';


async function getSubcategoryProducts(subcat: string, pageNumber: number, pageSize: number) {
    try {
        const apiUrl = `${AdminUrl}/api/getProductBySubCat_TabsHomeScreen?subcat=${subcat?.replace(/[^\w\s]/g, "")
            ?.replace(/\s/g, "")}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

        console.log(apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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



export async function GET(request: Request, { params, query }: { params: { subcat: string }, query?: { page?: any, pageSize?: any } }) {
    const { subcat } = params;

    // Fetch product variant based on the provided parameters
    const subcatProducts = await getSubcategoryProducts(subcat?.[0], subcat?.[1], subcat?.[2]);

    return NextResponse.json(subcatProducts);
}

