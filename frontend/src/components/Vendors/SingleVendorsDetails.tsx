"use client";
import { Pagination, Rate } from "antd";
import { ChevronRight, Minus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import TabFilters from "../TabFilters";
import ProductCard from "../ProductCard";
import { getAllProducts, getReviewData } from "@/app/page";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "@/app/product-detail/ModalViewAllReviews";
import { AdminUrl } from "@/app/layout";

const SingleVendorsDetails = ({ data }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [totalReviews, setTotalReviews] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [average_rating, setaverageRating] = React.useState(null);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);

  const fetchSubcategoryProducts = async (page: any, pageSize: any) => {
    try {
      setLoading(true);

      // Fetch all products
      const response = await fetch(`${AdminUrl}/api/getVendorProductsAR?vendorid=${data?.id}&page=${page}&pageSize=${pageSize}`);


      if (response.ok) {
        const data = await response.json()
        setProducts(data);
      }

      setTimeout(() => {
        setLoading(false);
      }, 600);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {


    fetchSubcategoryProducts(page, pageSize);
  }, []);


  useEffect(() => {
    const fetchRating = async () => {
      const shopReviewData = await getReviewData(null, data?.id)
      const nonEmptyReviews = shopReviewData && shopReviewData.ratingsData.filter((entry: any) => entry.review_text?.trim() !== '');
      const nonEmptyReviewCount = nonEmptyReviews && nonEmptyReviews.length;

      const totalRating = nonEmptyReviews && nonEmptyReviews.reduce((sum: any, entry: any) => sum + entry.rating, 0);
      const averageRating = nonEmptyReviewCount > 0 ? totalRating / nonEmptyReviewCount : 0;


      setTotalReviews(nonEmptyReviewCount)
      setaverageRating(averageRating)
    }

    fetchRating()
  }, [])
  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2 text-base md:text-lg font-medium text-gray-900">
        <h2>{totalReviews} Shop Reviews</h2>
        <Minus className="rotate-90 text-gray-400" />
        <div
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
          onClick={() => setIsOpenModalViewAllReviews(true)}
        >
          <h2>({average_rating})</h2>
          <Rate
            allowHalf
            disabled
            value={average_rating}
            defaultValue={parseInt(average_rating) || 2}
            className="text-gray-900 text-sm md:text-base"
          />
          <ChevronRight size={18} />
        </div>
      </div>

      {/* Review Modal */}

      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        productid={null}
        vendorID={data?.id}
        shopShow={true}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
      {/* Single Vendors Detail Tab */}
      <div className="py-5">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">{products && products?.totalProducts || "0"} Items</h2>
            {/* <TabFilters showOnlySort={false} /> */}
          </div>
          {/* <ProductCard /> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products && products?.products.map((item: any) => <ProductCard data={item} />)}
          </div>

          <div className="flex justify-center mt-10">
            <Pagination
              // hideOnSinglePage
              current={page}
              responsive
              pageSize={pageSize}
              onChange={(page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
                fetchSubcategoryProducts(page, pageSize);
                window.scrollTo({ top: 150, behavior: 'smooth' });

              }}
              total={products?.totalProducts || 1} />
          </div>
        </div>
        {/* Additional content goes here */}

      </div>
    </div>
  );
};

export default SingleVendorsDetails;
