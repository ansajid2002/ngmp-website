"use client";
import React, { useState } from "react";
import { AdminUrl } from "@/app/layout";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "../Heading";
import Link from "next/link";

const CategoryPageSlick = ({ newcategoriesdata }) => {
  // console.log(newcategoriesdata)

  const [settings] = useState({
    dots: false,
    infinite: true,
    slidesToShow: 6,
    // centerMode: true,
    // drag: false,
    // swipeToSLide: false,
    rows: 2,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    // wairForAnimate: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  return (
    <div className="lg:p-3">
      <Heading title="CATEGORIES" />
      <Slider {...settings} className="pb-5">
        {newcategoriesdata?.slice(0, 24).map((single: any, index: any) => {
          return (
            <div key={index}>
              <div
                className="flex flex-col items-center gap-2 justify-center p-2 "
                key={index}
              >
                <Link
                  href={`/category/${single.category_name
                    .replace(/[^\w\s]/g, "")
                    .replace(
                      /\s/g,
                      ""
                    )}/${single.subcategories[0].subcategory_name
                      .replace(/[^\w\s]/g, "")
                      .replace(/\s/g, "")}`}
                  className="text-center"
                >
                  <div className=" overflow-hidden mx-auto border h-[100px] w-[100px] lg:w-[140px] lg:h-[140px] rounded-full flex items-center justify-center">
                    <Image
                      width={130}
                      height={130}
                      className=" object-cover rounded-md"
                      src={`${AdminUrl}/uploads/CatgeoryImages/${single.category_image_url}`}
                      alt={single.category_name}
                    />
                  </div>
                  <div className="">
                    <span className="text-[1rem] text-center leading-4 text-black font-medium mt-2">
                      {single.category_name}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CategoryPageSlick;
