import { useAppSelector } from "@/redux/store"
import getStripePromise from "@/utils/stripe"
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';

const StripeCheckButton = () => {
    const { cartItems } = useAppSelector((store) => store.cart)


    const products = cartItems.map((item, index) => ({
        product: index + 1,
        name: item.ad_title,
        price: parseFloat(item.sellingprice),
        quantity: item.added_quantity,
        image: item.images?.[0]
    }));

    const handleClick = async () => {
        const stripe = await getStripePromise()

        const response = await fetch("/api/Checkout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            cache: "no-cache",
            body: JSON.stringify({ products })
        })

        const data = await response.json()
        if (data.session) {
            console.log(data);
            // stripe?.redirectToCheckout({ sessionId: data.session.url })
            window.location.href = data.session.url
        }

    }

    return (
        <div>
            <button onClick={handleClick}>Checkout</button>
        </div>
    )
}

export default StripeCheckButton 