import getStripePromise from "@/utils/stripe"

const StripeCheckButton = () => {

    const products = [
        {
            product: 1,
            name: 'Stripe',
            price: 400,
            quantity: 2
        }
    ]
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