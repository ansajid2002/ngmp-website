import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: any;
  sellingprice?: any;
  contentClass?: string;
  mrpClasses?: string;
  sellingClasses?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 0,
  sellingprice = 0,
  contentClass = "py-1 md:py-1.5 text-sm font-medium",
  mrpClasses = "",
  sellingClasses = "",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center gap-1 ${contentClass}`}>
        {
          price && price > 0 && <del
            className={`md:mx-2 text-sm md:text-base  text-gray-600 flex ${sellingClasses}`}
          >
            <p>$</p>
            {String(price)}
          </del>
        }
        {
          sellingprice && sellingprice > 0 && <span
            className={`flex text-base text-black/90 relative dark:text-white/90 md:text-lg font-semibold !leading-none ${mrpClasses}`}
          >
            <p className="absolute top-[-2.5px]">$</p>
            <p className="ml-[10px]">{String(sellingprice)}</p>
          </span>
        }

      </div>
    </div>
  );
};

export default Prices;
