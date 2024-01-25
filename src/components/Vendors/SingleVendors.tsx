"use client";
import { Heart, MessageCircle, Minus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getAllVendors } from "@/app/page";
import { useSearchParams } from "next/navigation";
import { AdminUrl } from "@/app/layout";
import SingleVendorsDetails from "./SingleVendorsDetails";
import Skeleton from "react-loading-skeleton";

const SingleVendors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [singleVendors, setSingleVendors] = useState();

  const params = useSearchParams();
  const vendorid = params.get("vendorid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getAllVendors accepts an ID parameter

        const response = await fetch(`/api/Vendors/getProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorid }),
        });

        if (response.ok) {
          const data = await response.json();
          setSingleVendors(data);
        }

        // setSingleVendors(...filteredVendors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchData();
    // If you want to perform some action when singleVendors changes, do it here
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="md:flex items-center justify-between p-4 md:px-20">
            <div className="flex items-center gap-5">
              <Skeleton height={100} width={100} circle />
              <Skeleton height={20} width={200} />
            </div>
            <div className="flex flex-col items-center justify-center mt-5 md:mt-0">
              <Skeleton height={80} width={295} />
              <div className="flex gap-1">
                <Skeleton height={40} width={200} />
                <Skeleton height={40} width={90} />
              </div>
            </div>
          </div>
          <div className="p-4 md:px-20">
            <Skeleton />
            <div className="flex flex-col md:flex-row items-center justify-between">
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 place-content-center p-4 md:px-20">
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
          </div>
        </>
      ) : (
        <div className="p-4 md:px-20">
          <div className=" md:flex items-center justify-between">
            <div className="flex  items-center justify-start gap-5">
              <div className="h-20 w-20 md:h-24 md:w-24  border-gray-200 border-2  rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-contain"
                  src={
                    singleVendors &&
                      singleVendors.brand_logo &&
                      singleVendors.brand_logo.images[0]
                      ? `${`${AdminUrl}/uploads/vendorBrandLogo/${singleVendors?.brand_logo?.images[0]}`}`
                      : "https://connectkaro.org/wp-content/uploads/2019/03/placeholder-profile-male-500x500.png"
                  }
                  alt={singleVendors?.brand_name}
                />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl tracking-wide pr-2 font-medium">
                  {singleVendors?.brand_name || "NA"}
                </h2>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-center gap-2 md:gap-5">
                <div className="text-center">
                  <h2 className="font-medium">
                    {singleVendors?.followers || "0"}
                  </h2>
                  <h3 className="text-gray-600">Followers</h3>
                </div>
                <Minus className="rotate-90 text-gray-400" />
                <div className="text-center">
                  <h2 className="font-medium">
                    {singleVendors?.total_products || "0"}
                  </h2>
                  <h3 className="text-gray-600">Items</h3>
                </div>
              </div>

              <div className="flex items-center mt-2 md:mt-0 gap-2 p-2">
                <div className="w-[80%] md:w-[90%]">
                  <h2 className="flex gap-2 items-center justify-center hover:text-red-600 transition-all ease-in-out border p-2 hover:border-red-900 border-gray-800 rounded-3xl">
                    <Heart />
                    <p className="font-medium">Follow</p>
                  </h2>
                </div>
                <div className="flex flex-col  items-center transition-all ease-in-out hover:bg-gray-200 rounded-xl p-2">
                  <MessageCircle size={20} />
                  <h2 className="text-xs">Message</h2>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <SingleVendorsDetails data={singleVendors} />
        </div>
      )}
    </>
  );
};

export default SingleVendors;
