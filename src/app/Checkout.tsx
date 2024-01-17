import { emptyCart } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/store"
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import getStripePromise from "@/utils/stripe"
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const StripeCheckButton = ({ mothodActive_ACTIVE, selectedAddress }: any) => {

    const { cartItems } = useAppSelector((store) => store.cart)
    const { customerData } = useAppSelector((store) => store.customerData)
    const { walletTotal } = useAppSelector((store) => store.wallet)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const calculateSubtotal = () => {
        let subtotal = 0;

        if (true) {
            cartItems.forEach((item: any) => {
                subtotal += parseFloat(item.sellingprice) * item.added_quantity;
            });
        }

        return subtotal;
    };

    const products = cartItems.map((item, index) => ({
        product: index + 1,
        name: item.ad_title,
        price: parseFloat(item.sellingprice),
        quantity: item.added_quantity,
        image: item.images?.[0]
    }));

    const checkoutData = [
        {
            orders: cartItems,
            shipping_address: selectedAddress,
            customerData: customerData,
            paymentIntent: [],
            selectedPaymentMode: mothodActive_ACTIVE
        }
    ]

    const handleClick = async () => {
        setLoading(true)
        if (mothodActive_ACTIVE === 'Wallet') {
            const response = await fetch(`/api/Customers/InsertOrders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify(checkoutData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            router.push('/thank-you', { scroll: false })
        } else if (mothodActive_ACTIVE === 'Stripe') {
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
        setLoading(false)
    }

    return (
        <div>
            {
                calculateSubtotal() <= walletTotal ? <ButtonPrimary
                    className={`w-full max-w-[240px] ${loading && 'animate-pulse'}`}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? 'Redirecting to checkout...' : 'Confirm order'}
                </ButtonPrimary> : <ButtonPrimary className="w-full max-w-[240px] bg-red-500">Insufficient Balance....</ButtonPrimary>
            }
            {/* <button onClick={handleClick}>Checkout</button> */}
        </div>
    )
}

export default StripeCheckButton 