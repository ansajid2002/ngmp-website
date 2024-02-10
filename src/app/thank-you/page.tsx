"use client";
import { useAppSelector } from "@/redux/store";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AdminUrl, ProductImageUrl } from "../layout";
import Link from "next/link";
import Swal from "sweetalert2";
import { emptyCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ThankYou = () => {
  const tax = 0;
  const dispatch = useDispatch()
  const router = useRouter()
  const { cartItems } = useAppSelector((store) => store.cart);
  const { customerData } = useAppSelector((state) => state.customerData)
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [sendedResponse, setSendedResponse] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const id = customerData?.customer_id || null


  const checkoutItems = localStorage.getItem('selectedOptions');
  const selectedPaymentMode = localStorage.getItem('selectedPaymentMode');

  const {languageCode} = useAppSelector((store=> store.languagesReducer))

  let pickupItemIds = [];

  // Parse the JSON string
  const selectedOptions = JSON.parse(checkoutItems);

  // Check if the selected option is "pickup" and store the item ID
  for (const itemId in selectedOptions) {
    if (selectedOptions[itemId] === 'pickup') {
      pickupItemIds.push(parseInt(itemId));
    }
  }


  const makePayment = async () => {
    try {
      setSendedResponse(false)
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
      setOrderData(cartItems || [])
      dispatch(emptyCart());
      localStorage.removeItem('selectedOptions')
      localStorage.removeItem('selectedPaymentMode')
    } catch (error) {
      console.log(error);
    }
  }

  const date = new Date();
  const order_date = date.toISOString();

  const checkoutData = [
    {
      orders: cartItems,
      shipping_address: defaultAddress,
      customerData: customerData,
      paymentIntent: [{ id: 'website' }],
      checkoutItems: pickupItemIds,
      order_date,
      selectedPaymentMode
    }
  ]

  useEffect(() => {
    const fetchAddress = async () => {
      // Replace 'backendAddressUrl' with the actual endpoint to fetch customer addresses
      const backendAddressUrl = `${AdminUrl}/api/getCustomersAddress/${id}`;

      try {
        const response = await fetch(backendAddressUrl);

        if (response.ok) {
          const data = await response.json();
          // Filter addresses with non-empty 'address' before updating the state
          const defaultAddress = data.find((address) => address.default_address === true);

          // Dispatch the default address
          if (defaultAddress) {
            setDefaultAddress(defaultAddress)
          }
        } else {
          // Handle non-2xx response
          console.error('Failed to fetch Address:', response.statusText);
          Swal.fire({
            icon: 'error',
            title: 'Fetch Error',
            text: 'Failed to fetch customer addresses.',
          });
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Failed to fetch Address:', error);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: 'Failed to fetch customer addresses.',
        });
      }
    };

    // Fetch addresses from the backend when the component mounts
    id && cartItems && fetchAddress();
  }, [id, cartItems]);

  // const { given_name_address, family_name_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, phone_address } = defaultAddress || []

  useEffect(() => {
    id && cartItems.length > 0 && defaultAddress && sendedResponse && (
      makePayment()
    )
  }, [id, cartItems, defaultAddress])

  const adjustedLength = orderData && orderData.length - 1;
  const totalSellingPrice = orderData && orderData.reduce(
    (total, item) => total + (parseFloat(item.sellingprice) * item.added_quantity),
    0
  );
  const totoalShipping = orderData && orderData.reduce(
    (total, item) => total + (parseFloat(item.shippingCost) || 0),
    0
  );

  const subtotal = totalSellingPrice && totalSellingPrice.toFixed(2);

  const total = parseFloat(subtotal) + parseFloat(totoalShipping);

  return (
    orderData ? <div className="py-10 px-5 md:px-20">
      <div className="space-y-3">
        <h1>
          Hey <span className="font-medium">{customerData?.given_name} {customerData?.family_name}</span>,
        </h1>
        <h2 className="flex items-end font-medium text-[#ed642b] gap-1 md:gap-2">
          <Check size={20} />
          <span>Your order is confirmed!</span>
        </h2>
        <p>
          Thanks for shopping! Your order
          <span className="text-[#ed642b] ml-1">
            {orderData && 
            {languageCode === "so" ? orderData[0]?.somali_ad_title === null ? orderData[0]?.ad_title : orderData[0]?.somali_ad_title : orderData[0]?.ad_title}            
}
          </span>{" "}
          {adjustedLength > 0 && (
            <>
              and
              <span className="text-[#ed642b] ml-1">
                {adjustedLength} more items
              </span>{" "}
            </>
          )}
          hasn't shipped, but we'll send you an email when it does.
        </p>

        <hr />

        <div className="py-2">
          <h2 className="font-medium">
            {/* Order: <span className="text-[#ed642b]">#156615-3165151164564</span> */}
          </h2>
        </div>

        <div className="md:flex items-center justify-between">
          <div className="pb-5 md:pb-0">
            <Link href={"/account-order"}>
              <h2 className="bg-[#ed642b] text-center md:text-left transition-all cursor-pointer ease-in-out hover:scale-105 text-white py-2 px-5 rounded-lg shadow-md">
                View or Manage Order
              </h2>
            </Link>
          </div>
          <div className="flex items-center justify-end md:justify-normal gap-5 text-gray-700 font-medium">
            <div className="text-right space-y-1">
              <h2>Sub-total</h2>
              <h2>Shipping Cost</h2>
              <h2 className="font-bold text-black">Total</h2>
            </div>
            <div className="text-right space-y-1">
              <h2>
                <span>$</span>
                {subtotal}
              </h2>
              <h3>
                <span>$</span>
                {totoalShipping}
              </h3>
              <h4 className="font-bold text-black">
                <span>$</span>
                {total}
              </h4>
            </div>
          </div>
        </div>

        <hr />

        <div>
          {orderData && orderData?.map((item: any, index: any) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex gap-2 items-center justify-start">
                <img
                  src={
                    item && item.images[0]
                      ? `${ProductImageUrl}/${item?.images?.[0]}`
                      : "/placeholder.png"
                  }
                  className="h-14 w-14 p-1 object-contain md:p-3 md:h-24 md:w-24"
                  alt="Product Image"
                />
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[0.95rem] md:text-lg font-medium line-clamp-1">
                  {languageCode === "so" ? item?.somali_ad_title === null ? item?.ad_title : item?.somali_ad_title : item?.ad_title}
                  </h2>
                  <h2 className="text-[#ed642b] font-medium text-sm">
                    <span className="text-gray-600 font-medium">Sold by: </span>
                    {item.vendorInfo.brand_name}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className="text-gray-700 font-medium md:text-lg">
                  ${item.sellingprice} x {item.added_quantity} = ${(item.sellingprice * item.added_quantity)?.toFixed(2)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> : "Loading..."
  );
};

export default ThankYou;
