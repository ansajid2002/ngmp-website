"use client";
import { useAppSelector } from "@/redux/store";
import { Action } from "@radix-ui/react-alert-dialog";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { AdminUrl } from "../layout";
import Link from "next/link";

const page = () => {
  const tax = 6.25;

  const { cartItems } = useAppSelector((store) => store.cart);
  const { customerData } = useAppSelector((store) => store.customerData);

  //   console.log(cartItems);

  const adjustedLength = cartItems.length - 1;
  const totalSellingPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.sellingprice),
    0
  );
  //   console.log(totalSellingPrice.toFixed(2), "TOTAL");

  const subtotal = totalSellingPrice.toFixed(2);
  //   console.log(subtotal, "SUB");
  //   console.log(tax, "TAX");

  const total = parseFloat(subtotal) + parseFloat(tax);

  //   console.log(total, "TOTAL");

  //   const total = subtotal + tax;

  //   console.log(customerData);

  //   console.log(cartItems, "CARTITEMSSSS");

  return (
    <div className="py-10 px-5 md:px-20">
      <div className="space-y-3">
        <h1>
          Hey <span className="font-medium">{customerData.given_name}</span>,
        </h1>
        <h2 className="flex items-end font-medium text-[#ed642b] gap-1 md:gap-2">
          <Check size={20} />
          <span>Your order is confirmed!</span>
        </h2>
        <p>
          Thanks for shopping! Your order
          <span className="text-[#ed642b] ml-1">
            {cartItems[0]?.ad_title}
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
            Order: <span className="text-[#ed642b]">#156615-3165151164564</span>
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
              <h2>+ Tax</h2>
              <h2 className="font-bold text-black">Total</h2>
            </div>
            <div className="text-right space-y-1">
              <h2>
                <span>$</span>
                {subtotal}
              </h2>
              <h3>
                <span>$</span>
                {tax}
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
          {cartItems?.map((item: any, index: any) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex gap-2 items-center justify-start">
                <img
                  src={
                    item && item.images[0]
                      ? `${AdminUrl}/uploads/UploadedProductsFromVendors/${item?.images?.[0]}`
                      : "/placeholder.png"
                  }
                  className="h-14 w-14 p-1 object-contain md:p-3 md:h-24 md:w-24"
                  alt="Product Image"
                />
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[0.95rem] md:text-lg font-medium line-clamp-1">
                    {item.ad_title}
                  </h2>
                  <h2 className="text-[#ed642b] font-medium text-sm">
                    <span className="text-gray-600 font-medium">Sold by: </span>
                    {item.vendorInfo.brand_name}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className="text-gray-700 font-medium md:text-lg">
                  ${item.sellingprice}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
