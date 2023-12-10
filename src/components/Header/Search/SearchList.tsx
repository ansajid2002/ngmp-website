"use client"

import { HomeUrl } from '@/app/layout';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchList = ({ searchKeywords, closeSearch }: any) => {
    const router = useRouter();

    console.log(searchKeywords, 'se');

    if (searchKeywords?.status === 400) {
        return <p>Searching</p>;
    } else if (searchKeywords?.status === 404) {
        return <p>No Search Found...</p>;
    }

    return (
        <div className="grid grid-cols-1 mb-2">
            {searchKeywords &&
                searchKeywords?.map((item: any, index: number) => (
                    <div
                        key={index}
                    >
                        <a href={`/Channel/search?query=${btoa(item)}`} target="blank" className="flex flex-warp">
                            <div className="col-span-1 bg-red-200 text-center">
                                <SearchIcon />
                            </div>
                            <div className="col-span-4 flex-1 pl-2">
                                <h1 className="text-lg font-semibold line-clamp-2">{item}</h1>
                            </div>
                        </a>
                    </div>
                ))
            }
        </div >
    );
};

export default SearchList;
