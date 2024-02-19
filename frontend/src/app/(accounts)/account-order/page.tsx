"use client";

import { AdminUrl, ProductImageUrl } from "@/app/layout";
import Prices from "@/components/Prices";
import StarRating from "@/components/StarRating";
import { useAppSelector } from "@/redux/store";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcImage from "@/shared/NcImage/NcImage";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

const AccountOrder = () => {
  // const { cartItems } = useAppSelector((store) => store.cart);
  const customerData = useAppSelector((state) => state.customerData);
  const [Customerorder, setCustomerOrders] = useState(null);
  const [reviewItems, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const customerId = customerData?.customerData?.customer_id || null;
  const { t } = useTranslation()

  const getAllCustomerOrder = async () => {
    if (customerId === null || customerId === undefined) {
      // Handle the case when customerId is null or undefined, such as displaying an error message or taking appropriate action.
      return;
    }
    try {
      const response = await fetch(
        `${AdminUrl}/api/getAllCustomerOrder/${customerId}`
      );

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
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllCustomerOrder();
  }, [customerId]);

  const fetchRatings = async () => {
    try {
      const response = await fetch(
        `${AdminUrl}/api/fetchRatings?customer_id=${customerId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "darta");

        setReviewData(data?.ratingsData);

        // dispatch(updateReviewlistener(data?.ratingsData))
      } else {
        console.error("Failed to fetch ratings:", response.status);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    customerId && !reviewItems && fetchRatings();
  }, [customerId]);



  const formatOrderDate = (orderDate) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    const formattedDate = moment(orderDate);

    if (formattedDate.isSame(today, 'd')) {
      return `Today ${formattedDate.format('h:mm A')}`;
    } else if (formattedDate.isSame(yesterday, 'd')) {
      return `Yesterday ${formattedDate.format('h:mm A')}`;
    } else {
      return formattedDate.format('LLL'); // Adjust the format as needed
    }
  };

  const renderOrderGroup = (orderId: string, orders: any[]) => {
    return (
      <div key={orderId}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-gray-50 dark:bg-gray-500/5">
          <div>
            <p className="text-lg font-semibold">Order #{orderId}</p>
          </div>
          <div className="mt-3 sm:mt-0">{formatOrderDate(orders?.[0]?.order_date)}</div>

        </div>
        <div className="p-2 md:p-4">
          {orders.map((order, index) => renderProductItem(order, index))}
        </div>
      </div>
    );
  };



  const renderProductItem = (product: any, index: number) => {
    const {
      product_image,
      product_name,
      order_id,
      total_amount,
      quantity,
      order_status,
      label,
      product_uniqueid,
      ratings_and_reviews,
      ispickup,
      shipping_fee
    } = product;

    return (
      <div key={product_uniqueid + order_id + index} className="md:flex p-2">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <NcImage
            fill
            src={
              `${ProductImageUrl}/${product_image}` ||
              "/placeholder.png"
            }
            alt={product_name}
            containerClassName="flex aspect-w-3 aspect-h-3 w-full h-0"
            className="object-cover w-full h-full drop-shadow-xl aspect-[0.85]"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
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
                  <h1 className={`text-sm font-semibold ${ispickup ? 'text-green-500' : 'text-orange-600'}`}>
                    {
                      order_status.startsWith('Ret') ? (
                        <h3 className="mt-2 text-[#fb7701] font-semibold">{order_status}</h3>
                      ) : (
                        (order_status !== 'Delivered' && order_status !== 'Picked') ?
                          (ispickup ? 'Pickup' : 'Will be delivered soon...') : ''
                      )
                    }

                  </h1>
                  <h1 className={`text-lg font-semibold ${(order_status === "Delivered" || order_status === 'Picked') && "text-green-700"}`}>{(order_status === "Delivered" || order_status === 'Picked') && order_status}</h1>
                  {
                    order_status === 'Delivered' && <div className="">
                      <StarRating order_id={order_id} selectedRating={ratings_and_reviews?.[0]?.rating} ratingData={ratings_and_reviews} item={product} />
                    </div>
                  }
                </div>
              </div>
              <Prices
                price={""}
                sellingprice={(parseFloat(total_amount) * parseInt(quantity)) + parseFloat(shipping_fee || 0) || 0}
                className="mt-0.5 ml-2"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400 flex items-center">
              <p>{label || ''}</p>

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
                  {t("View Order")}
                </ButtonSecondary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    if (loading) {
      return <p>{t("Loading...")}</p>; // Add a loading state or handle it as you prefer
    }

    if (!Customerorder || !reviewItems) {
      return <p>{t("No order or review data available.")}</p>; // Handle the case when there is no order or review data
    }

    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden z-0">
        {Customerorder &&
          Object.keys(Customerorder).map((orderId) =>
            renderOrderGroup(orderId, Customerorder[orderId])
          )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <div className="hidden lg:block">
            {Array(3)
              .fill(null)
              .map(() => (
                <div className="flex gap-5 py-1 items-center">
                  <Skeleton height={100} width={100} />
                  <div>
                    <Skeleton height={40} width={500} />
                    <Skeleton height={20} width={300} />
                    <Skeleton height={20} width={200} />
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:hidden">
            {Array(3)
              .fill(null)
              .map(() => (
                <div className="flex gap-3 py-1 items-center">
                  <Skeleton height={80} width={80} />
                  <div>
                    <Skeleton height={30} width={200} />
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={100} />
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          {Customerorder && Object.keys(Customerorder).length !== 0 ? (
            <h2 className="text-2xl sm:text-3xl font-semibold">
              {t("Order History")}
            </h2>
          ) : (
            <></>
          )}

          {Customerorder && Object.keys(Customerorder).length !== 0 ? (
            renderOrder()
          ) : (
            <div>
              <h2 className=" text-2xl text-gray-600 lg:flex gap-2 items-center font-bold capitalize">
                {t("You haven't placed any orders yet!")}{" "}
                <Link
                  href={"/Channel/new-arrivals"}
                  className="text-[#ed642b] font-bold flex gap-1 items-center"
                >
                  {t("Shop Now")}
                  <ChevronRight size={20} className="mt-1.5" strokeWidth={3} />
                </Link>
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AccountOrder;
