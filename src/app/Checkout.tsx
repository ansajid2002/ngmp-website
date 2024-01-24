import { emptyCart } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/store"
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import getStripePromise from "@/utils/stripe"
import { useStripe, useElements, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const StripeCheckButton = ({ mothodActive_ACTIVE = 'Stripe', selectedAddress }: any) => {

    const { cartItems } = useAppSelector((store) => store.cart)
    const { customerData } = useAppSelector((store) => store.customerData)
    const { walletTotal } = useAppSelector((store) => store.wallet)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // const calculateSubtotal = () => {
    //     let subtotal = 0;

    //     if (true) {
    //         cartItems.forEach((item: any) => {
    //             subtotal += parseFloat(item.sellingprice) * item.added_quantity;
    //         });
    //     }

    //     return subtotal;
    // };

    const calculatePRICE = () => {
        return cartItems.map((item) => {
            const price = item.sellingprice > 0 ? parseFloat(item.sellingprice) : parseFloat(item.mrp);
            return price;
        });
    };


    const calculateSubtotalAndShippingCost = () => {
        let subtotal = 0;
        let totalShippingCost = 0;

        if (true) {
            cartItems.forEach((item: any) => {
                subtotal += parseFloat(item.sellingprice) * item.added_quantity;

                // Check if the selected option is 'pickup' before calculating shippingCost
                if (item.selectedOption !== 'pickup') {
                    totalShippingCost += parseFloat(item.shippingCost) || 0;
                }
            });
        }

        return {
            subtotal: subtotal.toFixed(2),
            shippingCost: totalShippingCost.toFixed(2),
        };
    };

    // Example usage

    const { subtotal, shippingCost } = calculateSubtotalAndShippingCost();

    const calculateTotalCost = () => {

        const totalCost = (parseFloat(subtotal) + parseFloat(shippingCost)).toFixed(2);

        return totalCost;
    };

    // Example usage
    const totalCost = calculateTotalCost();


    const products = cartItems.map((item, index) => ({
        product: index + 1,
        name: item.ad_title,
        price: calculatePRICE()[index], // Access the calculated price by index
        quantity: item.added_quantity,
        image: item.images?.[0],
        shippingCost
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
        localStorage.setItem('selectedPaymentMode', mothodActive_ACTIVE)
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

                // stripe?.redirectToCheckout({ sessionId: data.session.url })
                window.location.href = data.session.url
            }
        }
        setLoading(false)
    }

    return (
        <div>
            {
                mothodActive_ACTIVE !== 'Wallet' || parseFloat(walletTotal) >= totalCost ? <ButtonPrimary
                    className={`w-full max-w-[240px] ${loading && 'animate-pulse'}`}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? 'Redirecting to checkout...' : `Pay ${totalCost || 0}`}
                </ButtonPrimary> : <ButtonPrimary className="w-full max-w-[240px] bg-red-500">Insufficient Balance....</ButtonPrimary>
            }
        </div>
    )
}

export default StripeCheckButton 