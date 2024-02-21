"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Pagination, Rate } from "antd";
import { getAllVendors } from "@/app/page";
import { AdminUrl } from "@/app/layout";
import SingleVendorsCard from "./SingleVendorsCard";

const ShowAllVendors = () => {
  const [allVendors, setAllVendors] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [total, setTotal] = useState(0);

  const getAllVendors = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(`${AdminUrl}/api/allVendors?pageNumber=${page}&pageSize=${pageSize}`, {
        next: { revalidate: 30 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setAllVendors(data?.vendors);
      setTotal(data?.totalCount)
      // Log the data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllVendors(page, pageSize)
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="px-5 md:px-10 ">
      <ul className="pt-5 md:pt-5 flex items-center justify-start gap-1 text-gray-800">
        <li>Home</li>
        <ChevronRight size={20} />
        <li>Shops</li>
      </ul>

      <div className="py-5">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  gap-5 items-center justify-center">
          {allVendors &&
            allVendors.map((item: any, index: any) => (
              <SingleVendorsCard item={item} index={index} />
            ))}


        </div>

        <div className="flex justify-center items-center py-10">
          <Pagination
            hideOnSinglePage
            showQuickJumper
            showSizeChanger
            total={total}
            pageSize={pageSize}
            current={page}
            onChange={async (page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
              try {
                getAllVendors(page, pageSize)
              } catch (error) {
                console.error("Error fetching vendors:", error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowAllVendors;
