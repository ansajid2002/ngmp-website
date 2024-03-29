"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Rate } from "antd";
import { AdminUrl } from "@/app/layout";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const SingleVendorsCard = ({ item, index }: any) => {
  const [rating, setRating] = useState(null)
  const [count, setCount] = useState(0)

  const fetchRating = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/fetchRatings?vendorid=${item?.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const ratingdata = await response.json()

      setRating(ratingdata?.ratingsData || [])
      setCount(ratingdata?.totalReviewTextCount || 0)
      // const data = await response.json();
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    item.id && fetchRating()
  }, [item.id])

  const { t } = useTranslation()
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
                  : "/placeholder.png"
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
                  : "/placeholder.png"
              }
              alt={item.brand_name || "NA"}
            />
            <img
              className="h-[50%] w-full object-contain"
              src={
                item.products && item.products.images && item.products.images[2]
                  ? `${AdminUrl}/uploads/vendorsProductImages/${item.products.images[2]}`
                  : "/placeholder.png"
              }
              alt={item.brand_name || "NA"}
            />
          </div>
        </div>
        <div className="py-2 px-3 leading-relaxed">
          <div>
            <div className="flex items-center justify-start gap-1">
              <img
                className="h-8 w-8 object-contain rounded-full border border-gray-300"
                src={
                  item && item.brand_logo && item.brand_logo.images[0]
                    ? `${`${AdminUrl}/uploads/vendorBrandLogo/${item?.brand_logo?.images[0]}`}`
                    : "https://connectkaro.org/wp-content/uploads/2019/03/placeholder-profile-male-500x500.png"
                }
                alt={item?.brand_name}
              />
              <h2 className="text-[1.1rem] line-clamp-1 tracking-wide ">
                {item.brand_name || item.vendorname}
              </h2>
            </div>
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
                value={rating?.[0]?.averageRating || 2}
                style={{ fontSize: 13, margin: 0 }}
              />
              <span className="text-sm font-medium">({count})</span>
            </div>
            <div className="flex items-center text-[0.9rem] font-medium hover:text-[#ed642b]">
              {t("Visit Shop")}
              <ChevronRight size={15} className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SingleVendorsCard;
