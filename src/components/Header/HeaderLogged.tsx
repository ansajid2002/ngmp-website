import React, { FC, useEffect } from "react";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps {
  customerId: string;
}

const HeaderLogged: FC<HeaderLoggedProps> = ({ customerId }) => {


  return (
    <div className="sticky top-0 w-full z-40">
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;