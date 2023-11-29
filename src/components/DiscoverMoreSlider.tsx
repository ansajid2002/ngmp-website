"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CATS_DISCOVER } from "./CardCategories/data";

import SingleVendorsCard from "./Vendors/SingleVendorsCard";

const DiscoverMoreSlider = ({ data }) => {
  const sliderRef = useRef(null);
  // console.log(data, "PRODUCTTS");

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
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
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider  ${isShow ? "" : "invisible"}`}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        showSlideButton={false}
        // rightDescText="Good things are waiting for you"
        hasNextPrev
      >
        Recommended Shop!!
      </Heading>
      <div className="p-5" data-glide-el="track">
        <div className="glide__slides">
          {data &&
            data.map((item: any, index: any) => (
              <div
                className={`glide__slide bg-gray-100 rounded-lg overflow-hidden border mb-14 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-gray-200`}
              >
                <SingleVendorsCard item={item} index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
