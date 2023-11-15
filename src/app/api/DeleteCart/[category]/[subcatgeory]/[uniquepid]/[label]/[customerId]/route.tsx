// app/api/variants/route.ts
import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';

async function DeleteProductFromCart(category: string, subcatgeory: any, uniquepid: number, label: string | null, customerId: Number) {
    try {
        const apiUrl = `${AdminUrl}/api/removeProductFromCartWebsite?category=${category}&subcategory=${subcatgeory}&product_uniqueid=${uniquepid}&customer_id=${customerId}&label=${label || 'empty'}`;


        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function GET(request: Request, { params }: { params: { category: string, subcatgeory: string, uniquepid: number, label: string | null, customerId: Number } }) {
    const { category, subcatgeory, uniquepid, label, customerId } = params;

    const cartdelete = await DeleteProductFromCart(category, subcatgeory, uniquepid, label || 'empty', customerId);

    return NextResponse.json({ cartdelete });
}