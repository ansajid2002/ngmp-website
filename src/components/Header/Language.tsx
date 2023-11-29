"use client";

import { Popover, Transition } from "@/app/headlessui";
import { avatarImgs } from "@/contains/fakeData";
import { Fragment, useState } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode/SwitchDarkMode2";
import Link from "next/link";
import { HomeUrl } from "@/app/layout";
import { useAppSelector, AppDispatch } from "@/redux/store";
import usa from "@/images/flags/united-states.png";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/redux/features/languageslice";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function AvatarDropdown() {
  const dispatch = useDispatch<AppDispatch>();

  const { availablelanguages, languageCode, languageName, languageImg } =
    useAppSelector((store) => store.languagesReducer);

  const ChangeLanguageIcon = (item: any) => {
    const { label, img, lcode } = item;
    dispatch(
      setLanguage({
        newlanguageCode: lcode,
        newlanguageName: label,
        newlanguageImg: img,
      })
    );
  };

  return (
    <div className="AvatarDropdown  ">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`w-10 h-10 sm:w-14 sm:h-10 rounded-md  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none flex items-center justify-center`}
            >
              <img
                className="md:w-6 md:h-6"
                src={languageImg.src}
                alt="language"
              />
              <span className="ml-1 font-medium uppercase">{languageCode}</span>
              {/* <span>{lcode}</span> */}
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
              <Popover.Panel className="absolute z-10 w-screen max-w-[250px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    {availablelanguages?.map((item) => (
                      <Link
                        href={item.link}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => ChangeLanguageIcon(item)}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <img
                            width="24"
                            height="24"
                            src={item.img.src}
                            alt="selected language"
                          />
                        </div>
                        <div className="ml-2 lg:ml-4">
                          <p className="text-sm font-medium capitalize">
                            {item.label}
                          </p>
                        </div>
                        <div className="ml-8">
                          {item.label === languageName && (
                            <ChevronRightIcon
                              className="ml-1 -mr-1 h-4 w-4 text-gray-700"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
