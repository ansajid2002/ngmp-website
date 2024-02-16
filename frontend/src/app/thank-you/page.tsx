"use client";
import { useAppSelector } from "@/redux/store";
import { Check, CheckCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AdminUrl, ProductImageUrl } from "../layout";
import Link from "next/link";
import Swal from "sweetalert2";
import { emptyCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import FetchCheckoutPrice from "@/components/FetchCheckoutPrice";

const ThankYou = () => {
  const router = useRouter();
  const { customerData } = useAppSelector((state) => state.customerData)
  const [defaultAddress, setDefaultAddress] = useState(null);
  // console.log(router.query,"qqqq");
  const { cartItems, successOrders } = useAppSelector((store => store.cart))
  console.log(cartItems, "ddd");
  const searchParams = useSearchParams()
  const search = searchParams.get('orderId')
  console.log(search, "searchparams");

  const dispatch = useDispatch()


  const id = customerData?.customer_id || null

  const { languageCode } = useAppSelector((store => store.languagesReducer))


  useEffect(() => {
    successOrders.length === 0 ? router.push("/") : ""
  }, [successOrders])

  useEffect(() => {

    dispatch(emptyCart())
    if (successOrders.length === 0) {
      router.push("/")
    }
    else {

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

      id && successOrders && fetchAddress();

    }

    // Fetch addresses from the backend when the component mounts
  }, [id, successOrders]);

  // const { given_name_address, family_name_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, phone_address } = defaultAddress || []
  console.log(successOrders, "succsxx");


  const adjustedLength = successOrders && successOrders.length - 1;
  const totalSellingPrice = successOrders && successOrders.reduce(
    (total, item) => total + (parseFloat(item.sellingprice) * item.added_quantity),
    0
  );
  const totoalShipping = successOrders && successOrders.reduce(
    (total, item) => total + (parseFloat(item.shippingCost) || 0),
    0
  );

  const subtotal = totalSellingPrice && totalSellingPrice.toFixed(2);

  const total = parseFloat(subtotal) + parseFloat(totoalShipping);

  return (
    successOrders ? <div className="py-10 px-5 md:px-20">
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
            {successOrders[0].ad_title}

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

        <div className="">
          <div className="pb-5 md:pb-0 mb-4">
            <Link href={"/account-order"}>
              <h2 className="bg-[#ed642b] w-full md:w-2/4 text-center md:text-left transition-all cursor-pointer ease-in-out hover:scale-105 text-white py-2 px-5 rounded-lg shadow-md">
                View or Manage Order
              </h2>
            </Link>
          </div>
          <div className="flex-1 md:ml-4 items-center justify-end md:justify-normal gap-5 text-gray-700 font-medium">
            {/* <div className="text-right space-y-1">
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
            </div> */}
          </div>
        </div>

        <hr />

        <div>
          {successOrders && successOrders?.map((item: any, index: any) => (
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
                  </h2 >
                  <h2 className="text-[#ed642b] font-medium text-sm">
                    <span className="text-gray-600 font-medium">Sold by: </span>
                    {item.vendorInfo.brand_name}
                  </h2>
                </div >
              </div >
              <div>
                <h2 className="text-gray-700 font-medium md:text-lg">
                  ${item.sellingprice} x {item.added_quantity} = ${(item.sellingprice * item.added_quantity)?.toFixed(2)}
                </h2>
              </div>
            </div >
          ))}
        </div >

        <FetchCheckoutPrice successOrders={successOrders} showCheckout={false} />

      </div >
    </div > : "Loading..."
  );
};

export default ThankYou;
