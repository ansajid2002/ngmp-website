"use client";

import React, { useEffect } from "react";
import { Tabs, Tab, TabScreen } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { fetchCategoriesAndSubcategories, getAllProducts } from "@/app/page";
import ProductCard from "../ProductCard";
import { useTranslation } from "react-i18next";


const BestSeller = () => {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = React.useState(0);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [selectedCatgory, setSelectedCatgeory] = React.useState("Recommended");
  const [categories, setCategories] = React.useState([]); // Include the initial "Recommended" value
  const [filteredCategories, setFilteredCategories] =
    React.useState(categories); // For filtered categories
  // Define an onClick function to bind the value on tab click
  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const response = await getAllProducts();

        // Filter products based on activeTab value
        let filteredProducts = response;

        if (activeTab === 1) {
          // Filter for the last 30 days
          const last30Days = new Date();
          last30Days.setDate(last30Days.getDate() - 30);

          filteredProducts = response.filter(
            (product: any) => new Date(product.updated_at_product) > last30Days
          );
        } else if (activeTab === 2) {
          // Filter for the last 7 days
          const last7Days = new Date();
          last7Days.setDate(last7Days.getDate() - 7);

          filteredProducts = response.filter(
            (product: any) => new Date(product.updated_at_product) > last7Days
          );
        }

        if (selectedCatgory) {
          let formattedCategory;

          if (selectedCatgory.toLowerCase() === "recommended") {
            // If selectedCatgory is "Recommended," apply a random filter
            const randomIndex = Math.floor(Math.random() * response.length);
            formattedCategory = response[randomIndex].slug_cat;
          } else {
            // Otherwise, format the category
            formattedCategory = selectedCatgory
              .replace(/[^\w\s]/g, "")
              .replace(/\s/g, "");
          }

          console.log(formattedCategory);

          filteredProducts = filteredProducts.filter(
            (product: any) => product.slug_cat === formattedCategory
          );
        }

        setProducts(filteredProducts);

        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchSubcategoryProducts();
  }, [activeTab, selectedCatgory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesAndSubcategories();
        const categoriesWithRecommended = [
          { category_name: "Recommended" },
          ...response,
        ];
        setCategories(categoriesWithRecommended);
        setFilteredCategories(categoriesWithRecommended);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onTabClick = (e: any, index: number) => {
    setActiveTab(index);
  };

  // Labels for your tabs
  const tabLabels = ["Overall", "Within last 30 days", "Within last 7 days"];

  return (
    <div className="px-3 md:px-10 mt-4">
      <div className="md:flex items-center md:justify-between">
        <div className="md:flex items-center">
          <h1 className="text-sm font-semibold mr-2  text-gray-600">
            {t("Best Sellers")}
          </h1>
          <Tabs
            activeTab={activeTab}
            onTabClick={onTabClick}
            mode="scrollSelectedToCenterFromView"
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} className="text-sm border-none focus:ring-0">
                {t(`${label}`)}
              </Tab>
            ))}
          </Tabs>
        </div>
        <div className="md:flex py-2 justify-center items-center">
          <h1 className="text-sm mb-2 md:mb-0 font-semibold mr-2 text-gray-600">
           {t("Filter by category")}
          </h1>
          <Menu
            dismiss={{
              itemPress: false,
            }}
            open={openMenu}
            handler={setOpenMenu}
          >
            <MenuHandler>
              <Button
                variant="text"
                className="flex items-center w-[300px] justify-between gap-1 text-sm md:gap-3 font-normal capitalize tracking-normal border rounded-full"
              >
                {selectedCatgory}
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 flex justify-end transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="max-h-[50vh] scrollbar-hidden">
              <Input
                label="Search"
                containerProps={{
                  className: "mb-4",
                }}
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filtered = categories.filter((item) =>
                    item.category_name.toLowerCase().includes(searchTerm)
                  );
                  setFilteredCategories(filtered);
                }}
              />
              {filteredCategories.map((item: any, i: number) => (
                <MenuItem
                  key={i}
                  className={`${
                    selectedCatgory === item.category_name &&
                    "bg-gray-300 text-black"
                  }`}
                  onClick={() => setSelectedCatgeory(item.category_name)}
                >
                  {item.category_name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>

      {tabLabels.map((label, index) => (
        <TabScreen
          key={index}
          activeTab={activeTab}
          index={index}
          // You can add animation by adding a custom class
        >
          <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 mt-5">
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (item: any, index: number) => (
                    <div>
                      <Skeleton className="w-full h-[250px] bg-gray-200" />
                      <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                      <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                    </div>
                  )
                )
              : products &&
                products?.map((subcat: any, index: number) => (
                  <ProductCard key={index} data={subcat} showTitle={true} />
                ))}
          </div>
        </TabScreen>
      ))}
    </div>
  );
};

export default BestSeller;
