import { AiOutlinePieChart, AiOutlineUserAdd } from "react-icons/ai";
import {
  RiAlbumLine,
  RiChat1Line,
  RiChatSmile2Fill,
  RiChatVoiceLine,
  RiFileList3Line,
  RiFileShield2Line,
  RiFilter2Line,
  RiFlag2Line,
  RiFlagFill,
  RiOrderPlayLine,
  RiPhoneLine,
  RiSendPlaneLine,
  RiUser2Line,
  RiVoiceprintFill,
  RiWallet2Fill,
  RiWallet2Line,
} from "react-icons/ri";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import Cookies from "js-cookie";
import { FaDesktop, FaHandPaper, FaHandRock, FaMobile, FaTruckLoading, FaUserCheck } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { IoLanguage } from "react-icons/io5";
import { SiDeliveroo } from "react-icons/si";

export const AdminUrl = "http://localhost:3001";
export const ProductImageUrl = "https://ngmp-products.s3.us-east-005.backblazeb2.com";

export const links = [
  {
    id: 1,
    title: "Main",
    links: [
      {
        id: 1,
        name: "Dashboard",
        icon: <AiOutlinePieChart />,
        to: "/Admin",
      },
      {
        id: 2,
        name: "Category",
        icon: <RiFilter2Line />,
        to: "/Admin/ManageCategory",
      },
      {
        id: 3,
        name: "Attributes",
        icon: <RiFlag2Line />,
        to: "/Admin/attributes",
      },
      {
        id: 4,
        name: "Specifications",
        icon: <FiEdit2 />,
        to: "/Admin/Settings?mode=Specification",
      },
      {
        id: 5,
        name: "Roles & Permissons",
        icon: <RiOrderPlayLine />,
        to: "/Admin/ManagePermisson",
      },
    ],
  },
  {
    id: 2,
    title: 'Manage',
    links: [
      {
        id: 6,
        name: "Vendors",
        icon: <AiOutlineUserAdd />,
        dropdown: true,
        dropList: [
          { id: 7, name: "View Vendors", to: "/Admin/Vendors" },
          { id: 8, name: "Approve/Reject Applications", to: "/Admin/Vendors/Approval&Reject" },
          { id: 9, name: "Enable/Disable Accounts", to: "/Admin/Vendors/vendorEnable" },
          { id: 10, name: "", to: "/Admin/Vendors/viewDetails" },
          { id: 11, name: "Product Approval", to: "/Admin/Products/AcceptReject" },
          { id: 12, name: "Bulk Product Approval", to: "/Admin/Products/BulkApprove" },
        ],
      },
      {
        id: 13,
        name: "Orders",
        icon: <RiFileList3Line />,
        dropdown: true,
        dropList: [
          { id: 14, name: "View Orders", to: "/Admin/Orders/all" },
          // { name: "Track Orders", to: "/Admin/Orders/track" },
        ],
      },
      {
        id: 15,
        name: "Customer",
        icon: <RiUser2Line />,
        dropdown: true,
        dropList: [
          { id: 16, name: "View Customers", to: "/Admin/customers" },
          { id: 17, name: "Customers Address", to: "/Admin/customersAddress" },
        ],
      },
    ]
  },
  {
    id: 3,
    title: 'Claims',
    links: [
      {
        id: 18,
        name: "Vendors Claims",
        icon: <RiVoiceprintFill />,
        to: "/Admin/VendorClaimsAdimin",
      },
      {
        id: 19,
        name: "Customers Claims",
        icon: <RiVoiceprintFill />,
        to: "/Admin/CustomerClaimAdimin",
      },
      {
        id: 27,
        name: "Buyer report",
        icon: <RiFileShield2Line />,
        to: "/Admin/BuyerReports",
      }
    ]
  },
  {
    id: 4,
    title: 'Manage Wallet',
    links: [
      {
        id: 20,
        name: "Customer Wallet",
        icon: <RiWallet2Line />,
        to: "/Admin/Customers/Wallet",
      }
    ]
  },
  {
    id: 5,
    title: 'Manage Loading Screen',
    links: [
      {
        id: 21,
        name: "App Loading Screen",
        icon: <AiOutlineLoading3Quarters />,
        to: "/Admin/AppLoading",
      },
    ]
  },
  {
    id: 6,
    title: 'Manage Banner',
    links: [
      {
        id: 22,
        name: "Desktop",
        icon: <FaDesktop />,
        to: "/Admin/HomeBanner",
      },
      {
        id: 23,
        name: "Mobile",
        icon: <RiPhoneLine />,
        to: "/Admin/MobileBanner",
      },
    ]
  },
  {
    id: 7,
    title: 'V-C Chats',
    links: [
      {
        id: 24,
        name: "Chats",
        icon: <RiChat1Line />,
        to: "/Admin/AdminChatwithCustomers",
      },
    ]
  },
  {
    id: 8,
    title: 'Manage Delivery',
    links: [
      {
        id: 25,
        name: "Deliver Order",
        icon: <RiSendPlaneLine />,
        to: "/Admin/OrderDelivery",
      },
    ]
  },
  {
    id: 9,
    title: 'Upload Languages Files',
    links: [
      {
        id: 26,
        name: "Languages Files",
        icon: <IoLanguage />,
        to: "/Admin/Languages",
      },
    ]
  },
];


export const adminData = async () => {
  const loggedId = Cookies.get("adminData");
  try {
    const response = await fetch(`${AdminUrl}/api/getAdminData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const vendorDataDb = async () => {
  const loggedId = Cookies.get("vendorData");
  try {
    const response = await fetch(`${AdminUrl}/api/getVendorData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedId,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const customerDataDB = async () => {
  const customerLoginCookies = Cookies.get("customerLoginCookies");
  try {
    const response = await fetch(`${AdminUrl}/api/getCustomerLoginData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerLoginCookies,
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const categoriesData = async () => {
  try {
    const response = await fetch(`${AdminUrl}/api/getAllProductCatgeory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories data.");
  }
};

export const subcategoriesData = async () => {
  try {
    const response = await fetch(`${AdminUrl}/api/getAllSubcategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories data.");
  }
};


export const getAllVendorProductvariants = async (category) => {
  try {
    const response = await fetch(`${AdminUrl}/api/getAllVendorAttributes?category=${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories data.");
  }
};

export async function fetchVariantProducts() {
  try {
    // Make a GET request to the backend API endpoint that fetches variant products
    const response = await fetch(`${AdminUrl}/api/variant-products`); // Replace with your actual API endpoint

    // Check if the response status is OK (HTTP 200)
    if (!response.ok) {
      // Handle errors, e.g., throw an error or return an error message
      throw new Error('Error fetching variant products');
    }

    // Parse the JSON response data
    const data = await response.json();

    // Handle the data as needed, e.g., update your component state
    // Return the fetched data if needed
    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or data processing
    console.error('Fetch error:', error);

    // You can also throw the error or return an error message
    throw error;
  }
}

export const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
};
