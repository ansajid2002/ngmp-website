import { AdminUrl } from "@/app/layout";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createRef, FC, useEffect, useRef, useState } from "react";
import PopularSearches from "./PopularSearches";
import SearchList from "./SearchList";
import { t } from "i18next";

const MobileSearch = () => {
  const [isH1Visible, setIsH1Visible] = useState(false);
  const inputRef = createRef<HTMLInputElement>();
  const searchNode = useRef();
  const search = useSearchParams();
  const searchEncrypt = (search && search.get("query")) || "";
  const decryptedText = atob(searchEncrypt);
  const [focusInput, setFocusInput] = useState(false);
  const router = useRouter();
  const [searchText, setSearchText] = useState(decryptedText || "");
  const [MatchingKeyword, setMatchingKeyword] = useState(null);

  const handleIconClick = () => {
    setIsH1Visible(!isH1Visible);
    setSearchText("");
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
            setIsH1Visible(!isH1Visible);
          }}
        >
          <div className="bg-gray-50 w-full dark:bg-gray-800 flex items-center space-x-1.5 px-5 h-full rounded">
            {renderMagnifyingGlassIcon()}
            <input
              ref={inputRef}
              type="text"
              placeholder={t("Type and press enter")}
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
              className=" p-4 bg-white rounded-lg shadow-lg  h-96 overflow-hidden overflow-y-auto w-full z-[99999999]"
            >
              {searchText.trim() === "" ? (
                <PopularSearches />
              ) : (
                <SearchList
                  closeSearch={handleSearhForm}
                  searchKeywords={MatchingKeyword}
                  func={handleIconClick}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  };
  return (
    <div>
      <div className="relative mr-2">
        <Search size={30} onClick={handleIconClick} />
      </div>

      {isH1Visible && (
        <div className="transition-all ease-in-out absolute w-full bg-white top-20 left-0 p-2">
          {renderSearchForm()}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
