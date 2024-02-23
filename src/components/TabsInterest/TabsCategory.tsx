"use client";

import React, { useEffect } from "react";
import { Tabs, Tab, TabScreen } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import ProductCard from "../ProductCard";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";


const TabsCategory = ({ categoriesdata }) => {
  const allSubcategories = categoriesdata.flatMap(
    (category: any) => category.subcategories
  );
  const [activeTab, setActiveTab] = React.useState(0);
  const [subcatname, setSubcatname] = React.useState(
    allSubcategories[0]?.subcategory_name
  );
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [total, setTotal] = React.useState(0);
  const { t } = useTranslation()
  const onTabClick = (e: any, index: number, subcategoryName: string) => {
    setActiveTab(index);
    // Now you can use the subcategoryName as needed
    setSubcatname(subcategoryName);
  };

  const fetchSubcategoryProducts = async (page: number, pageSize: number) => {
    try {
      setProducts(null);
      setLoading(true);

      const replacesubcategory = subcatname
        .replace(/[^\w\s]/g, "")
        .replace(/\s/g, "");

      // Include page and pageSize parameters in the URL
      const url = `/api/subcatgeoryProducts/${replacesubcategory}/1/10`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache', // Prevent caching
        },
      });

      const data = await response.json();

      setProducts(data?.AllProducts);
      setTotal(data?.totalCount);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };



  useEffect(() => {
    fetchSubcategoryProducts(page, pageSize)
  }, [activeTab])

  return (
    <>
      <Tabs
        activeTab={activeTab}
        onTabClick={(e, index) =>
          onTabClick(e, index, allSubcategories[index].subcategory_name)
        }
        mode={`scrollSelectedToCenterFromView`}
        selectedAnimationDuration={300}
      >
        {allSubcategories.map((item: any) => (
          <Tab key={item.subcategory_name}>{t(`${item.subcategory_name}`)}</Tab>
        ))}
      </Tabs>

      <TabScreen key={activeTab} activeTab={activeTab} index={activeTab}>
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 px-2 mt-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
              <div>
                <Skeleton className="w-full h-[250px] bg-gray-200" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 px-2 mt-10">
              {products &&
                products.map((subcat, index) => (
                  <ProductCard key={index} data={subcat} showTitle={true} />
                ))}
            </div>
            <div>
              <Pagination
                hideOnSinglePage
                current={page}
                responsive
                pageSize={pageSize}
                onChange={(page, pageSize) => {
                  setPage(page)
                  setPageSize(pageSize)
                  fetchSubcategoryProducts(page, pageSize);
                  window.scrollTo({ top: 150, behavior: 'smooth' });

                }}
                total={total || 1} />
            </div>
          </>
        )}
      </TabScreen>
    </>
  );
};

export default TabsCategory;
