"use client";
import React, { useEffect, useState } from "react";
import { fetchCategoriesAndSubcategories, getAllProducts } from "@/app/page";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "../ProductCard";
import { ChevronRight } from "lucide-react";
import BreadCrumb from "../BreadCrumb";

const NewArrivals = () => {
  const [loading, setLoading] = useState(true);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  console.log("newArrivalProducts");
  console.log(newArrivalProducts);
  console.log("newArrivalProducts");

  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const response = await getAllProducts();

        setNewArrivalProducts(response);

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
      {/* <h1 className='font-medium text-xl text-center my-2' >New Arrivals</h1> */}
      <BreadCrumb label1={"Home"} label2={"New Arrivals"} />
      <div className="px-2 md:mx-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5">
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
              <div>
                <Skeleton className="w-full h-[250px] bg-gray-200" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
              </div>
            ))
          : newArrivalProducts &&
            newArrivalProducts?.map((subcat: any, index: number) => (
              <ProductCard key={index} data={subcat} showTitle={true} />
            ))}
      </div>
    </div>
  );
};

export default NewArrivals;
