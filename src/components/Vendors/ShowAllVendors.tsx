"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Rate } from "antd";
import { getAllVendors } from "@/app/page";
import { AdminUrl } from "@/app/layout";
import SingleVendorsCard from "./SingleVendorsCard";

const ShowAllVendors = () => {
  const [allVendors, setAllVendors] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendors = await getAllVendors();
        // console.log(vendors);
        setAllVendors(vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Logging outside useEffect or using useEffect cleanup function
  useEffect(() => {
    console.log(allVendors, "VENDORSSS");
    // If you want to perform some action when allVendors changes, do it here
  }, [allVendors]);

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
      </div>
    </div>
  );
};

export default ShowAllVendors;
