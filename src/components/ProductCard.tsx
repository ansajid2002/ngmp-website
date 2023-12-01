"use client";

import React, { FC, useEffect, useState } from "react";
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
import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { Rate } from "antd";

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
  const { ad_title, mrp, sellingprice, images, uniquepid, prod_slug } = data;
  const [inFavorite, setinFavorite] = useState(false);
  const { wishlistItems } = useAppSelector((store) => store.wishlist);

  const discountPercentage = ((mrp - sellingprice) / mrp) * 100;

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
  //           src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${images?.[0]}`}
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
          className="shadow-lg"
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

  // console.log(process.env.BASEURL);

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col rounded-lg overflow-hidden hover:shadow-md p-1 py-2 bg-transparent ${className}`}
      >
        <Link href={"/product-detail"} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-gray-50 dark:bg-gray-300  overflow-hidden z-1 group">
          <Link
            href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}
            title={`${ad_title}`}
            className="block overflow-hidden group"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <NcImage
                containerClassName="flex aspect-w-3 aspect-h-3 w-full h-0"
                src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${images?.[0]}`}
                className="object-contain w-full h-full drop-shadow-xl"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="product"
              />
            </div>
          </Link>
          {discountPercentage > 50 && (
            <ProductStatus
              status={"Discount"}
              value={`${discountPercentage.toFixed(2)} Off`}
            />
          )}
          <LikeButton
            liked={inFavorite}
            className="absolute top-3 end-3 z-10 transition-all ease-in-out hover:scale-110"
          />
          {/* {renderSizeList()} */}
          {renderGroupButtons()}
        </div>

        <div className="space-y-0 px-1 pt-2 pb-1">
          {/* {renderVariants()} */}
          {/* <div> */}
          {showTitle && (
            <h2 className="nc-ProductCard__title text-[0.9rem] font-medium transition-colors line-clamp-1">
              {ad_title}
            </h2>
          )}
          {/* <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 `}>
              {additionaldescription}
            </p> */}
          {/* </div> */}

          <div className="">
            <Prices price={mrp} sellingprice={sellingprice} />
            <div className="flex items-center gap-1 mb-0.5">
              <Rate
                allowHalf
                disabled
                value={4.7}
                className="text-xs text-[#ED642B]"
              />
              <span className="text-sm font-medium text-[#ED642B]">(352)</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        item={data}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
