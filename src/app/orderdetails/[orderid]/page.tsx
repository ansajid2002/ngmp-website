"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  console.log(params);

  return (
    <>
      <BreadCrumb label1={"Home"} label2={"Order Details"} />

      <div className="flex items-center justify-between px-10 py-5">
        <div className="bg-red-500 text md:w-[50%]">
          <h2>Delivery Address</h2>
          <h2>Ansari Afroz</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio animi
            tempora facere sed aspernatur autem, voluptatum quod placeat ducimus
            ipsum laborum iste nostrum similique laudantium commodi amet.
          </p>
          <h3>
            Phone number <span>7208820113</span>
          </h3>
        </div>
        <div className="bg-blue-gray-500 md:w-[50%]">div2</div>
      </div>
    </>
  );
};

export default page;
