import {
  AiOutlinePieChart,
  AiOutlineUnorderedList,
  AiOutlineShoppingCart,
  AiOutlineDollar,
  AiOutlineLineChart,
  AiOutlineBell,
  AiOutlineTag,
} from "react-icons/ai";
import { FaFileInvoice, FaHackerNews, FaHandRock, FaListOl } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { IoIosStats, IoIosDocument, IoIosChatbubbles } from "react-icons/io";

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
        icon: <FaHackerNews />,
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
        name: "Verify Receiver",
        icon: <FcApproval />,
        to: "/Vendors/verifyReceiver",
      },

      {
        id: 4,
        name: "Reports",
        icon: <IoIosDocument />,
        to: "/Vendors/reports",
      },
      {
        id: 5,
        name: "Payments",
        icon: <AiOutlineDollar />,
        to: "/Vendors/Payments",
      },
      {
        id: 6,
        name: "Sales & Return Report",
        icon: <AiOutlineLineChart />,
        to: "/Vendors/SalesReturns",
      },
      // {
      //   id: 7,
      //   name: "Commission Invoices",
      //   icon: <FaFileInvoice />,
      //   to: "/Vendors/commission-invoices",
      // },
      {
        id: 9,
        name: "Notifications",
        icon: <AiOutlineBell />,
        to: "/Vendors/Notifications",
      },
      {
        id: 12,
        name: "Raise Claim",
        icon: <FaHandRock />,
        to: "/Vendors/ClaimForm",
      },
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
        icon: <IoIosChatbubbles />,
        to: "/Vendors/ChatwithCustomers",
      }
    ]
  }
];
