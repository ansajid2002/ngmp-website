"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import SingleVendors from "../Vendors/SingleVendors";
import ShowAllVendors from "../Vendors/ShowAllVendors";

const Shops = () => {
  const path = useSearchParams();
  const vendorId = path.get("vendorid");

  return <>{!vendorId ? <ShowAllVendors /> : <SingleVendors />}</>;
};

export default Shops;
