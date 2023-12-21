"use client";

import { AdminUrl } from "@/app/layout";
import Prices from "@/components/Prices";
import StarRating from "@/components/StarRating";
import { PRODUCTS } from "@/data/data";
import { useAppSelector } from "@/redux/store";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AccountOrder = () => {
  // const { cartItems } = useAppSelector((store) => store.cart);
  const customerData = useAppSelector((state) => state.customerData);
  const [Customerorder, setCustomerOrders] = useState(null)
  const [reviewItems, setReviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const customerId = customerData?.customerData?.customer_id || null
  const getAllCustomerOrder = async () => {
    if (customerId === null || customerId === undefined) {
      // Handle the case when customerId is null or undefined, such as displaying an error message or taking appropriate action.
      return;
    }
    try {
      const response = await fetch(`${AdminUrl}/api/getAllCustomerOrder/${customerId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const groupedOrders = data.reduce((acc, order) => {
        const orderId = order.orderid.toString();
        if (!acc[orderId]) {
          acc[orderId] = [];
        }
        acc[orderId].push(order);
        return acc;
      }, {});

      setCustomerOrders(groupedOrders);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderOrderGroup = (orderId: string, orders: any[]) => {
    return (
      <div key={orderId}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-gray-50 dark:bg-gray-500/5">
          <div>
            <p className="text-lg font-semibold">Order #{orderId}</p>
          </div>
          <div className="mt-3 sm:mt-0"></div>
        </div>
        <div className="p-2 md:p-4">
          {orders.map((order, index) => renderProductItem(order, index))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllCustomerOrder()
  }, [customerId])

  const fetchRatings = async () => {
    try {

      const response = await fetch(`${AdminUrl}/api/fetchRatings?customer_id=${customerId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data, 'darta');

        setReviewData(data?.ratingsData)

        // dispatch(updateReviewlistener(data?.ratingsData))
      } else {
        console.error('Failed to fetch ratings:', response.status);
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    // Fetch ratings when the component mounts
    customerId && !reviewItems && fetchRatings();
  }, [customerId]);

  const renderProductItem = (product: any, index: number) => {
    const { product_image, product_name, order_id, total_amount, quantity, order_status, label, product_uniqueid } = product;

    const ratingData = reviewItems && reviewItems.find((ratingItem: any) => {
      // Convert the product_uniqueid to an integer for comparison
      const itemProductUniqueId = parseInt(ratingItem.product_uniqueid, 10);

      if (label && ratingItem.label === label) {
        // Check if the label matches
        return true;
      } else if (itemProductUniqueId === product_uniqueid) {
        // Check if the product_uniqueid matches
        return true;
      }
      return false;
    });

    return (
      <div key={index} className="md:flex p-2">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            fill
            sizes="100px"
            src={
              `${AdminUrl}/uploads/UploadedProductsFromVendors/${product_image}` ||
              "/placeholder.png"
            }
            alt={product_name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="md:ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {product_name}
                </h3>

                <div className="md:flex gap-2 md:gap-4 items-center">
                  <h1 className={`text-lg font-semibold ${order_status === "Delivered" && "text-green-700"}`}>{order_status}</h1>

                  {
                    order_status === "Delivered" && <div className="md:ml-4">
                      <StarRating selectedRating={ratingData?.rating} ratingData={ratingData} item={product} />
                    </div>
                  }
                </div>
              </div>
              <Prices
                price={''}
                sellingprice={total_amount || ''}
                className="mt-0.5 ml-2"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{quantity}</span>
            </p>

            <div className="flex">
              <Link href={`/orderdetails/${order_id}`}>
                <ButtonSecondary
                  sizeClass="py-2.5 px-4 sm:px-6"
                  fontSize="text-sm font-medium"
                >
                  View Order
                </ButtonSecondary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden z-0">
        {Customerorder && Object.keys(Customerorder).map((orderId) => renderOrderGroup(orderId, Customerorder[orderId]))}
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
      {renderOrder()}
    </div>
  );
};

export default AccountOrder;
