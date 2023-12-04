"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import '../index.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { AdminUrl } from "@/app/layout";
import Prices from "../Prices";

const SectionHowItWork = () => {
  const { cartItems } = useAppSelector((store) => store.cart);

  // console.log(cartItems);

  return (
    <>
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-3xl font-medium mb-2">Items in your cart</h2>
        <Link href={"/cart"}>
          <span className="flex items-center gap-1 font-medium text-base">
            View Cart <ChevronRight size={20} color="#ED642B" />
          </span>
        </Link>
      </div>
      <Swiper
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper px-3 lg:px-5"
        slidesPerView={6}
        navigation={{
          nextEl: ".swiper-button-next",
          // prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          // when window width is >= 1200px (desktop)
          1200: {
            slidesPerView: 6,
          },
          1000: {
            slidesPerView: 5.5,
          },
          800: {
            slidesPerView: 4.5,
          },
          600: {
            slidesPerView: 3.5,
          },
          400: {
            slidesPerView: 2.1,
          },
          300: {
            slidesPerView: 2.1,
          },
        }}
      >
        {cartItems?.map((item: any, index: any) => (
          <SwiperSlide key={index}>
            <div className="w-full md:p-2">
              <div className="aspect-[3/4] overflow-hidden ">
                <img
                  className="h-full w-full object-contain transition-all ease-in-out hover:scale-105"
                  src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${item?.images?.[0]}`}
                  alt=""
                />
              </div>
              <div>
                <h2 className="line-clamp-1">{item.ad_title}</h2>
                <Prices price={item.mrp} sellingprice={item.sellingprice} />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next text-[#ED642B]"></div>
      </Swiper>
    </>
  );
};

export default SectionHowItWork;
