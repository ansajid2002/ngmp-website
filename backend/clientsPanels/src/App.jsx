import { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AcceptReject,
  AdminDashboard,
  AdminProfile,
  HomeBanner,
  Login,
  ManageCategory,
  ManagePermisson,
  MobileBanner,
  NotFound,
  VendorApproval,
  VendorEnable,
  Vendors,
  ViewDetails,
} from "./Admin/pages";
import { AdminSidebar } from "./Admin/components";
import { AdminUrl, adminData, vendorDataDb } from "./Admin/constant";
import {
  BulkProductUpload,
  OrderManagementPage,
  Profile,
  RejectedProducts,
  VendorDashboard,
  VendorLogin,
  Logout,
  Payments,
  VendorProducts,
  Notifications,
  SalesReturn,
  Reports,
} from "./Vendors";
import VendorSidebar from "./Vendors/components/VendorSidebar";
import { AllOrders } from "./Admin/pages/Orders";
import Cookies from "js-cookie";

import Apitest from "./Vendors/api";
import VariantsCrud from "./Vendors/VariantCrud";
import CustomerHome from "./Admin/pages/Customers/Home";
import axios from "axios";
import Coupons from "./Vendors/Coupons";
import AdminSettings from "./Admin/pages/Settings";
import { CustomerAddress } from "./Admin/pages/Customers";
import ClaimForm from "./Vendors/ClaimForm";
import VendorClaimsAdimin from "./Admin/pages/Vendors/VendorClaimsAdimin";
import AdminAttributes from "./Admin/pages/Attributes";
import SellerLanding from "./SellerLanding";
import ChatwithCustomers from "./Vendors/Chats/ChatwithCustomers";
import AdminChatwithCustomers from "./Admin/pages/Chats/AdminChatwithCustomers";
import Wallets from "./Admin/pages/Wallets";
import MediaLibrary from "./Vendors/MediaLibrary";
import VendorPolicies from "./Vendors/components/VendorPolicies";
import Apploading from "./Admin/pages/Apploading";
import BulkApprove from "./Admin/pages/Products/BulkApprove";
import Wallet from "./Admin/pages/Customers/Wallet";
import CustomerClaimsAdimin from "./Admin/pages/Vendors/CustomerClaimsAdimin";

export const websiteUrl = "https://stg.nilegmp.com/"

function AdminRoutes() {
  const [superad, setsuperadmin] = useState(false);
  const [vendorExists, setvendorExists] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [adminLoginData, setadminLoginData] = useState(null);
  const [vendorDatastate, setvendorDatastate] = useState(null);

  let userCurrency = "USD";

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [conversionRates, setConversionRates] = useState({
    USD: 1, // Default to 1 for USD
    EUR: 0,
    ETB: 0,
    SOS: 0,
    KES: 0,
    INR: 0,
  });

  const [isCurrencyloading, setisCurrencyloading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/getConversionRatesUSD`); // Replace AdminUrl with your actual backend endpoint
      if (response.ok) {
        const data = await response.json();

        // Parse the data as floats and set it in the state
        const convertedData = {
          USD: parseFloat(data[0].usd),
          EUR: parseFloat(data[0].eur),
          ETB: parseFloat(data[0].etb),
          SOS: parseFloat(data[0].sos),
          KES: parseFloat(data[0].kes),
        };

        setConversionRates(convertedData);
        setisCurrencyloading(false)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const AdminData = async () => {
      try {
        const jsondata = await adminData();
        setadminLoginData(jsondata);
      } catch (err) {
        console.log(err);
      }
    };

    adminLoginData === null && AdminData();

    const vendorData = async () => {
      try {
        const jsondata = await vendorDataDb();
        setvendorDatastate(jsondata);
      } catch (err) {
        console.log(err);
      }
    };

    vendorDatastate === null && vendorData();
  }, [vendorDatastate]);

  useEffect(() => {
    const SuperAdmin = [
      "/Admin",
      "/Admin/Vendors",
      "/Admin/Vendors/Approval&Reject",
      "/Admin/Vendors/viewDetails",
      "/Admin/Vendors/vendorEnable",
      "/Admin/ManagePermisson",
      "/Admin/ManageCategory",
      "/Admin/customers",
      "/Admin/Products/AcceptReject",
      "/Admin/Orders/all",
      "/Admin/Profile",
      "/Admin/Settings",
      "/Admin/HomeBanner",
      "/Admin/AppLoading",
      "/Admin/MobileBanner",
      "/Admin/customersAddress",
      "/Admin/VendorClaimsAdimin",
      "/Admin/CustomerClaimAdimin",
      "/Admin/attributes",
      "/Admin/AdminChatwithCustomers",
      "/Admin/wallets",
      "/Admin/Products/BulkApprove",
      "/Admin/Customers/Wallet"
    ];
    const checkSuperAdmin = SuperAdmin.includes(path);
    setsuperadmin(checkSuperAdmin);
  }, [path]);

  useEffect(() => {
    const VendorPanel = [
      "/",
      "/Vendors/products/all",
      "/Vendors/Profile",
      "/Vendors/vendorpolicies",
      "/Vendors/products/bulkUpload",
      "/Vendors/products/MediaLibrary",
      "/Vendors/products/Rejected",
      "/Vendors/logout",
      "/Vendors/Orders",
      "/Vendors/Payments",
      "/Vendors/Notifications",
      "/Vendors/SalesReturns",
      "/Vendors/reports",
      "/Vendors/attributes",
      "/Vendors/test",
      "/Vendors/coupons/all",
      "/Vendors/create/create",
      "/Vendors/coupons/expired",
      "/Vendors/ClaimForm",
      "/Vendors/ChatwithCustomers"
    ];
    const checkVendorPanel = VendorPanel.includes(path);
    setvendorExists(checkVendorPanel);
  }, [path]);

  // const isVendorLoggedIn = vendorDatastate && vendorDatastate.length == 0;

  const handleCollapseAPP = (collapse) => {
    setcollapse(collapse);
  };

  return (
    <>
      <div id="google_translate_element"></div>

      {superad ? (
        <>
          <AdminSidebar adminLoginData={adminLoginData} />
          <Routes>
            <Route
              exact
              path="/Admin"
              element={
                <AdminDashboard
                  adminLoginData={adminLoginData}
                  conversionRates={conversionRates}
                  isCurrencyloading={isCurrencyloading}
                />
              }
            />
            <Route
              path="/Admin/Vendors"
              element={<Vendors adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Vendors/Approval&Reject"
              element={<VendorApproval adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Vendors/ViewDetails"
              element={<ViewDetails adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Vendors/vendorEnable"
              element={<VendorEnable adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/ManagePermisson"
              element={<ManagePermisson adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/ManageCategory"
              element={<ManageCategory adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/customers"
              element={<CustomerHome adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/customersAddress"
              element={<CustomerAddress adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Products/AcceptReject"
              element={<AcceptReject adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Profile"
              element={<AdminProfile adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Settings"
              element={<AdminSettings conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/HomeBanner"
              element={<HomeBanner conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/AppLoading"
              element={<Apploading conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/MobileBanner"
              element={<MobileBanner conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/VendorClaimsAdimin"
              element={<VendorClaimsAdimin conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/CustomerClaimAdimin"
              element={<CustomerClaimsAdimin conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/attributes"
              element={<AdminAttributes conversionRates={conversionRates} adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Orders/all"
              element={
                <AllOrders
                  adminLoginData={adminLoginData}
                  conversionRates={conversionRates}
                  isCurrencyloading={isCurrencyloading}
                />
              }
            />

            <Route
              path="/Admin/AdminChatwithCustomers"
              element={<AdminChatwithCustomers adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/wallets"
              element={<Wallets adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Products/BulkApprove"
              element={<BulkApprove adminLoginData={adminLoginData} />}
            />
            <Route
              path="/Admin/Customers/Wallet"
              element={<Wallet adminLoginData={adminLoginData} />}
            />
          </Routes>
        </>
      ) : vendorExists ? (
        <>
          <VendorSidebar
            vendorDatastate={vendorDatastate}
            handleCollapseAPP={handleCollapseAPP}
          />
          <div
            className={`mx-auto p-3 sm:p-8  mt-20 sm:mt-20 bg-gray-100 ${collapse
              ? "sm:ml-64 transition-all duration-300 ease-in"
              : "sm:ml-0 transition-all duration-300 ease-out"
              }`}
          >
            <Routes>
              {/* Other routes */}
              <Route
                path="/"
                element={
                  <VendorDashboard
                    vendorDatastate={vendorDatastate}
                    conversionRates={conversionRates}
                    isCurrencyloading={isCurrencyloading}
                  />
                }
              />
              <Route
                path="/Vendors/products/all"
                element={<VendorProducts vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/Profile"
                element={<Profile vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/vendorpolicies"
                element={<VendorPolicies vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/products/bulkUpload"
                element={
                  <BulkProductUpload vendorDatastate={vendorDatastate} />
                }
              />
              <Route
                path="/Vendors/products/MediaLibrary"
                element={
                  <MediaLibrary vendorDatastate={vendorDatastate} />
                }
              />
              <Route
                path="/Vendors/products/Rejected"
                element={<RejectedProducts vendorDatastate={vendorDatastate} />}
              />
              <Route path="/Vendors/logout" element={<Logout />} />
              <Route
                path="/Vendors/Orders"
                element={
                  <OrderManagementPage
                    vendorDatastate={vendorDatastate}
                    conversionRates={conversionRates}
                    isCurrencyloading={isCurrencyloading}
                    userCurrency={userCurrency}
                  />
                }
              />
              <Route
                path="/Vendors/Payments"
                element={
                  <Payments
                    vendorDatastate={vendorDatastate}
                    conversionRates={conversionRates}
                    isCurrencyloading={isCurrencyloading}
                    userCurrency={userCurrency}
                  />
                }
              />
              <Route
                path="/Vendors/SalesReturns"
                element={
                  <SalesReturn
                    vendorDatastate={vendorDatastate}
                    conversionRates={conversionRates}
                    isCurrencyloading={isCurrencyloading}
                    userCurrency={userCurrency}
                  />
                }
              />
              <Route
                path="/Vendors/Notifications"
                element={<Notifications vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/reports"
                element={<Reports vendorDatastate={vendorDatastate} />}
              />

              <Route
                path="/Vendors/test"
                element={<VariantsCrud vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/ClaimForm"
                element={<ClaimForm vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/coupons/all"
                element={<Coupons vendorDatastate={vendorDatastate} />}
              />
              <Route
                path="/Vendors/ChatwithCustomers"
                element={<ChatwithCustomers vendorDatastate={vendorDatastate} />}
              />
              {/* ... other routes */}
            </Routes>
          </div>
        </>
      ) : path !== '/seller' ? (
        <Routes>
          <Route path="/Admin/Login" element={<Login />} />
          <Route
            path="/Admin/404"
            element={<NotFound adminLoginData={adminLoginData} />}
          />
          {/* For Vendor Login Route  */}
          <Route path="/Vendors/Login" element={<VendorLogin />} />
          <Route path="/Vendors/api" element={<Apitest />} />

        </Routes>

      ) : path == '/seller' ? (
        <Routes>
          <Route path="/seller" element={<SellerLanding />} />
        </Routes>
      ) : 'Loading'}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;