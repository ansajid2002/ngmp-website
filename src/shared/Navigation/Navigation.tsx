import React, { useState, useEffect } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { fetchCategoriesAndSubcategories } from "@/app/page";
import { useAppSelector } from "@/redux/store";

// Replace "yourFilePath" with the actual path to your data fetching function

function Navigation() {
  const [navigationData, setNavigationData] = useState([]);
  const { availablelanguages } = useAppSelector(
    (store) => store.languagesReducer
  );

  useEffect(() => {
    const fetchAndSetData = async () => {
      const updatedNavigation: any = await Promise.all(
        NAVIGATION_DEMO_2.map(async (item) => {
          if (item.type === "megaMenu") {
            const childrenData = await fetchCategoriesAndSubcategories();
            return {
              ...item,
              children: childrenData || [],
            };
          } else if (item.type === "dropdown") {
            const childrenData = availablelanguages;
            return {
              ...item,
              children: childrenData || [],
            };
          }
          return item;
        })
      );
      setNavigationData(updatedNavigation);
      // console.log(updatedNavigation);
    };

    fetchAndSetData();
  }, []);

  return (
    <ul className="nc-Navigation flex items-center">
      {navigationData.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
