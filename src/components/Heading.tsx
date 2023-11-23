import React, { ReactNode, CSSProperties } from "react";

interface HeadingProps {
  title: string;
  style?: CSSProperties;
}

const Heading: React.FC<HeadingProps> = ({ title, style }) => {
  return (
    <div className="text-center mb-5">
      <h1 className=" text-[2rem] tracking-wide leading-none font-bold relative inline-block  pb-2">
        {title}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-2 w-24 bg-gradient-to-r from-orange-500 to-blue-20 rounded-full"></div>
      </h1>
    </div>
  );
};

export default Heading;
