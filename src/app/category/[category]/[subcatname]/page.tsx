"use client";
import CategoryPageSlick from "@/components/CategoryPageSlick";
import { useParams } from "next/navigation";
import React from "react";

const Caregory = () => {
  const params = useParams();
  //   console.log(params);

  return (
    <div>
      <CategoryPageSlick data={params} />
    </div>
  );
};

export default Caregory;
