"use client";

import React, { useEffect } from "react";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateCustomerData } from "@/redux/slices/customerData";
import { usePathname } from "next/navigation";

const SiteHeader = ({ session }) => {
  const path = usePathname();
  console.log(path, "PATHHHHHHHHH");

  console.log(session, "sess");

  useThemeMode();
  const customerData = useAppSelector((state) => state.customerData);
  const updateCustomer = session?.user.name.customerData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCustomerData(updateCustomer));
  }, [dispatch]);

  return (
    <>
      {path !== "/auth/signIn" &&
        path !== "/auth/register" &&
        path !== "/auth/forgotpassword" && (
          <HeaderLogged
            customerId={customerData?.customerData?.customer_id || null}
            customerData={customerData?.customerData}
          />
        )}
    </>
  );
};

export default SiteHeader;
