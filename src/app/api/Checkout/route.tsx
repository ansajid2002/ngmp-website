import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, {
    apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        if (body.products.length > 0) {
            // Calculate total shipping amount
            const totalShippingAmount = body.products?.[0]?.shippingCost || 0


            // Create line items including the shipping item
            const lineItems = body.products.map((item: any) => {
                const unitAmount = Math.round(item.price * 100); // Convert to cents to avoid precision issues
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: item.quantity,
                };
            });

            // Add a line item for shipping
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Shipping",
                    },
                    unit_amount: Math.round(totalShippingAmount * 100),
                },
                quantity: 1,
            });

            const session = await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                invoice_creation: {
                    enabled: true,
                },
                custom_text: {
                    shipping_address: {
                        message: 'Kindly enter your delivery address, ensuring it matches the address provided during checkout. In case of a delivery address mismatch, we are not responsible for any delays in your package delivery.',
                    },
                },
                shipping_address_collection: {
                    allowed_countries: ['US', 'SO', 'IN'], // Add the countries you want to allow
                },
                line_items: lineItems,
                phone_number_collection: {
                    enabled: true,
                },
                success_url: `${request.headers.get("origin")}/thank-you`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });

            return NextResponse.json({ session });
        } else {
            return NextResponse.json({ message: "No Data Found" });
        }
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message });
    }
}
