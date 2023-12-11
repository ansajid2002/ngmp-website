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
                        message: 'Please provide your shipping address for delivery.',
                    },
                    submit: {
                        message: 'Thank you for submitting your order.',
                    },
                },
                shipping_address_collection: {
                    allowed_countries: ['US', 'SO', 'IN'], // Add the countries you want to allow
                },
                line_items: body.products.map((item: any) => {
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,

                        },
                        quantity: item.quantity,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                        },
                    };
                }),
                phone_number_collection: {
                    enabled: true,
                },
                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });
            return NextResponse.json({ session });
        } else {
            return NextResponse.json({ message: "No Data Found" });
        }
    } catch (err: any) {
        console.log(err);
        return NextResponse.json(err.message);
    }
}