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



  // const discountPercentage = ((price - sellingprice) / price) * 100;
  const discountPercentage = price !== sellingprice ? ((price - sellingprice) / price) * 100 : 0;

  return (
    <div className={`${className}`}>
      {isFinite(discountPercentage) && discountPercentage !== 0 &&
              <p className="text-green-600 mx-1 block sm:hidden"> -{discountPercentage.toFixed(2)}%</p>
            }
      <div className={` ${contentClass}`}>
        {sellingprice && sellingprice > 0 && (
          <span
            className={`flex text-sm text-black/90 relative dark:text-white/90 md:text-[14px] font-semibold !leading-none ${mrpClasses}`}
          >
            <p className="tracking-wide ">Price :</p>
            {isFinite(discountPercentage) && discountPercentage !== 0 &&
              <p className="text-green-600 mx-1 hidden sm:block"> -{discountPercentage.toFixed(2)}%</p>
            }
            <p className="ml-1 ">{` $${String(sellingprice)}`}</p>
          </span>
        )}
        {price && discountPercentage !== 0 && (
          <del
            className={` text-sm md:text-[14px] mt-1  text-gray-500 flex ${sellingClasses}`}
          >
            <p className="mr-1">List Price:</p>
            {` $${String(price)}`}
          </del>
        )}

      </div>
    </div>
  );
};

export default Prices;
