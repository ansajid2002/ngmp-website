"use client";
import { useAppSelector } from "@/redux/store";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { useState } from "react";
import { formatCurrency } from "./AvailableToken";
import { useRouter } from "next/navigation";
import { ShippingModal } from '../components/Modals/ShippingModal'
const FetchCartPrice = ({ showTitle = true, showCheckout = true, checkoutLink = true }) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useRouter()

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
    const { subtotal, shippingCost } = calculateSubtotalAndShippingCost();

    const totalCost = (parseFloat(subtotal) + parseFloat(shippingCost)).toFixed(2);

    return totalCost;
  };

  // Example usage
  const totalCost = calculateTotalCost();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex-1">
      <div className="sticky top-28">
        {showTitle && <h3 className="text-lg font-semibold ">Order Summary</h3>}
        <div className="mt-7 text-sm text-gray-500 dark:text-gray-400 divide-y divide-gray-200/70 dark:divide-gray-700/80">
          <div className="flex justify-between pb-4">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {/* ${calculateSubtotal()} */}
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span>Shpping estimate</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {formatCurrency(shippingCost)}
            </span>
          </div>
          {/* <div className="flex justify-between py-4">
            <span>Tax estimate</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              0
            </span>
          </div> */}
          <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-200 text-base pt-4">
            <span>Order total</span>
            {/* <span>${calculateSubtotal()}</span> */}
            {formatCurrency(totalCost)}
          </div>
        </div>
        {showCheckout && (
          <>
            <ButtonPrimary onClick={() => {
              checkoutLink ? navigation.push('/checkout') : setIsModalVisible(true)
            }} className="mt-8 w-full">
              Continue to Pay {formatCurrency(totalCost)}
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
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </>
        )}
        <ShippingModal visible={isModalVisible} onCancel={handleCancel} cartItems={cartItems} />


      </div>
    </div >
  );
};

export default FetchCartPrice;
