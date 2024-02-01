"use client"
import React, { ReactNode, CSSProperties } from "react";
import { useTranslation } from "react-i18next";

interface HeadingProps {
  title: string;
  style?: CSSProperties;
}

const Heading: React.FC<HeadingProps> = ({ title, style }) => {
  const {t} = useTranslation()
  return (
    <div className="text-center mb-5">
      <h1 className=" text-[2rem] tracking-wide leading-none font-bold relative inline-block  pb-2">
      {t(`${title}`)}
        {/* {title} */}
        <div className="absolute -bottom-1 left-1/2 transform -trangray-x-1/2 h-2 w-24 bg-gradient-to-r from-orange-500 to-blue-20 rounded-full"></div>
      </h1>
    </div>
  );
};

export default Heading;
