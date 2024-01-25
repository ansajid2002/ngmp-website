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
import { AdminUrl, ProductImageUrl } from "@/app/layout";
import Prices from "../Prices";
import ProductCard from "../ProductCard";

const ItemsInCart = ({ label1, label2 }) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  // console.log(cartItems.length);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <>
      <div className="py-4 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="md:flex  items-center justify-between py-5">
          <h2 className="text-[2rem] md:text-[2.3rem] text-center tracking-tight uppercase font-bold mb-2">
            <span className="text-[#ED642B]">{label1}</span> {label2}
          </h2>
          <Link href={"/cart"}>
            <span className="flex items-center justify-center gap-1 font-medium text-base">
              View Cart <ChevronRight size={20} color="#ED642B" />
            </span>
          </Link>
        </div>
        <Swiper
          spaceBetween={15}
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
            <SwiperSlide
              key={index}
              className="my-3 transition-all ease-in-out hover:shadow-md rounded-lg"
            >
              <Link
                href={`/product-detail?product=${item.prod_slug}&uniqueid=${item.uniquepid}`}
              >
                <div className="w-full md:p-2">
                  <div className="aspect-[3/4] overflow-hidden ">
                    <img
                      className="h-full w-full object-contain transition-all ease-in-out hover:scale-105"
                      src={
                        item && item.images?.[0]
                          ? `${ProductImageUrl}/${item?.images?.[0]}`
                          : "/placeholder.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="pt-3">
                    <h2 className="line-clamp-1">{item.ad_title}</h2>
                    <Prices price={item.mrp} sellingprice={item.sellingprice} />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next text-[#ED642B]"></div>
        </Swiper>
      </div>
    </>
  );
};

export default ItemsInCart;
