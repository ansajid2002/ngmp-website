import React, { useState } from "react";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Rate } from "antd";
import { AdminUrl } from "@/app/layout";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SingleVendorsCard = ({ item, index }) => {
  const [isLoading, setIsLoading] = useState();
  return (
    <a href={`/Channel/Shops?vendorid=${item.id}`} target="blank">
      <div className=" rounded-xl overflow-hidden border-[1px] shadow-md">
        <div
          key={index}
          className=" flex h-[250px] w-full border-b-[1px] border-gray-200"
        >
          <div className="h-full w-[50%] border-r-[1px]">
            <img
              className="h-full w-full object-contain"
              src={
                item.products && item.products.images && item.products.images[0]
                  ? `${AdminUrl}/uploads/vendorsProductImages/${item.products.images[0]}`
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              alt={item.brand_name || "NA"}
            />
          </div>
          <div className=" h-full w-[50%] ">
            <img
              className="h-[50%] w-full object-contain border-b-[1px]"
              src={
                item.products && item.products.images && item.products.images[1]
                  ? `${AdminUrl}/uploads/vendorsProductImages/${item.products.images[1]}`
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              alt={item.brand_name || "NA"}
            />
            <img
              className="h-[50%] w-full object-contain"
              src={
                item.products && item.products.images && item.products.images[2]
                  ? `${AdminUrl}/uploads/vendorsProductImages/${item.products.images[2]}`
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              alt={item.brand_name || "NA"}
            />
          </div>
        </div>
        <div className="py-2 px-3 leading-relaxed">
          <div>
            <h2 className="text-[1.1rem] line-clamp-1 tracking-wide ">
              {item.brand_name || "NA"}
            </h2>
            <span className="text-[0.8rem] text-gray-700 ">
              {item.company_city || "NA"} , {item.company_state || "NA"} ,{" "}
              {item.Company_country || "NA"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Rate
                disabled
                allowHalf
                defaultValue={4.5}
                style={{ fontSize: 13, margin: 0 }}
              />
              <span className="text-sm font-medium">(4,230)</span>
            </div>
            <div className="flex items-center text-[0.9rem] font-medium hover:text-[#ed642b]">
              Visit Shop
              <ChevronRight size={15} className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SingleVendorsCard;
