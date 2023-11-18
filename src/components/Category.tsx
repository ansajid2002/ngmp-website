"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = () => {
  const catData = [
    {
      id: 1,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Coat & Jacket",
    },
    {
      id: 2,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Blazer",
    },
    {
      id: 3,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Wedding Party Wear",
    },
    {
      id: 4,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Jeans",
    },
    {
      id: 5,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Cosplay Costume",
    },
    {
      id: 6,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Denim Jackets & Coats",
    },
    {
      id: 7,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Two-piece Outfits",
    },
    {
      id: 8,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Jumpsuits",
    },
    {
      id: 9,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Denim Apparel",
    },
    {
      id: 10,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Bodysuits",
    },
    {
      id: 11,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Denim Skirts",
    },
    {
      id: 12,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Pants",
    },
    {
      id: 13,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Sweaters",
    },
    {
      id: 14,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Rash Guard Swimsuit",
    },
    {
      id: 15,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Skinny-Fit Pants",
    },
    {
      id: 16,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
  ];

  const [settings] = useState({
    dots: false,
    infinite: false,
    speed: 1500,
    arrows: true,
    slidesToShow: 8,
    slidesToScroll: 8,
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
          initialSlide: 2,
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
    <div className="p-10 ">
      <Slider {...settings} className="p-2">
        {catData?.map((item) => {
          return (
            <div>
              <div
                className="flex flex-col items-center gap-2 justify-center p-2 "
                key={item.id}
              >
                <a href="">
                  <img
                    className="transition-all ease-in-out hover:scale-105 w-20"
                    src={item.img}
                    alt={item.label}
                  />
                </a>
                <span className="text-[0.8rem] text-center leading-4 text-black font-medium mt-2 px-5">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Category;
