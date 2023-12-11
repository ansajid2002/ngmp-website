"use client";

import React, { useEffect } from "react";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateCustomerData } from "@/redux/slices/customerData";

const SiteHeader = ({ session }) => {
  console.log(session, 'sess');

  useThemeMode();
  const customerData = useAppSelector((state) => state.customerData)
  const updateCustomer = session?.user.name.customerData
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateCustomerData(updateCustomer))
  }, [dispatch])


  return <HeaderLogged customerId={customerData?.customerData?.customer_id || null} customerData={customerData?.customerData} />;
};

export default SiteHeader;
