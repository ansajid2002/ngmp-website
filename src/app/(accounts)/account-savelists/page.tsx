"use client";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import { useAppSelector } from "@/redux/store";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const AccountSavelists = () => {
  const { wishlistItems } = useAppSelector((store) => store.wishlist);
  console.log(wishlistItems);
  const {t} = useTranslation()
  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("List of saved products")}
        </h2>
        <h2 className="text-lg transition-all ease-in-out duration-300 cursor-pointer hover:text-[#ed642b] font-medium flex gap-1 items-center ">
          {t("Add all to cart")} <ChevronRight size={20} className="mt-1" />
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4 ">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item: any, index: any) => (
            <ProductCard key={index} data={item} />
          ))
        ) : (
          <p>{t("No items in the wishlist.")}</p>
        )}
      </div>
    </div>
  );
};

export default AccountSavelists;
