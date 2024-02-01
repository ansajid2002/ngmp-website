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
import { AdminUrl } from "@/app/layout";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";


const BestSeller = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = React.useState(0);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [categories, setCategories] = React.useState(null); // Include the initial "Recommended" value
  const [filteredCategories, setFilteredCategories] = React.useState(null); // For filtered categories
  const [selectedCatgory, setSelectedCatgeory] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [totalCount, setTotalCount] = React.useState(0);
  // Define an onClick function to bind the value on tab click

  const fetchSubcategoryProducts = async (selectedCategory: string, pageNumber: number, pageSize: number, type: number) => {
    try {

      const response = await fetch(`${AdminUrl}/api/getProductByCategories?category=${selectedCategory?.replace(/[^\w\s]/g, "").replace(/\s/g, "")}&page=${pageNumber}&pageSize=${pageSize}&type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      setTotalCount(data?.totalCount || 0)
      setProducts(data?.AllProducts);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.log(error);
      // Handle error here
      throw error; // Rethrow the error to be handled by the caller if needed
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesAndSubcategories();
        setCategories(response);
        setFilteredCategories(response);
        setSelectedCatgeory(response?.[0]?.category_name)
        fetchSubcategoryProducts(response?.[0]?.category_name, 1, 10, activeTab)

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    !categories && fetchCategories();
  }, [categories]);


  useEffect(() => {
    selectedCatgory && selectedCatgory.trim() !== '' && fetchSubcategoryProducts(selectedCatgory, 1, 10, activeTab);
  }, [activeTab])

  const onTabClick = (e: any, index: number, selectedCatgory: string) => {
    console.log(selectedCatgory, categories, 'cat name data');

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
            onTabClick={(e: any, index: number) => onTabClick(e, index, selectedCatgory)}
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
                  className={`h-3.5 w-3.5 flex justify-end transition-transform ${openMenu ? "rotate-180" : ""
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
                  const filtered = searchTerm && searchTerm.trim() !== '' && categories.filter((item) =>
                    item.category_name.toLowerCase().includes(searchTerm)
                  );
                  setFilteredCategories(filtered);
                }}
              />
              {filteredCategories && filteredCategories.map((item: any, i: number) => (
                <MenuItem
                  key={i}
                  className={`${selectedCatgory === item.category_name &&
                    "bg-gray-300 text-black"
                    }`}
                  onClick={() => {
                    setSelectedCatgeory(item.category_name)
                    fetchSubcategoryProducts(item.category_name, 1, 10, activeTab)
                  }}
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
          {loading ? (
            <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 mt-5">
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
                  <div key={index}>
                    <Skeleton className="w-full h-[250px] bg-gray-200" />
                    <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                    <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                  </div>
                ))
              }
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 mt-5">
                {products.map((subcat: any, index: number) => (
                  <ProductCard key={index} data={subcat} showTitle={true} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Pagination
                  hideOnSinglePage
                  current={page}
                  responsive
                  showQuickJumper
                  showTitle
                  showSizeChanger
                  pageSize={pageSize}
                  onChange={(page: number, pageSize: number) => {
                    setPage(page)
                    setPageSize(pageSize)
                    fetchSubcategoryProducts(selectedCatgory, page, pageSize, activeTab)
                  }} total={totalCount} />
              </div>
            </>
          ) : (
            <p>No Products found</p>
          )}


        </TabScreen>
      ))}


    </div>
  );
};

export default BestSeller;
