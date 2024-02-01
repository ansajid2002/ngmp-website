"use client";
import { AdminUrl } from "@/app/layout";
import { getAllProducts } from "@/app/page";
import CategoryPageSlick from "@/components/CategoryPageSlick";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { Pagination } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Caregory = () => {
  const params = useParams();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [catData, setCatDataa] = useState(null)
  const [price1, setPrice1] = useState(null)
  const [price2, setPrice2] = useState(null)
  const [selected, setSelected] = useState(null)
  const { category, subcatname } = params
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldTrigger = Math.abs(currentScrollPos - prevScrollPos) >= 50;

      if (shouldTrigger) {
        setVisible(prevScrollPos >= currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  const fetchSubcategoryProducts = async (selectedCategory: string, subcatname: string, pageNumber: number, pageSize: number, sortedMethod: number, selected: any, price1: number, price2: number) => {
    try {
      let slugs
      if (selected) {

        slugs = selected.map(value => {
          // Split the value if necessary
          // Join the parts, convert to lowercase, and replace spaces with hyphens
          return value?.toLowerCase().replace(/\s+/g, '');
        });
      }

      setLoading(true)
      const response = await fetch(`${AdminUrl}/api/getProductBySubCategories_Website?subcat=${subcatname}&category=${selectedCategory?.replace(/[^\w\s]/g, "").replace(/\s/g, "")}&page=${pageNumber}&pageSize=${pageSize}&sortMethod=${sortedMethod}&selected=${slugs}&price1=${price1}&price2=${price2}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      setTotalCount(data?.totalCount || 0)
      setProducts(data?.AllProducts);

      window.scrollTo({ top: 40, behavior: 'smooth' });

    } catch (error) {
      console.log(error);
      // Handle error here
      throw error; // Rethrow the error to be handled by the caller if needed
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubcategoryProducts(category, subcatname, 1, 50, 'priceHighToLow', [], null, null);
  }, []);

  const fetchCat = (catData) => {
    setCatDataa(catData)
  }

  const sendNestedCategories = (selectedCategory) => {
    setSelected(selectedCategory)
    fetchSubcategoryProducts(category, subcatname, page, pageSize, 'priceHighToLow', selectedCategory, price1, price2);
  }

  const sendPriceSlider = async (a, b) => {
    setPrice1(a)
    setPrice2(b)
    fetchSubcategoryProducts(category, subcatname, page, pageSize, 'priceHighToLow', selected, price1, price2);

  }

  return (
    <div style={{ position: "relative" }} className="px-2 md:px-10">
      <CategoryPageSlick data={params} onFetchData={fetchCat} />
      <div
        className={`p-4 sticky transition-all ease-in-out duration-300 z-[30] bg-white ${visible ? "top-32" : "top-0"
          }`}
      >
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
        {/* TABS FILTER */}
        <TabFilters catData={catData} params={params} sendNestedCategories={sendNestedCategories} sendPriceSLider={sendPriceSlider} />
      </div>
      {/* LOOP ITEMS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        {products && products.map((item, index) => <ProductCard data={item} />)}
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
            fetchSubcategoryProducts(category, subcatname, page, pageSize, 'priceHighToLow', selected, price1, price2)
          }} total={totalCount} />
      </div>
    </div>
  );
};

export default Caregory;
