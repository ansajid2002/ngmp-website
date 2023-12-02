import { Check } from "lucide-react";
import React from "react";

const ProductSalebadge = ({ bgImg, dealimg, label1, label2 }) => {
  const styling = {
    backgroundImage: `url(${bgImg})`,
  };

  return (
    <>
      <div
        style={styling}
        className="text-white py-1 px-2 rounded-lg text-[0.7rem] md:text-[0.8rem] flex justify-between items-center"
      >
        <div className="flex items-center ">
          <img src={dealimg} className="h-[25px] md:h-[30px]" />
          <Check size={15} className="mt-1 mr-1 md:mr-2" />
          <span>{label1}</span>
        </div>
        <span className="hidden md:block">{label2}</span>
      </div>
    </>
  );
};

export default ProductSalebadge;
