import { addsuccessOrders, emptyCart } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/store"
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminUrl } from "@/app/layout";
import { getwalletTotal } from "@/redux/slices/walletSlice";


const StripeCheckButton = ({ mothodActive_ACTIVE = 'Stripe', selectedAddress }: any) => {

  const { cartItems } = useAppSelector((store) => store.cart)
  const { customerData } = useAppSelector((store) => store.customerData)
  const { walletTotal } = useAppSelector((store) => store.wallet)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { languageCode } = useAppSelector((store => store.languagesReducer))
  const [totalShippingCharges, setTotalShippingCharges] = useState(0)
  const pickupItems = JSON.parse(localStorage.getItem("pickupitems")) || [];
  const itemstoPick = cartItems.filter(item => pickupItems.includes(item.uniquepid))
  const itemstoShip = cartItems.filter(item => !pickupItems.includes(item.uniquepid))
  const storedDistrict = localStorage.getItem('selectedDistrict');
  const renderCost = async (company_district: string, storedDistrict: string) => {
    try {
      if (company_district) {

        const response = await fetch(`${AdminUrl}/api/getShippingRate?origin=${company_district}&destination=${storedDistrict}`)
        if (response.ok) {
          const data = await response.json()


          if (data.rate === 0) {
            return 0
          }
          else {
            // setShippingrate(data.rate)
            return data.rate
          }
        }
        else {
          console.log("fetching failed ");
        }
      }
    } catch (error) {
      console.log(error, "ERROR FETCHING RATES");
    }
    return 0
  }

  const calculateShippingCharges = async (cartItems) => {
    // Create a Set to keep track of visited vendorIds
    const visitedVendorIds = new Set();

    // Initialize total shipping charges
    let totalShippingCharges = 0;

    // Iterate through each cart item and calculate shipping charges
    for (const item of cartItems) {
      const { vendorid, vendorInfo } = item;
      const { company_district } = vendorInfo;


      // Check if the vendorId has been visited already
      if (!visitedVendorIds.has(vendorid)) {
        // Call the renderCost function to get shipping charges
        const shippingCharges = await renderCost(company_district, storedDistrict);

        // Add shipping charges to the total
        totalShippingCharges += shippingCharges;

        // Add the vendorId to the visited set
        visitedVendorIds.add(vendorid);
      }
    }

    return totalShippingCharges;
  };

  // Call the function with your array of objects
  calculateShippingCharges(itemstoShip).then((totalShippingCharges) => {

    setTotalShippingCharges(totalShippingCharges)
  });

  console.log(totalShippingCharges, 'shippin');

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Function to calculate subtotal for an individual item
  const calculateItemSubtotal = (sellingprice, quantity) => {
    return parseFloat(sellingprice) * quantity;
  };

  // Function to calculate subtotal for the entire cart
  const calculateCartSubtotal = (cartItems) => {
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += calculateItemSubtotal(item.sellingprice, item.added_quantity);
    }
    return subtotal;
  };

  // Calculate subtotal for the entire cart
  const subtotal = calculateCartSubtotal(cartItems);

  const uniqueProductIds = cartItems
    ?.filter(product => product.vendorInfo?.company_district === null)
    .map(product => product.uniquepid);


  const checkoutData = [
    {
      orders: cartItems,
      shipping_address: selectedAddress,
      customerData: customerData,
      paymentIntent: [],
      selectedPaymentMode: mothodActive_ACTIVE,
      order_date: new Date().toISOString(),
      checkoutItems: uniqueProductIds || [],
      shippingRate: totalShippingCharges
    }
  ]


  const handleClick = async () => {
    setLoading(true)
    localStorage.setItem('selectedPaymentMode', mothodActive_ACTIVE)
    const handlePayment = async () => {
      try {
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

        localStorage.removeItem('selectedOptions');
        localStorage.removeItem('selectedPaymentMode');

        const responseData = await response.json();
        dispatch(addsuccessOrders(cartItems))
        dispatch(getwalletTotal(responseData?.walletamount))

        router.push(`/thank-you`)
        // dispatch(emptyCart())

        // if (responseData) {

        //     router.push({
        //         pathname: '/thank-you',
        //         query: { data: JSON.stringify(responseData) },
        //     });
        // }

        // router.push("/thank-you")
      } catch (error) {
        console.error('Error during payment:', error);
        // Handle error as needed
      }
    };

    if (mothodActive_ACTIVE === 'Wallet') {
      await handlePayment();
    }
    // else if (mothodActive_ACTIVE === 'Stripe') {


    //     const stripe = await getStripePromise()

    //     const response = await fetch("/api/Checkout", {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         cache: "no-cache",
    //         body: JSON.stringify({ products })
    //     })

    //     const data = await response.json()
    //     if (data.session) {

    //         // stripe?.redirectToCheckout({ sessionId: data.session.url })
    //         window.location.href = data.session.url
    //     }
    // }
    setLoading(false)
  }

  return (
    <div>
      {
        mothodActive_ACTIVE !== 'Wallet' || parseFloat(walletTotal) >= subtotal + totalShippingCharges ? <ButtonPrimary
          className={`w-full tracking-wide max-w-[240px] ${loading && 'animate-pulse'}`}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Processing Payment...' : `Pay $${subtotal + totalShippingCharges || 0}`}
        </ButtonPrimary> : <ButtonPrimary className="w-full max-w-[240px] bg-red-500">Insufficient Balance....</ButtonPrimary>
      }
    </div>
  )
}

export default StripeCheckButton 