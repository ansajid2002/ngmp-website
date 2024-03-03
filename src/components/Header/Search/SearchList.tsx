"use client";

import { HomeUrl } from "@/app/layout";
import { ArrowUpRight, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SearchList = ({ searchKeywords, closeSearch, focusInput  }: any) => {
  const router = useRouter();

  if (searchKeywords?.status === 400) {
    return <p>Searching</p>;
  } else if (searchKeywords?.status === 404) {
    return <p>No Search Found...</p>;
  }
  const handleClick = () => {
    focusInput(false); // Call the focusInput function passed from the parent
  };

  return (
    <div className="grid grid-cols-1 mb-2">
      {searchKeywords &&
        searchKeywords?.map((item: any, index: number) => (
          <div key={index}>
            <Link
            
              href={`/Channel/search?query=${btoa(item)}`}
              // target="blank"
              // onClick={handleClick}
              className="flex flex-warp items-end gap-1 hover:bg-gray-200 p-2 rounded-lg transition-all ease-in-out hover:text-[#ed642b]"
            >
              <div className="col-span-1 text-center">
                {/* <SearchIcon size={20} /> */}
                <ArrowUpRight size={20} color="gray" />
              </div>
              <div className="col-span-4 flex-1 pl-2">
                <h1 className="text-[1rem] line-clamp-1">{item}</h1>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SearchList;
