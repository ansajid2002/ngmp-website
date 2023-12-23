import { Dialog, Transition } from "@/app/headlessui";
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewItem from "@/components/ReviewItem";
import SortOrderFilter from "@/components/SectionGridMoreExplore/SortOrderFilter";
import React, { FC, Fragment } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Reviewcomponent from "@/components/reviewsandrating/Reviewcomponent";
import ShopReviewComponent from "@/components/reviewsandrating/ShopReviewComponent";

export interface ModalViewAllReviewsProps {
  show: boolean;
  productid: any,
  shopShow: boolean,
  onCloseModalViewAllReviews: () => void;
  vendorID: any
}

const ModalViewAllReviews: FC<ModalViewAllReviewsProps> = ({
  show,
  productid,
  onCloseModalViewAllReviews,
  shopShow = false,
  vendorID
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModalViewAllReviews}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-5xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex flex-shrink-0 items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <div className="w-6">
                    <ButtonClose onClick={onCloseModalViewAllReviews} />
                  </div>
                  <div className="flex-1">
                    <h1>{shopShow ? 'Shop Review' : 'View All Review'}</h1>
                  </div>
                </div>

                <div className="px-8 py-8 border-t border-gray-200 dark:border-gray-700 overflow-auto gap-x-14 gap-y-10">
                  {/* <ReviewItem /> */}
                  <Reviewcomponent product_id={productid} shopShow={shopShow} vendorID={vendorID} />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalViewAllReviews;
