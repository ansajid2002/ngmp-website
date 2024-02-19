"use client";

import React, { useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Logo from "@/shared/Logo/Logo";
import { Disclosure } from "@/app/headlessui";
import { NavItemType } from "./NavigationItem";
import Language from "@/components/Header/Language";
import logo from "@/images/mainlogo.png";
import Image from "next/image";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SocialsList from "@/shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";
import { fetchCategoriesAndSubcategories } from "@/app/page";
import { MessagesSquare, Search } from "lucide-react";
import SupportCenterDropdown from "@/components/Header/SupportCenterDropdown";
import { useTranslation } from "react-i18next";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
}) => {
  const [categoryDaata, setCategoryDaata] = useState<any[] | null>(null);
const {t} = useTranslation()
  const catm = async () => {
    const cat = await fetchCategoriesAndSubcategories();
    // console.log(cat)
    setCategoryDaata(cat);
  };

  useEffect(() => {
    catm();
  }, []);

  // console.log(categoryDaata, "set");

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };

  const _renderMenuChild = (
    item: NavItemType,
    itemClass = " pl-3 text-neutral-900 dark:text-neutral-200 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!i.children ? "block w-full" : ""}`}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex items-center flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-gray-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>
                {_renderMenuChild(i, "pl-3 text-gray-600 dark:text-gray-400 ")}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure key={index} as="li" className="text-gray-900 dark:text-white">
        <Link
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 text-gray-900 dark:text-gray-200"
      >
        <div className="bg-gray-50 dark:bg-gray-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder={t("Type and press enter")}
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className=" w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        {/* <Logo /> */}

        <div className="flex flex-col mt-5 text-gray-600 dark:text-gray-300 text-sm">
          {/* <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span> */}

          <div className="flex justify-between gap-2 items-center mt-4">
            <Link href={"/"} onClick={onClickClose}>
              <Image
                src={logo}
                alt="website main logo"
                className=" w-32 md:w-32 xl:w-32 pb-1"
              />
            </Link>
            {/* <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" /> */}
            <span className="flex items-center justify-center gap-4 mr-2">
              <Language />
              {/* <Link
                href={"/SupportCenter?querys=BuyingOnNile"}
                onClick={onClickClose}
                className="px-2"
              >
                <MessagesSquare strokeWidth={1} size={28} />
              </Link> */}

              <SupportCenterDropdown />

              {/* <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" /> */}
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        {/* <div className="mt-5">{renderSearchForm()}</div> */}
      </div>
      {/* <ul className="flex flex-col py-6 px-2 space-y-1"> */}
      {/* {data.map(_renderItem)} */}
      {/* {categoryDaata?.map((item) => (
          <h1>{item.category_name}</h1>
        ))} */}
      {/* </ul> */}
      {/* <div className="flex items-center justify-between py-6 px-5 space-x-2">
        <ButtonPrimary href={{`${HomeUrl}`}} className="!px-10">
          Buy this template
        </ButtonPrimary>
      </div> */}
      <div className="relative h-auto p-5">
        <ul className=" flex flex-col gap-1 ">
          <Link href={"/Channel/best-sellers"} onClick={onClickClose}>
            <li className="text-lg font-medium">{t("Best Sellers")}</li>
          </Link>
          <Link href={"/Channel/new-arrivals"} onClick={onClickClose}>
            <li className="text-lg font-medium">{t("New Arrivals")}</li>
          </Link>
          {/* <Link href={"#"}> */}
          <li
            onClick={toggleDropdown}
            className="flex items-center justify-between"
          >
            <span className="text-lg font-medium">{t("Category")}</span>
            <ChevronDownIcon
              className={
                isOpen
                  ? "transition-all ease-in-out rotate-180 ml-2 h-5 w-5 text-[#ED642B]"
                  : "transition-all ease-in-out ml-2 h-5 w-5 text-neutral-500 "
              }
              aria-hidden="true"
            />
          </li>
          {/* </Link> */}
        </ul>

        {isOpen && (
          <ul className="h-screen overflow-y-auto bg-gray-100 text-[1rem] text-left w-full px-5  m-0 absolute top-full left-0 border z-10">
            {categoryDaata?.map((option, index) => (
              <Link
                key={index}
                href={`/category/${option.category_name
                  .replace(/[^\w\s]/g, "")
                  .replace(
                    /\s/g,
                    ""
                  )}/${option.subcategories[0]?.subcategory_name
                  .replace(/[^\w\s]/g, "")
                  .replace(/\s/g, "")}`}
              >
                <li
                  className="cursor-pointer py-2 border-b-2"
                  // key={index}
                  // onClick={() => handleOptionClick()}
                  onClick={onClickClose}
                >
                  {option.category_name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavMobile;
