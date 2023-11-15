import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: any;
  sellingprice?: any;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 0,
  sellingprice = 0,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        <span className="text-black/90 dark:text-white/90 text-lg font-bold !leading-none">${String(sellingprice)}</span>
        <del className="mx-2 text-sm text-gray-400">${String(price)}</del>
      </div>
    </div>
  );
};

export default Prices;
