"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { AdminUrl } from "@/app/layout";

const NewHeroSection = ({ data }: any) => {
  return (
    <div className="h-[50vh]">
      <Carousel>
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
