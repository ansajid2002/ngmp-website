"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { AdminUrl, HomeUrl, ProductImageUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { Rate } from "antd";
import { Loader2Icon } from "lucide-react";
import { Button, Modal } from "antd";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";
import SignIn from "@/app/auth/signIn/page";
import ProductSalebadge from "./ProductSalebadge";
import ProductOfferBadge from "./ProductOfferBadge";
import { useTranslation } from "react-i18next";


export interface ProductCardProps {
  className?: string;
  data?: Product;
  showTitle?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  showTitle = true,
}) => {

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { ad_title, mrp, sellingprice, images, uniquepid, prod_slug ,somali_ad_title} = data;
  const [inFavorite, setinFavorite] = useState(false);
  const { wishlistItems } = useAppSelector((store) => store.wishlist);

  const { customerData } = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customer_id || null;

  const discountPercentage = ((mrp - sellingprice) / mrp) * 100;
  const { t } = useTranslation()
  const {languageCode} = useAppSelector((store=> store.languagesReducer))

  const [ratingData, setRating] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there's an item in wishlistItems with a matching uniquepid
    const isFavorite =
      wishlistItems &&
      wishlistItems?.some(
        (wish) => wish.uniquepid.toString() === uniquepid.toString()
      );

    // Set the result in inFavorite state
    setinFavorite(isFavorite);
  }, [wishlistItems]);

  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // const notifyAddTocart = ({ size }: { size?: string }) => {
  //   toast.custom(
  //     (t) => (
  //       <Transition
  //         appear
  //         show={t.visible}
  //         className="p-4 max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-gray-900 dark:text-gray-200"
  //         enter="transition-all duration-150"
  //         enterFrom="opacity-0 trangray-x-20"
  //         enterTo="opacity-100 trangray-x-0"
  //         leave="transition-all duration-150"
  //         leaveFrom="opacity-100 trangray-x-0"
  //         leaveTo="opacity-0 trangray-x-20"
  //       >
  //         <p className="block text-base font-semibold leading-none">
  //           Added to cart!
  //         </p>
  //         <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
  //         {renderProductCartOnNotify({ size })}
  //       </Transition>
  //     ),
  //     {
  //       position: "top-right",
  //       id: String(id) || "product-detail",
  //       duration: 3000,
  //     }
  //   );
  // };

  // const renderProductCartOnNotify = ({ size }: { size?: string }) => {
  //   return (
  //     <div className="flex ">
  //       <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
  //         <Image
  //           width={80}
  //           height={96}
  //           src={`${ProductImageUrl}/${images?.[0]}`}
  //           alt={ad_title}
  //           className="absolute object-cover object-center"
  //         />
  //       </div>

  //       <div className="ms-4 flex flex-1 flex-col">
  //         <div>
  //           <div className="flex justify-between ">
  //             <div>
  //               <h3 className="text-base font-medium ">{ad_title}</h3>
  //               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  //                 <span>{label}</span>
  //               </p>
  //             </div>
  //             <Prices price={mrp} sellingprice={sellingprice} className="mt-0.5" />
  //           </div>
  //         </div>
  //         <div className="flex flex-1 items-end justify-between text-sm">
  //           <p className="text-gray-500 dark:text-gray-400">Qty 1</p>

  //           <div className="flex">
  //             <button
  //               type="button"
  //               className="font-medium text-primary-6000 dark:text-primary-500 "
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 router.push("/cart");
  //               }}
  //             >
  //               View cart
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="hidden md:flex shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1 pl-1.5 text-[14px]">Quick view</span>
        </ButtonPrimary>
      </div>
    );
  };

  const handleToggleWishlist = useCallback(async () => {
    console.log(customerId, "cliecked");

    if (!customerId) {
      router.push("/auth/signIn")
    } else {
      console.log("true");

      setWishlistLoading(true);
      const {
        category,
        subcategory,
        uniquepid,
        vendorid,
        mrp,
        sellingprice,
        label,
      } = data;
      const replacecategory = category
        .replace(/[^\w\s]/g, "")
        .replace(/\s/g, "");
      const replacesubcategory = subcategory
        .replace(/[^\w\s]/g, "")
        .replace(/\s/g, "");
      const requestData = {
        customer_id: customerId,
        vendor_id: vendorid,
        uniquepid,
        category: replacecategory,
        subcategory: replacesubcategory,
        label,
        mrp,
        sellingprice,
      };

      if (!inFavorite) {
        dispatch(addItemToWishlist({ ...data }));

        if (customerId) {
          try {
            // Make a POST request to your API endpoint for updating the cart
            const response = await fetch(`/api/wishlist/addWishlist`, {
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
            toast.success("Added to Wishlist");
            setWishlistLoading(false);

            setinFavorite(true);
          } catch (error) {
            console.error("Error updating wishlist:", error);
          }
        }
      } else {
        dispatch(removeItemFromWishlist({ ...data }));
        if (customerId) {
          try {
            // Make a POST request to your API endpoint for updating the wishlist
            const response = await fetch(`/api/wishlist/removeFromWishlist`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            toast.success("Removed From Wishlist");
            setWishlistLoading(false);

            setinFavorite(false);
          } catch (error) {
            console.error("Error updating wishlist:", error);
          }
        }
      }
    }
  }, [customerId, dispatch, inFavorite, data, setinFavorite]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchRating = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/fetchRatings?product_id=${uniquepid}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const ratingdata = await response.json()

      setRating(ratingdata?.ratingsData || [])
      // const data = await response.json();
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    uniquepid && fetchRating()
  }, [uniquepid])

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col overflow-hidden hover:shadow-md p-1 py-2 bg-transparent ${className}`}
      >
        <Link href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-gray-50 dark:bg-gray-300  overflow-hidden z-1 group">
          <Link
            href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}
            title={`${ad_title}`}
            className="block overflow-hidden group"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <NcImage
                containerClassName="flex aspect-w-3 aspect-h-3 w-full h-0"
                src={`${ProductImageUrl}/${images?.[0]}`}
                className="object-cover w-full h-full drop-shadow-xl aspect-[0.85]"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="product"
              />

            </div>
          </Link>
          {/* {discountPercentage  && (
            <ProductStatus
              status={"Discount"}
              value={`${discountPercentage.toFixed(2)} Off`}
            />
          )} */}
          <div>
            {wishlistLoading ? (
              <div className="mt-2 w-9 h-9 absolute top-3 end-3 z-10 transition-all ease-in-out hover:scale-110 flex items-center justify-center">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              <div
                className="mt-2 absolute top-3 end-3 z-10 transition-all ease-in-out hover:scale-110"
                onClick={handleToggleWishlist}
              >
                {/* <LikeButton  data="hey" /> */}
                {/* /////////////////////////////button COMPONENT/////////////////////////// */}
                <button
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 text-neutral-700 dark:text-gray-200 nc-shadow-lg ${className}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                      stroke={inFavorite ? "#ef4444" : "currentColor"}
                      fill={inFavorite ? "#ef4444" : "none"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* /////////////////////////////button COMPONENT/////////////////////////// */}
              </div>
            )}
          </div>
          {/* className="absolute top-3 end-3 z-10 transition-all ease-in-out hover:scale-110" */}
          {/* {renderSizeList()} */}
          {renderGroupButtons()}
        </div>

        <div className="space-y-0 px-1 pt-2">
          {/* {renderVariants()} */}
          {/* <div> */}
          {showTitle && (
            <h2 className="nc-ProductCard__title  text-sm mb-1.5 font-medium transition-colors line-clamp-2">
             {languageCode === "so" ? somali_ad_title === null ? ad_title : somali_ad_title : ad_title}
            </h2>
          )}
          {/* <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 `}>
              {additionaldescription}
            </p> */}
          {/* </div> */}

          <div className="">
            <Prices price={mrp} sellingprice={sellingprice} />
            {
              <div className="flex items-center gap-1 ">
                <Rate
                  allowHalf
                  disabled
                  value={(ratingData?.[0]?.averageRating)?.toFixed(2) || 2}
                  className="text-[10px] sm:text-sm text-green-800"
                />
                <span className="text-sm ml-2 font-medium text-green-800">({(ratingData?.[0]?.averageRating)?.toFixed(2) || 2})</span>
              </div>
            }
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        item={data}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button className="hidden" key="cancel" onClick={handleCancel}>
            {t("Cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            className=" hidden"
            onClick={handleOk}
          >
            {t("Submit")}
          </Button>,
        ]}
      >
        <SignIn />
      </Modal>
    </>
  );
};

export default ProductCard;
