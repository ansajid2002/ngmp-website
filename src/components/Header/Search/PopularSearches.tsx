import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { FireIcon } from "@heroicons/react/24/solid";
import { t } from "i18next";
import { ArrowUpRight, Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VscHistory } from "react-icons/vsc";




const PopularSearches = () => {
  const [searchHistory, setSearchHistory] = useState(null)
  const [popularSearches, setPopularSearches] = useState(null)
  const { customerData } = useAppSelector((store) => store.customerData)
  const customerId = customerData?.customer_id || null;


  const fetchsearch = async () => {
    try {
      const res = await fetch(`${AdminUrl}/api/getmostoccurredsearches`)
      if (!res.ok) {
        throw new Error("Failed to fetch search history")
      }
      const data1 = await res.json()
      setPopularSearches(data1.data)
      if (!customerId) return;

      const response = await fetch(`${AdminUrl}/api/getsearchhistorybycid?customer_id=${customerId}&limit=5`)
      if (!response.ok) {
        throw new Error("Failed to fetch search history")
      }
      const data = await response.json()
      setSearchHistory(data.data)

    } catch (error) {
      console.log(error, "ERROR FETCHING SEARCH...");

    }
  }

  const handleDelete = async(id) => {

      try {
        const response = await fetch(`${AdminUrl}/api/cancelItem?id=${id}`)
        if (response.ok){
          console.log("done");
          
        }

      } catch (error) {
        
      }
  }


  useEffect(() => {
    fetchsearch()
  }, [])

  return (
    <div>

      <div>
        {/* <h2 className="text-xl font-bold mb-4">{t("Recent Searches")}</h2> */}

        <div className=" gap-2">
          {searchHistory?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
            <div className="flex items-end gap-1 hover:bg-gray-200 p-2 rounded-lg transition-all ease-in-out hover:text-[#ed642b]" style={{ width: '100%' }}>
              <div className="text-center" style={{ width: '7%' }}>
                <Clock size={20} color="gray" />
              </div>
              <Link
                className="flex-1 pl-2"
                href={`/Channel/search?query=${btoa(item.search_keyword)}`}
                // target="blank"
                // onClick={handleClick}
                style={{ width: '78%' }}
              >
                <h1 className="text-[1rem] line-clamp-1">{item.search_keyword}</h1>
              </Link>
              <button onClick={() => handleDelete(item.id)} style={{ width: '15%' }}>X</button>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div>
        {/* <h2 className="text-xl font-bold mb-4">{t("Popular Searches")}</h2> */}

        <div className=" gap-2">
          {popularSearches?.map((item, index) => (
            <div key={index}>
              <Link

                href={`/Channel/search?query=${btoa(item.search_keyword)}`}
                // target="blank"
                // onClick={handleClick}
                className="flex flex-warp items-end gap-1 hover:bg-gray-200 p-2 rounded-lg transition-all ease-in-out hover:text-[#ed642b]"
              >
                <div className="col-span-1 text-center">
                  {/* <SearchIcon size={20} /> */}
                  <TrendingUp size={20} color="gray" />
                </div>
                <div className="col-span-4 flex-1 pl-2">
                  <h1 className="text-[1rem] line-clamp-1">{item.search_keyword}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;
