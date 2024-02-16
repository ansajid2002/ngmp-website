"use client";

import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Prices from "./Prices";
import Link from "next/link";
import Image from "next/image";
import { AdminUrl, ProductImageUrl } from "@/app/layout";
import {
  decrementItem,
  incrementItem,
  removeItem,
} from "@/redux/slices/cartSlice";
import { Product } from "@/data/data";
import NcInputNumber from "./NcInputNumber";
import Divider from "./divider/Divider";
import { useTranslation } from "react-i18next";

const CartProducts = ({ removeData = true, canNavigate = true }) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useDispatch();
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id || null;
  const { languageCode } = useAppSelector((store => store.languagesReducer))
  const { t } = useTranslation()


  const renderProduct = (item: Product, index: number) => {
    const {
      ad_title,
      somali_ad_title,
      mrp,
      sellingprice,
      quantity,
      images,
      label,
      added_quantity,
      prod_slug,
      uniquepid,
     
      shippingCost,
     
      vendorInfo
    } = item;

    const { brand_name = "", vendorname = "" } = vendorInfo || []

    const handleRemove = async (item: any) => {
      try {

        dispatch(removeItem(item));

        const pickupitemsString = localStorage.getItem('pickupitems');

        // Parse the string array into an actual array
        const pickupitemsArray = JSON.parse(pickupitemsString) || [];

        // Filter the array based on the matching condition with item.uniquepid
        const matchingItems = pickupitemsArray?.filter(pickupitem => pickupitem === item.uniquepid);

        // Check if there are matching items
        if (matchingItems.length > 0) {
          // Stringify the matching items array
          const matchingItemsString = JSON.stringify(matchingItems);
          // Set the stringified array back to localStorage under the 'pickupitems' key
          localStorage.setItem('pickupitems', matchingItemsString);
        }

        if (customerId) {
          const { category, subcategory, uniquepid, label } = item;

          const replacecategory = category
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");
          const replacesubcategory = subcategory
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");

          // Construct the URL for your backend endpoint
          const apiUrl = "/api/DeleteCart";

          // Create the payload to send in the POST request
          const payload = {
            category: replacecategory,
            subcategory: replacesubcategory,
            product_uniqueid: uniquepid,
            customer_id: customerId,
            label: label || "empty",
          };

          // Make a POST request to your backend using async/await
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          // Handle success, update UI or perform any other action based on the response data
        }
      } catch (error) {
        console.error("Error removing product from cart:", error);
        // Handle error, show a message to the user, or retry the operation
      }
    };

    const handleIncrement = async (item: any) => {
      try {
        dispatch(incrementItem(item));

        if (customerId) {
          const { category, subcategory, uniquepid, vendorid, label } = item;
          const replacecategory = category
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");
          const replacesubcategory = subcategory
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");
          // Create an object with the data you want to send in the request body
          const requestData = {
            customer_id: customerId,
            vendor_id: vendorid,
            product_uniqueid: uniquepid,
            category: replacecategory,
            subcategory: replacesubcategory,
            added_quantity: 1, // Increment the quantity by 1
            variantlabel: label,
          };

          // Make a POST request to your API endpoint for updating the cart
          const response = await fetch(`/api/cart/addCarts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };

    const handleDecrement = async (item: any) => {
      try {
        dispatch(decrementItem(item));

        if (customerId) {
          const { category, subcategory, uniquepid, vendorid, label } = item;
          const replacecategory = category
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");
          const replacesubcategory = subcategory
            .replace(/[^\w\s]/g, "")
            .replace(/\s/g, "");
          // Create an object with the data you want to send in the request body
          const requestData = {
            customer_id: customerId,
            vendor_id: vendorid,
            product_uniqueid: uniquepid,
            category: replacecategory,
            subcategory: replacesubcategory,
            added_quantity: -1, // Decrement the quantity by 1
            variantlabel: label,
          };

          // Make a POST request to your API endpoint for updating the cart
          const response = await fetch(`/api/cart/addCarts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };

    const getvalueData = (i: number, type: string, data: any) => {
      // console.log(data);

      if (type === "inc") {
        handleIncrement(data);
      } else if (type === "dec") {
        handleDecrement(data);
      }
    };

    const storedDistrict = localStorage.getItem('selectedDistrict');


    const renderShippingAvailability = () => {
      return (
        <div>
          {

            vendorInfo?.company_district && storedDistrict ? <div className="flex">

              <h1 className="text-green-600 font-semibold text-sm md:text-lg">{t("Shipping Fee")} : ${shippingCost}, {t("From")} {vendorInfo?.company_district} {t("To")} {storedDistrict}</h1>
            </div> : (
              !vendorInfo?.company_district ? (
                <div className="flex">
                  <h1 className="text-red-600 font-semibold text-sm md:text-xl">{t("Only Pickup Available")}</h1>
                </div>
              ) : (
                !storedDistrict ? (
                  <div className="flex">
                    <a className="text-blue-600 font-semibold text-sm md:text-xl" href="/select-district" target="_blank">{t("Choose District")}</a>
                  </div>
                ) : (
                  <p>{t("Both mogadishudistrict_ship_from and storedDistrict are not present")}</p>
                )
              )
            )
          }

        </div>
      )
    }
    function getTitle() {
      const title = languageCode === "so" ? (somali_ad_title || ad_title) : ad_title;
      return canNavigate ? (
        <Link href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}>
          {title}
        </Link>
      ) : title;
    }

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            fill
            src={`${ProductImageUrl}/${images?.[0]}`}
            alt={ad_title}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          {
            canNavigate &&
            <Link
              href={{
                pathname: "/product-detail",
                query: { product: ad_title, uniqueid: uniquepid },
              }}
              className="absolute inset-0"
            ></Link>
          }
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
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

              <div className=" text-center relative">
                <NcInputNumber
                  defaultValue={added_quantity}
                  className="relative z-10"
                  onChange={getvalueData}
                  item={item}
                  max={quantity}
                />
              </div>

              {/* <div className="hidden flex-1 sm:flex justify-end">
                                <Prices price={mrp} sellingprice={sellingprice} className="mt-0.5" />
                            </div> */}
            </div>
          </div>

          {renderShippingAvailability()}
          {removeData && (
            <div className="flex mt-auto pt-4 items-end justify-between text-sm">
              <div className="flex">
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="font-medium text-primary-6000 dark:text-primary-500 "
                >
                  {t("Remove")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    cartItems &&
    cartItems.map((item: any, index: number) =>
      renderProduct(item, index)
    )
  )
};

export default CartProducts
