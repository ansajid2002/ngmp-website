"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = ({ session }) => {
  useThemeMode();

  console.log(session, 'sasa');

  let pathname = usePathname();

  return <HeaderLogged customerId="71" />;
};

export default SiteHeader;
