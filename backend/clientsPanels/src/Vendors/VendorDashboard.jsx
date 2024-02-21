import React, { useEffect, useState } from "react";
import DashboardMetrics from "./components/DashboardsMetrics";
import AuthCheck from "./components/AuthCheck";
import CategorySales from "./components/CategorySales";
import IncompleteProfile from "./components/IncompleteProfile";

const VendorDashboard = ({
  vendorDatastate,
  conversionRates,
  isCurrencyloading,
}) => {

  return vendorDatastate && vendorDatastate?.length > 0 ? (
    <>
      <>
        {!vendorDatastate?.[0].email_verification_status ||
          // !vendorDatastate?.[0].mobile_verification_status ||
          vendorDatastate?.[0].status === 1 ||
          vendorDatastate?.[0].status === 4 || vendorDatastate?.[0].status !== 3 ? (
          <>
            <AuthCheck vendorDatastate={vendorDatastate} />
          </>
        ) : (
          <>
            <div className="mb-10 transition-all duration-75 ease-in-out">
              <IncompleteProfile vendorDatastate={vendorDatastate} />
            </div>
            <DashboardMetrics
              vendorDatastate={vendorDatastate}
              conversionRates={conversionRates}
              isCurrencyloading={isCurrencyloading}
            />
            {/* <SalesChart /> */}
            <div className="mt-10">
              <CategorySales
                vendorDatastate={vendorDatastate}
                conversionRates={conversionRates}
                isCurrencyloading={isCurrencyloading}
              />
            </div>
          </>
        )}
      </>
    </>
  ) : (
    <div className="bg-white h-screen p-2 absolute top-0 left-0 w-full overflow-hidden transition-all duration-75 ease-in-out">
      <div className="bg-gray-200 w-full h-24 rounded animate-pulse"></div>
      <div className="flex gap-2">
        <div className="w-48 bg-gray-200 h-screen my-2  rounded-md animate-pulse"></div>
        <div className="w-full bg-gray-200 h-screen my-2 rounded-md  animate-pulse"></div>
      </div>
    </div>
  );
};

export default VendorDashboard;
