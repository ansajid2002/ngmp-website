import React, { FC } from "react";
import { Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";

interface Props {
  show: boolean;
  productImage: string | StaticImageData;
  variantActive: number;
  sizeSelected: string;
  qualitySelected: number;
  itemData: any,
  mrp: number,
  sellingPrice: number,
}

const NotifyAddTocart: FC<Props> = ({
  show,
  productImage,
  variantActive,
  qualitySelected,
  sizeSelected,
  itemData,
  mrp,
  sellingPrice
}) => {
  const { ad_title, label,somali_ad_title } = itemData
  const { push } = useRouter()
  const {languageCode} = useAppSelector((store=> store.languagesReducer))
  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 relative flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={productImage}
            alt={productImage}
            fill
            sizes="100px"
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-2">{languageCode === "so" ? somali_ad_title === "" ? ad_title : somali_ad_title : ad_title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>{label}</span>
                </p>
              </div>
              <Prices price={mrp} sellingprice={sellingPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-gray-400">{`Qty ${qualitySelected}`}</p>

            <div className="flex">
              <button
                type="button"
                onClick={() => push("/cart")}
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-gray-900 dark:text-gray-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 trangray-x-20"
      enterTo="opacity-100 trangray-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 trangray-x-0"
      leaveTo="opacity-0 trangray-x-20"
    >
      <p className="block text-base font-semibold leading-none">
        Added to cart!
      </p>
      <hr className=" border-gray-200 dark:border-gray-700 my-4" />
      {renderProductCartOnNotify()}
    </Transition>
  );
};

export default NotifyAddTocart;
