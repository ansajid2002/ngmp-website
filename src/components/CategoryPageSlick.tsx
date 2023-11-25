"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategoriesAndSubcategories } from "@/app/page";
import { AdminUrl } from "@/app/layout";
import Image from "next/image";

const CategoryPageSlick = ({ data }) => {
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
    {
      id: 17,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 18,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 19,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 20,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 16,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 17,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 18,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 19,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
    {
      id: 20,
      img: "https://img.kwcdn.com/product/1e14dde0136/b7d80419-f356-420a-b469-ee9303bb75bb_213x213.png?imageView2/2/w/172/q/70/format/webp",
      label: "Women's Dresses",
    },
  ];

  const [catDataa, setCatDataa] = useState<any[] | any>();

  // console.log(data);

  // let dataa = [];
  const CategoryPageFetch = async () => {
    const response = await fetchCategoriesAndSubcategories();
    const filteredCat =
      response &&
      response.filter(
        (item) =>
          item.category_name.replace(/[^\w\s]/g, "").replace(/\s/g, "") ===
          data.category
      );
    setCatDataa(filteredCat);
    // dataa.push(response);
    // setData(response);
    console.log(filteredCat, "updated");
  };

  // console.log(dataa);

  useEffect(() => {
    CategoryPageFetch();
  }, [data]);

  const [settings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    // rows: 2,
    // slidesPerRow: 5,
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
    <div className="p-10">
      <div>
        {catDataa?.map((item: any) => {
          return (
            <>
              <h1>{item.category_name}</h1>
              <Slider {...settings} className="pb-5">
                {item.subcategories?.map((item3: any, index3: any) => {
                  return (
                    <div>
                      <div
                        className="flex flex-col items-center gap-2 justify-center p-2 "
                        key={index3}
                      >
                        <div className="h-32 w-32 rounded-full border-gray-200  border-2 overflow-hidden">
                          <Image
                            width={100}
                            height={100}
                            className=" transition-all ease-in-out hover:scale-105 h-full w-full object-contain"
                            src={`${AdminUrl}/uploads/SubcategoryImages/${item3.subcategory_image_url}`}
                            alt={item3.subcategory_name}
                          />
                        </div>
                        <span className="text-[0.9rem]  text-center leading-4 text-black font-medium mt-2 md:px-10">
                          {item3.subcategory_name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </>
          );
        })}
      </div>

      <div></div>
    </div>
  );
};

export default CategoryPageSlick;
