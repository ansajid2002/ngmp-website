import { FireIcon } from "@heroicons/react/24/solid";
import { t } from "i18next";
import React from "react";

const PopularSearches = () => {
  const popularSearches = [
    "room decor",
    "bedroom decor",
    "christmas decorations clearance",
    "plus size women clothing",
    "bed comforter sets",
    "duvet covers queen size",
    "skin care",
    "montessori toys",
    "christmas clearance",
    "toddler learning toys",
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t("Popular Searches")}</h2>

      <div className="flex flex-wrap gap-2">
        {popularSearches.map((search, index) => (
          <div className="flex gap-1 items-center bg-gray-200 hover:bg-gray-300 rounded-full px-2 py-1 cursor-pointer">
            <FireIcon className="w-6 h-6 text-orange-400" />
            <h1 key={index} className="text-gray-700 dark:text-gray-300">
              {search}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
