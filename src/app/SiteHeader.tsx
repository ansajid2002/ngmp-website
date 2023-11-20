"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/redux/store";
import customerData, { updateCustomerData } from "@/redux/slices/customerData";
import { useDispatch } from "react-redux";

const SiteHeader = ({ session }) => {
  useThemeMode();
  const dispatch = useDispatch()
  const customerData = useAppSelector((state) => state.customerData)
  console.log(customerData);

  const userData = session?.user?.name
  const [customerId, setCustomerId] = useState<number | null>(null)
  const [customerDatas, setCustomerData] = useState<any[] | null>(null)
  useEffect(() => {
    if (userData?.status === 200) {
      setCustomerId(userData?.customerData?.customer_id)
      setCustomerData(userData?.customerData)
      dispatch(updateCustomerData(userData?.customerData))
    }
  }, [session])


  let pathname = usePathname();

  return <HeaderLogged customerId={customerId} customerData={customerDatas} />;
};

export default SiteHeader;
