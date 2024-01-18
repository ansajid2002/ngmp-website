"use client";

import React, { useEffect } from "react";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateCustomerData } from "@/redux/slices/customerData";
import { usePathname } from "next/navigation";
import { AdminUrl } from "./layout";
import { getwalletTotal } from "@/redux/slices/walletSlice";

const SiteHeader = ({ session }: any) => {
  const path = usePathname();

  useThemeMode();
  const updateCustomer = session?.user.name.customerData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateCustomer?.customer_id) {
      // Fetch totalBalance from the API only if customerId is provided
      fetchWalletToken();
    }
  }, [updateCustomer?.customer_id]);

  const fetchWalletToken = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/fetchWalletToken?customer_id=${updateCustomer?.customer_id}`);
      const data = await response.json();

      if (response.ok) {
        // Dispatch the getwalletTotal action to update the walletTotal state

        dispatch(getwalletTotal(data.totalBalance || 0));
      } else {
        console.error('Error fetching wallet token:', data.error);
      }
    } catch (error) {
      console.error('Error fetching wallet token:', error);
    }
  };

  useEffect(() => {
    dispatch(updateCustomerData(updateCustomer));
  }, [dispatch]);

  return (
    <>
      {path !== "/auth/signIn" &&
        path !== "/auth/register" &&
        path !== "/auth/forgotpassword" && (
          <HeaderLogged />
        )}
    </>
  );
};

export default SiteHeader;
