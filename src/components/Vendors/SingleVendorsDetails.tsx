"use client";
import { Rate } from "antd";
import { ChevronRight, Minus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import TabFilters from "../TabFilters";
import ProductCard from "../ProductCard";
import { getAllProducts } from "@/app/page";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "@/app/product-detail/ModalViewAllReviews";

const SingleVendorsDetails = ({ data }) => {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

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
        console.error("Error fetching data:", error);
      }
    };

    fetchSubcategoryProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2 text-base md:text-lg font-medium text-gray-900">
        <h2>2,002 Shop Reviews</h2>
        <Minus className="rotate-90 text-gray-400" />
        <div
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
          onClick={() => setIsOpenModalViewAllReviews(true)}
        >
          <h2>4.9</h2>
          <Rate
            allowHalf
            disabled
            defaultValue={4.9}
            className="text-gray-900 text-sm md:text-base"
          />
          <ChevronRight size={18} />
        </div>
      </div>

      {/* Review Modal */}

      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
      {/* Single Vendors Detail Tab */}
      <div className="py-5">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">{data || "10"} Items</h2>
            <TabFilters showOnlySort={false} />
          </div>
          {/* <ProductCard /> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products &&
              products.map((item, index) => <ProductCard data={item} />)}
          </div>
        </div>
        {/* Additional content goes here */}
      </div>
    </div>
  );
};

export default SingleVendorsDetails;
