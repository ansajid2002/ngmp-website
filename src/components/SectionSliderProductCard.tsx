"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import { useAppSelector } from "@/redux/store";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
  ShowProduct?: boolean;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  ShowProduct = true,
  className = "",
  itemClassName = "",
  headingFontClassName = "leading-none text-[2rem] md:text-[2.3rem] font-bold",
  headingClassName = "  tracking-tight uppercase mb-10",
  heading,
  subHeading = "",
  data,
}) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 6,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 5 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 2,
        },
        500: {
          gap: 20,
          perView: 2,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}{" "}
          {ShowProduct && (
            <span className="text-[#ed642b] font-bold">Products</span>
          )}
        </Heading>

        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data &&
              data.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <ProductCard data={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
