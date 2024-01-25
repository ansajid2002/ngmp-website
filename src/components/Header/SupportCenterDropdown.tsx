import React from "react";
import { Popover, Transition } from "@/app/headlessui";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const SupportCenterDropdown = () => {
  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="rounded-full transition-all px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none flex ">
              <MessageCircle size={30} />
            </Popover.Button>
            <Transition
              //   as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 trangray-y-1"
              enterTo="opacity-100 trangray-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 trangray-y-0"
              leaveTo="opacity-0 trangray-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-5 bg-white dark:bg-neutral-800 py-7 px-6">
                    <Link
                      href={"/SupportCenter?querys=BuyingOnNile"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium ">{"Support Center"}</p>
                    </Link>

                    <Link
                      href={"/company/about-us"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium ">{"About Us"}</p>
                    </Link>

                    <Link
                      href={"/company/privacy-policy"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium">
                        {"Privacy Policy"}
                      </p>
                    </Link>
                    <Link
                      href={"/company/terms-conditions"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium">
                        {"Terms & Conditions"}
                      </p>
                    </Link>
                    <Link
                      href={"/company/refund-policy"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium">
                        {"Refund Policy"}
                      </p>
                    </Link>

                    <Link
                      href={"/company/raise-ticket"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <p className="text-sm font-medium ">{"Raise Ticket"}</p>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SupportCenterDropdown;
