"use client";
import { useAppSelector } from "@/redux/store";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { useState } from "react";
import { formatCurrency } from "./AvailableToken";
import { useRouter } from "next/navigation";
import { ShippingModal } from '../components/Modals/ShippingModal'
import { useTranslation } from "react-i18next";
import { AdminUrl } from "@/app/layout";


const FetchCheckoutPrice = ({ showTitle = true, showCheckout = true, checkoutLink = true, successOrders }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useRouter()
  const { cartItems } = useAppSelector((store) => store.cart);
  const pickupItems = JSON.parse(localStorage.getItem("pickupitems")) || [];
  // const itemstoPick = cartItems.filter(item => pickupItems.includes(item.uniquepid))
  const itemstoShip = successOrders ? successOrders.filter(item => !pickupItems.includes(item.uniquepid)) : cartItems.filter(item => !pickupItems.includes(item.uniquepid))

  const [totalShippingCharges, setTotalShippingCharges] = useState(0)
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

  const storedDistrict = localStorage.getItem('selectedDistrict');

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
  const subtotal = calculateCartSubtotal(successOrders || cartItems);
  console.log("Subtotal:", subtotal);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { t } = useTranslation()


  return (
    <div className="flex-1">
      <div className="sticky top-28">
        {showTitle && <h3 className="text-lg font-semibold ">{t("Order Summary")}</h3>}
        <div className="mt-7 text-sm text-gray-500 dark:text-gray-400 divide-y divide-gray-200/70 dark:divide-gray-700/80">
          <div className="flex justify-between pb-4">
            <span>{t("Subtotal")}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {/* ${calculateSubtotal()} */}
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span>{t("Shipping estimate")}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {formatCurrency(totalShippingCharges)}
            </span>
          </div>
          {/* <div className="flex justify-between py-4">
            <span>Tax estimate</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              0
            </span>
          </div> */}
          <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-200 text-base pt-4">
            <span>{t("Order total")}</span>
            {/* <span>${calculateSubtotal()}</span> */}
            {formatCurrency((subtotal + totalShippingCharges).toFixed(2))}
          </div>
        </div>
        {showCheckout && (
          <>
            <ButtonPrimary onClick={() => {
              checkoutLink ? navigation.push('/checkout') : setIsModalVisible(true)
            }} className="mt-8 w-full">
              {t("Continue to Pay")} {formatCurrency((subtotal + totalShippingCharges).toFixed(2))}
            </ButtonPrimary>
            <div className="mt-5 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("Learn more")}{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  {t("Taxes")}
                </a>
                <span>
                  {` `}{t("and")}{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  {t("Shipping")}
                </a>
                {` `} {t("infomation")}
              </p>
            </div>
          </>
        )}
        <ShippingModal visible={isModalVisible} onCancel={handleCancel} cartItems={cartItems} />


      </div>
    </div >
  );
};

export default FetchCheckoutPrice;
