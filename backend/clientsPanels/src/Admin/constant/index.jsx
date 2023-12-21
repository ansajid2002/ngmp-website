import { AiOutlinePieChart, AiOutlineUserAdd } from "react-icons/ai";
import {
  RiAlbumLine,
  RiChatSmile2Fill,
  RiChatVoiceLine,
  RiFileList3Line,
  RiFilter2Line,
  RiFlagFill,
  RiOrderPlayLine,
  RiVoiceprintFill,
} from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import Cookies from "js-cookie";
import { FaDesktop, FaHandPaper, FaHandRock, FaMobile, FaUserCheck } from "react-icons/fa";

export const AdminUrl = "https://admin.nilegmp.com";

export const links = [
  {
    title: "Main",
    links: [
      {
        id: 1,
        name: "Dashboard",
        icon: <AiOutlinePieChart />,
        to: "/Admin",
      },

      {
        id: 3,
        name: "Category",
        icon: <RiFilter2Line />,
        to: "/Admin/ManageCategory",
      },
      {
        id: 14,
        name: "Attributes",
        icon: <RiFlagFill />,
        to: "/Admin/attributes",
      },


      {
        id: 10,
        name: "Roles & Permissons",
        icon: <RiOrderPlayLine />,
        to: "/Admin/ManagePermisson",
      },
    ],
  },
  {
    title: 'Manage',
    links: [
      {
        id: 2,
        name: "Vendors",
        icon: <AiOutlineUserAdd />,
        dropdown: true,
        dropList: [
          { name: "View Vendors", to: "/Admin/Vendors" },
          {
            name: "Approve/Reject Applications",
            to: "/Admin/Vendors/Approval&Reject",
          },
          {
            name: "Enable/Disable Accounts",
            to: "/Admin/Vendors/vendorEnable",
          },
          { name: "", to: "/Admin/Vendors/viewDetails" },
          { name: "Product Approval", to: "/Admin/Products/AcceptReject" },
        ],
      },

      {
        id: 6,
        name: "Orders",
        icon: <RiFileList3Line />,
        dropdown: true,
        dropList: [
          { name: "View Orders", to: "/Admin/Orders/all" },
          // { name: "Track Orders", to: "/Admin/Orders/track" },
        ],
      },
      {
        id: 4,
        name: "Customer",
        icon: <FaUserCheck />,
        dropdown: true,
        dropList: [{ name: "View Customers", to: "/Admin/customers" }, { name: "Customers Address", to: "/Admin/customersAddress" }, { name: "Manage Wallets", to: "/Admin/wallets" }],

      },
    ]
  },
  {
    title: 'Claims',
    links: [
      {
        id: 14,
        name: "Vendors Claims",
        icon: <RiVoiceprintFill />,
        to: "/Admin/VendorClaimsAdimin",
      }
    ]
  },
  {
    title: 'Manage Banner',
    links: [
      {
        id: 11,
        name: "Desktop",
        icon: <FaDesktop />,
        to: "/Admin/HomeBanner",
      },
      {
        id: 13,
        name: "Mobile",
        icon: <FaMobile />,
        to: "/Admin/MobileBanner",
      },
    ]
  },
  {
    title: 'V-C Chats',
    links: [
      {
        id: 15,
        name: "Chats",
        icon: <RiChatSmile2Fill />,
        to: "/Admin/AdminChatwithCustomers",
      },

    ]
  }
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


export const getAllVendorProductvariants = async (vendorId) => {
  try {
    const response = await fetch(`${AdminUrl}/api/getAllVendorAttributes`, {
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
