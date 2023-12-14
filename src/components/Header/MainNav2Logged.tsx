"use client";

import React, { createRef, FC, useEffect, useRef, useState } from "react";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import logo from "@/images/mainlogo.svg";
import Image from "next/image";
import Link from "next/link";
import { AdminUrl, HomeUrl } from "@/app/layout";
import Language from "./Language";
import {
  GitCommitVertical,
  PackageCheck,
  Search,
  Smartphone,
  Truck,
} from "lucide-react";
import SupportCenterDropdown from "./SupportCenterDropdown";
import PopularSearches from "./Search/PopularSearches";
import SearchList from "./Search/SearchList";
import MobileSearch from "./Search/MobileSearch";

const MainNav2Logged = () => {

  const inputRef = createRef<HTMLInputElement>();
  const searchNode = useRef();
  const search = useSearchParams();
  const searchEncrypt = (search && search.get("query")) || "";
  const decryptedText = atob(searchEncrypt);
  const router = useRouter();
  const [searchText, setSearchText] = useState(decryptedText || "");
  const [MatchingKeyword, setMatchingKeyword] = useState(null);
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchNode.current && !searchNode.current?.contains(event.target)) {
        setFocusInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInput = async (text: string) => {
    setSearchText(text);
    try {
      if (text.trim() === "") return;
      const response = await fetch(
        `${AdminUrl}/api/searchProducts?searchTerm=${text}&currency=USD`
      );
      const searchKeywords = await response.json();
      setMatchingKeyword(searchKeywords);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    searchText.trim() !== "" && handleSearchInput(searchText);
  }, [searchText]);

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

  const handleSearhForm = (status: boolean, searchTextprop: string) => {
    setSearchText(searchTextprop);
  };

  const renderSearchForm = () => {
    return (
      <div className="">
        <form
          className="flex-1 py-2 text-gray-900 dark:text-gray-100 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            router.replace(`/Channel/search?query=${btoa(searchText)}`);
            inputRef.current?.blur();
          }}
        >
          <div className="bg-gray-100  w-full dark:bg-gray-800 flex items-center space-x-1.5 px-5 h-full rounded-lg">
            {renderMagnifyingGlassIcon()}
            <input
              ref={inputRef}
              type="text"
              placeholder="Type and press enter"
              value={searchText}
              className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
              onChange={(e) => handleSearchInput(e.target.value)}
              // onFocus={() => setFocusInput(true)}
              onClick={() => setFocusInput(true)}
            // onBlur={() => setFocusInput(false)}
            />
            <button type="button" onClick={() => setSearchText("")}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <input type="submit" hidden value="" />
        </form>
        {/* AutoComplete Overlay */}
        {focusInput && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center -z-[99] transition-all duration-150 ease-in-out"></div>
            <div
              ref={searchNode}
              className="w-full p-4 bg-white rounded-lg shadow-lg  h-96 overflow-hidden overflow-y-auto w-full z-[99999999]"
            >
              {searchText.trim() === "" ? (
                <PopularSearches />
              ) : (
                <SearchList
                  closeSearch={handleSearhForm}
                  searchKeywords={MatchingKeyword}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="h-20 w-full flex justify-between">
        <div className="flex items-center md:hidden">
          <MenuBar />
        </div>
        <div className="-ml-10 md:-ml-0 lg:w-[10%] flex items-center">
          {/* <Logo className="flex-shrink-0" /> */}
          <Link href={`${HomeUrl}`}>
            <Image
              src={logo}
              alt="website main logo"
              className="w-32 md:w-32 xl:w-32 pb-1"
            />
          </Link>
        </div>

        <div className="hidden  md:flex justify-start ld:justify-center mx-4 w-[65%]">
          <div className="w-1/2">
            <Navigation />
          </div>
          <div className="hidden lg:block w-1/2 mt-2">{renderSearchForm()}</div>
        </div>

        <div className="w-[35%] lg:w-[25%]  flex items-center gap-1 justify-center text-gray-700 dark:text-gray-100">
          {/* Header Profile */}
          <div className="lg:hidden">
            <MobileSearch />
          </div>
          <AvatarDropdown />

          <div className="hidden lg:block">
            {/* <Link href={"/SupportCenter?query=BuyingOnNile"}> */}
            {/* <MessagesSquare
              strokeWidth={1}
              size={28}
              className="transition-all hover:scale-105"
            /> */}
            <SupportCenterDropdown />
            {/* </Link> */}
          </div>
          <div className="hidden md:block">
            <Language />
          </div>
          <CartDropdown />
        </div>
      </div>
    );
  };

  return (
    <header>
      <section className="justify-between px-4 md:px-10 py-2 items-center bg-black border-b border-gray-100 dark:border-gray-600 flex ">
        <div className="flex w-full md:w-auto items-center justify-center md:justify-start space-x-2">
          {/* <Image
            src={freeshipping}
            alt="website main logo"
            className="md:w-8 md:h-8 w-7 h-7 brightness-200"
          /> */}
          <Truck strokeWidth={1} className="text-[#ADFFA2]" size={35} />
          <h1 className="text-[15px] leading-tight md:text-[16px] text-[#ADFFA2] font-semibold">
            Free Shipping on all Orders
            <br />
            Time-limited offer
          </h1>
        </div>
        <GitCommitVertical
          className="hidden md:block"
          strokeWidth={1}
          color="white"
        />
        <div className="hidden md:flex items-center space-x-2">
          {/* <Image
            src={negotiation}
            alt="website main logo"
            className="md:w-8 md:h-8 w-7 h-7 brightness-200  invert"
          /> */}
          <PackageCheck strokeWidth={1} className="text-[#FFF7A7]" size={35} />
          <h1 className="text-[12px] leading-tight md:text-[16px] text-[#FFF7A7] font-semibold">
            Delivery Guarantee <br />
            Refund for any issues
          </h1>
        </div>
        <GitCommitVertical
          className="hidden md:block"
          strokeWidth={1}
          color="white"
        />
        <div className="hidden md:flex items-center space-x-2">
          {/* <Image
            src={mobile}
            alt="website main logo"
            className=" md:w-8 md:h-8 w-7 h-7 brightness-200  invert"
          /> */}
          <Smartphone strokeWidth={1} className="text-[#FFF7A7]" size={35} />
          <h1 className="text-[12px] md:text-[16px] text-[#FFF7A7] font-semibold">
            Get The Nile App
          </h1>
        </div>
      </section>
      <div className="nc-MainNav2Logged relative md:pt-2  bg-white dark:bg-neutral-900 border-b border-gray-100 dark:border-gray-700">
        <div className="md:px-10 px-2">{renderContent()}</div>
      </div>
    </header>
  );
};

export default MainNav2Logged;
