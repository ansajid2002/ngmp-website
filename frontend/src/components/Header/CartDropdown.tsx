"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { Fragment } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { AdminUrl, ProductImageUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { removeItem } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";


export default function CartDropdown() {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useDispatch();
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id || null;
  const {languageCode} = useAppSelector((store=> store.languagesReducer))

  
const {t} = useTranslation()
  const renderProduct = (item: Product, index: number, close: () => void) => {
    const {
      ad_title,
      somali_ad_title,
      mrp,
      sellingprice,
      images,
      label,
      added_quantity,
      prod_slug,
      uniquepid,
    } = item;

    const handleRemove = async (item: any) => {
      try {
        dispatch(removeItem(item));
        console.log(item);

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

    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            fill
            src={`${ProductImageUrl}/${images?.[0]}`}
            alt={ad_title}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link
                    onClick={close}
                    className="line-clamp-2"
                    href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}
                  >
                   {languageCode === "so" ? somali_ad_title === null ? ad_title : somali_ad_title : ad_title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {/* <span>{`Natural`}</span>
                  <span className="mx-2 border-l border-gray-200 dark:border-gray-700 h-4"></span> */}
                  <span>{label}</span>
                </p>
              </div>
              <Prices
                price={mrp}
                sellingprice={sellingprice}
                className="mt-0.5"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400">{`Qty ${added_quantity}`}</p>

            <div className="flex">
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                {t(`Remove`)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    if (cartItems) {
      cartItems.forEach((item: any) => {
        subtotal += parseFloat(item.sellingprice) * item.added_quantity;
      });
    }

    return subtotal.toFixed(2);
  };

  // console.log(cartItems, "CARTTTTTTT");

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">{cartItems.length || 0}</span>
            </div>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 trangray-y-1"
            enterTo="opacity-100 trangray-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 trangray-y-0"
            leaveTo="opacity-0 trangray-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    {cartItems.length === 0 ? (
                      <div className="py-10 text-center">
                        <h2 className="text-2xl text-gray-700 font-bold capitalize">
                          {t(`No item in your cart!`)}
                        </h2>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">{t(`Shopping cart`)}</h3>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {cartItems &&
                            cartItems.map((item: any, index: number) =>
                              renderProduct(item, index, close)
                            )}
                        </div>
                      </>
                    )}
                  </div>
                  {cartItems.length === 0 ? (
                    <></>
                  ) : (
                    <div className="bg-neutral-50 dark:bg-gray-900 p-5">
                      <p className="flex justify-between font-semibold text-gray-900 dark:text-gray-100">
                        <span>
                          <span>{t(`Subtotal`)}</span>
                          <span className="block text-sm text-gray-500 dark:text-gray-400 font-normal">
                            {t(`Shipping and taxes calculated at checkout.`)}
                          </span>
                        </span>
                        <span className="">${calculateSubtotal()}</span>
                      </p>
                      <div className="flex space-x-2 mt-5">
                        <ButtonSecondary
                          href="/cart"
                          className="flex-1 border border-gray-200 dark:border-gray-700"
                          onClick={close}
                        >
                          {t(`View cart`)}
                        </ButtonSecondary>
                        <ButtonPrimary
                          href="/checkout"
                          onClick={close}
                          className="flex-1"
                        >
                          {t(`Check out`)}
                        </ButtonPrimary>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
