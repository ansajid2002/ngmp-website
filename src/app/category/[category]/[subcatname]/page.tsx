"use client";
import { getAllProducts } from "@/app/page";
import CategoryPageSlick from "@/components/CategoryPageSlick";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Caregory = () => {
  const params = useParams();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState(null);

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

  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const response = await getAllProducts();

        // Filter products based on activeTab value
        let filteredProducts = response;



        setProducts(filteredProducts);

        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchSubcategoryProducts();
  }, []);


  return (
    <div style={{ position: "relative" }} className="px-2 md:px-10">
      <CategoryPageSlick data={params} />
      <div className={`p-4 sticky transition-all ease-in-out duration-300 z-[30] bg-white ${visible ? 'top-32' : 'top-0'}`}>
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
        {/* TABS FILTER */}
        <TabFilters />
      </div>
      {/* LOOP ITEMS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
        {products &&
          products.map((item, index) => (
            <ProductCard data={item} />
          ))}
      </div>
    </div>
  );
};

export default Caregory;
