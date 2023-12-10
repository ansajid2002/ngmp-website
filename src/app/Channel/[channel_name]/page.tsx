"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import BestSeller from "@/components/Channels/BestSeller";
import NewArrivals from "@/components/Channels/NewArrivals";
import Shops from "@/components/Channels/Shops";
import ProductListingWithFilter from "@/components/ProductListingWithFilter/ProductListingWithFilter";

const Channel = () => {
  const params = useParams();

  const { channel_name } = params;

  const search = useSearchParams()
  const searchEncrypt = search && search.get('query') || ''
  const decryptedText = atob(searchEncrypt)



  return (
    <div>
      {channel_name === "best-seller" && <BestSeller />}
      {channel_name === "new-arrivals" && <NewArrivals />}
      {channel_name === "Shops" && <Shops />}
      {channel_name === "search" && <ProductListingWithFilter searchTerm={decryptedText || ''} />}
    </div>
  );
};

export default Channel;
