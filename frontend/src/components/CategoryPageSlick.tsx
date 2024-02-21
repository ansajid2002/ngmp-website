"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategoriesAndSubcategories } from "@/app/page";
import { AdminUrl } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "react-i18next";

const CategoryPageSlick = ({ data, onFetchData }) => {
  const { t } = useTranslation()
  const [catDataa, setCatDataa] = useState<any[] | any>(null);

  const CategoryPageFetch = async () => {
    setCatDataa(null);
    const response = await fetchCategoriesAndSubcategories();
    const filteredCat =
      response &&
      response.filter(
        (item) =>
          item.category_name.replace(/[^\w\s]/g, "").replace(/\s/g, "") ===
          data.category
      );
    setCatDataa(filteredCat);
    onFetchData(filteredCat)
  };

  useEffect(() => {
    data && CategoryPageFetch();
  }, [data]);

  const [settings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    // slidesPerRow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  });

  console.log(catDataa);

  return (
    <div className="px-5 mt-4">
      {!catDataa ? (
        <div className="flex gap-4 p-2 ">
          {[1, 2, 3, 4, 5].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 justify-center">
              <Skeleton className="w-24 h-24 lg:h-32 lg:w-32 rounded-full bg-gray-300" />
              <Skeleton className="w-24 h-2 lg:w-32  rounded-full bg-gray-300 flex justify-center" />
            </div>
          ))}
        </div>
      ) : (
        catDataa?.map((item: any) => {
          return (
            <>
              <Slider {...settings}>
                {item.subcategories?.map((item3: any, index3: any) => {
                  return (
                    <Link
                      key={index3}
                      className="flex gap-2"
                      href={`/category/${data.category}/${item3.subcategory_name
                        .replace(/[^\w\s]/g, "")
                        .replace(/\s/g, "")}`}
                    >
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-20 h-20 lg:h-32 lg:w-32 rounded-full overflow-hidden  transition-all ease-in-out hover:scale-105 ${item3.subcategory_name
                            .replace(/[^\w\s]/g, "")
                            .replace(/\s/g, "") === data.subcatname
                            ? "border-4 border-gray-700"
                            : "border-gray-200  border-2 "
                            }`}
                        >
                          <Image
                            width={100}
                            height={100}
                            className="h-full w-full object-contain bg-white"
                            src={`${AdminUrl}/uploads/SubcategoryImages/${item3.subcategory_image_url}`}
                            alt={item3.subcategory_name}
                          />
                        </div>
                      </div>
                      <h1
                        className={`text-sm md:text-base text-center px-5 mt-2 line-clamp-2 ${item3.subcategory_name
                          .replace(/[^\w\s]/g, "")
                          .replace(/\s/g, "") === data.subcatname &&
                          "font-semibold"
                          }`}
                      >{t(`${item3.subcategory_name}`)}

                      </h1>
                    </Link>
                  );
                })}
              </Slider>
            </>
          );
        })
      )}
    </div>
  );
};

export default CategoryPageSlick;
