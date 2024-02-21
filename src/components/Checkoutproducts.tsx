"use client";

import { useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import Prices from "./Prices";
import Image from "next/image";
import { ProductImageUrl } from "@/app/layout";

import { Product } from "@/data/data";
import { useTranslation } from "react-i18next";

const CheckoutProducts = ({ removeData = true, canNavigate = true }) => {
  const customerData = useAppSelector((state) => state.customerData);
  const { languageCode } = useAppSelector((store => store.languagesReducer))
  const { t } = useTranslation()
  const { cartItems } = useAppSelector((store) => store.cart);
  const pickupItems = JSON.parse(localStorage.getItem("pickupitems")) || [];
  const itemstoPick = cartItems.filter(item => pickupItems.includes(item.uniquepid))
  const itemstoShip = cartItems.filter(item => !pickupItems.includes(item.uniquepid))

  const renderProduct = (item: Product, index: number) => {
    const {
      ad_title,
      somali_ad_title,
      mrp,
      sellingprice,
      images,
      label,
      added_quantity,
      vendorInfo = []
    } = item;
    console.log(cartItems, "cccc");


    const { brand_name = "", vendorname = "" } = vendorInfo || []

    function getTitle() {
      const title = languageCode === "so" ? (somali_ad_title || ad_title) : ad_title;
      return title
    }

    return (
      <div
        key={index}
        className="relative flex py-2 lg:pt-4 lg:pb-2 px-2 my-2  rounded-md  border"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            fill
            src={`${ProductImageUrl}/${images?.[0]}`}
            alt={ad_title}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />

        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">

          <div className="flex justify-between ">
            <div className="flex-[1.5] ">
              <h3 className="text-base font-semibold line-clamp-2 w-11/12">
                {getTitle()}
              </h3>
              <div className="mt-1.5 sm:mt-2.5 flex flex-col text-sm text-gray-600 dark:text-gray-300">
                {/* <span className="mx-4 border-l border-gray-200 dark:border-gray-700 "></span> */}
                {label && (
                  <div className="flex mr-4 items-center space-x-1.5">
                    <span>{label} </span>
                  </div>
                )}
                {added_quantity && (
                  <div className="flex mr-4 items-center space-x-1.5">
                    <span>{`Qty : ${added_quantity}`} </span>
                  </div>
                )}
                <Prices
                  contentClass="py-1 md:py-1.5  text-sm font-medium h-full"
                  price={mrp}
                  sellingprice={sellingprice}
                />
              </div>
              <div className="py-4">
                <h1 className="text-sm"><b className="text-gray-700">Sell By :</b> {brand_name}, {vendorname}</h1>
              </div>

            </div>

          </div>


        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className=" p-4">
        {
          itemstoPick.length !== 0 &&
          <h1 className="text-xl text-green-600 text-center font-bold tracking-wider font-serif">ITEMS TO PICK</h1>
        }
        {
          itemstoPick &&
          itemstoPick?.map((item: any, index: number) =>
            renderProduct(item, index)
          )
        }
      </div>
      <div className=" p-4">
        {
          itemstoShip.length !== 0 &&
          <h1 className="text-xl text-green-600  text-center font-bold tracking-wider font-serif">ITEMS FOR SHIPPING</h1>
        }
        {
          itemstoShip &&
          itemstoShip?.map((item: any, index: number) =>
            renderProduct(item, index)
          )
        }
      </div>
    </div>
  )
};

export default CheckoutProducts
