import {
  AiOutlinePieChart,
  AiOutlineUnorderedList,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineLineChart,
  AiOutlineTag,
} from "react-icons/ai";
import { FaCheck, FaHackerNews, FaRegFilePowerpoint } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { RiMessage2Line, RiTruckLine } from "react-icons/ri";
import { SiAcclaim } from "react-icons/si";


export const vendorLinks = [
  {
    title: "Main",
    links: [
      {
        id: 1,
        name: "Dashboard",
        icon: <AiOutlinePieChart />,
        to: "/",
      },
      {
        id: 345,
        name: "Manage Policy",
        icon: <FiBook />,
        to: "/Vendors/products/managepolicy",
      },
      {
        id: 2,
        name: "Products",
        icon: <AiOutlineUnorderedList />,
        dropdown: true,
        dropList: [
          {
            id: 31,
            name: "All Products",
            to: "/Vendors/products/all",
          },

          // {
          //   id: 345,
          //   name: "Manage Policy",
          //   to: "/Vendors/products/managepolicy",
          // },
          {
            id: 32,
            name: "Bulk Upload",
            to: "/Vendors/products/bulkUpload",
          },
          {
            id: 41,
            name: "Media Library",
            to: "/Vendors/products/MediaLibrary",
          },
          {
            id: 322,
            name: "Rejected Products",
            to: "/Vendors/products/Rejected",
          },
        ],
      },
      {
        id: 3,
        name: "Orders",
        icon: <AiOutlineShoppingCart />,
        to: "/Vendors/Orders",
      },

      {
        id: 13,
        name: "Ship Order",
        icon: <FaCheck />,
        to: "/Vendors/verifyReceiver",
      },


      // {
      //   id: 7,
      //   name: "Commission Invoices",
      //   icon: <FaFileInvoice />,
      //   to: "/Vendors/commission-invoices",
      // },

      {
        id: 11,
        name: "Coupons",
        icon: <AiOutlineTag />,
        dropdown: true,
        dropList: [
          {
            id: 41,
            name: "All Coupons",
            to: "/Vendors/coupons/all",
          },

        ],
      }
    ],
  },
  {
    title: 'Manage Customer',
    links: [
      {
        id: 15,
        name: "Chat",
        icon: <RiMessage2Line />,
        to: "/Vendors/ChatwithCustomers",
      }
    ]
  },

  {
    title: 'Support',
    links: [
      {
        id: 37,
        name: "Not Received",
        icon: <RiTruckLine />,
        to: "/Vendors/Orders/NotReceived",
      },
      {
        id: 12,
        name: "Raise Claim",
        icon: <SiAcclaim />,
        to: "/Vendors/ClaimForm",
      },
    ]
  },
  {
    title: 'Custom Reports',
    links: [
      {
        id: 4,
        name: "Sales",
        icon: <FaRegFilePowerpoint />,
        to: "/Vendors/reports",
      },

      {
        id: 6,
        name: "Return",
        icon: <AiOutlineLineChart />,
        to: "/Vendors/SalesReturns",
      },
      {
        id: 5,
        name: "Payments",
        icon: <AiOutlineDollar />,
        to: "/Vendors/Payments",
      },
    ]
  },
];
