"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import banner from "@/images/collections/banner.png";
import Image from "next/image";
import { AdminUrl } from "@/app/layout";

const NewHeroSection = ({ data }) => {
  const [dataa, setDataa] = useState<any | null>();
  //   console.log(data);

  useEffect(() => {
    setDataa(data);
  }, []);

  return (
    <div className="h-[30vh] md:h-auto">
      <Carousel
        className=""
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-9 flex -trangray-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {dataa?.map((item, index) => (
          <Image
            key={index}
            src={`${AdminUrl}/uploads/Banners${item.banner_url.startsWith("/") ? "" : "/"
              }${item.banner_url}`}
            alt="image1"
            width={1200}
            height={216}
            className="h-full w-full object-cover object-right"
          ></Image>
        ))}
      </Carousel>
    </div>
  );
};

export default NewHeroSection;
