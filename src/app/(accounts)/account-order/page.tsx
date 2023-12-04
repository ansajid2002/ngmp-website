"use client";

import { AdminUrl } from "@/app/layout";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import { useAppSelector } from "@/redux/store";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";

const AccountOrder = () => {
  const { cartItems } = useAppSelector((store) => store.cart);

  console.log(cartItems);

  const renderProductItem = (product: any, index: number) => {
    const { images, ad_title, id, sellingprice, mrp } = product;
    return (
      <Link href={`/orderdetails/${id}`}>
        <div key={index} className="flex p-2">
          <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <Image
              fill
              sizes="100px"
              src={
                `${AdminUrl}/uploads/UploadedProductsFromVendors/${images?.[0]}` ||
                "/placeholder.png"
              }
              alt={ad_title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between ">
                <div>
                  <h3 className="text-base font-medium line-clamp-1">
                    {ad_title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{"Natural"}</span>
                    <span className="mx-2 border-l border-gray-200 dark:border-gray-700 h-4"></span>
                    <span>{"XL"}</span>
                  </p>
                </div>
                <Prices
                  price={mrp}
                  sellingprice={sellingprice}
                  className="mt-0.5 ml-2"
                />
              </div>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500 dark:text-gray-400 flex items-center">
                <span className="hidden sm:inline-block">Qty</span>
                <span className="inline-block sm:hidden">x</span>
                <span className="ml-2">1</span>
              </p>

              <div className="flex">
                <Link href={`/orderdetails/${id}`}>
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
      </Link>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-gray-50 dark:bg-gray-500/5">
          <div>
            <p className="text-lg font-semibold">#WU3746HGG12</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5 sm:mt-2">
              <span>Aug 8, 2023</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">Delivered</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0"></div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-8 divide-y divide-y-gray-200 dark:divide-gray-700">
          {cartItems.map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
      {renderOrder()}
      {renderOrder()}
    </div>
  );
};

export default AccountOrder;
