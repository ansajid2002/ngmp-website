import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';

async function fetchWishlist(customerId: any) {
    try {
        if (!customerId) return;

        const urlWithCustomerId = `${AdminUrl}/api/wishlistdataPUT`;

        const requestOptions = {
            method: 'PUT', // Change the request method to PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customer_id: customerId }), // Pass the customer_id in the request body
        };

        // Send the PUT request and await the response
        const response = await fetch(urlWithCustomerId, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data as JSON
        const cartData = await response.json();

        return cartData;
    } catch (error) {
        // Handle any errors here
        console.error('Error fetching wishlist data:', error);
    }
}

export async function PUT(request: Request, { params }: { params: { customer_id: any } }) {
    const { customer_id } = params;

    const wishlistData = await fetchWishlist(customer_id);

    return NextResponse.json({ wishlistData });
}