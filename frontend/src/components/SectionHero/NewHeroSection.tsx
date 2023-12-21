"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { AdminUrl } from "@/app/layout";

const NewHeroSection = ({ data }: any) => {
  return (
    <div className="h-[320px]">
      <Carousel
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-1 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <>
                <Image
                  key={index}
                  src={`${AdminUrl}/uploads/Banners/${item.banner_url}`}
                  alt="image1"
                  width={1200}
                  height={216}
                  placeholder="blur"
                  blurDataURL="LKN]Rv%2Tw=w]~RBVZRi};RPxuwH"
                  className="h-full w-full object-cover object-right"
                />
              </>
            );
          })}
      </Carousel>
    </div>
  );
};

export default NewHeroSection;
