"use client";

import React, { useEffect } from "react";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateCustomerData } from "@/redux/slices/customerData";

const SiteHeader = ({ session }) => {
  useThemeMode();
  const updateCustomer = session?.user.name.customerData
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateCustomerData(updateCustomer))
  }, [dispatch])


  return <HeaderLogged />;
};

export default SiteHeader;
