import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { HomeUrl } from "@/app/layout";
import {
  Archive,
  CircleDollarSign,
  CreditCard,
  FileStack,
  FileText,
  GanttChartSquare,
  ShieldCheck,
  Truck,
} from "lucide-react";
import BuyingOnNile from "./BuyingOnNile";
import Checkout from "./Checkout";
import FindMyOrder from "./FindMyOrder";
import OrderChanges from "./OrderChanges";
import Reviews from "./Reviews";
import Shipping from "./Shipping";
import Delivery from "./Delivery";
import Returns from "./Returns";
import Refunds from "./Refunds";
import Stock from "./Stock";
import SizeAndFit from "./SizeAndFit";
import AccountPreferences from "./AccountPreferences";
import SigningIn from "./SigningIn";
import Payments from "./Payments";
import NileCredit from "./NileCredit";
import Promos from "./Promos";
import Policies from "./Policies";
import SecurityAndPrivacy from "./SecurityAndPrivacy";
import FeedbacksAndCollabInquiries from "./FeedbacksAndCollabInquiries";
import Link from "next/link";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const NewAccordionTab = () => {
  const [query, setQuery] = useState<any | null>();
  const [activeItem, setActiveItem] = useState<string | null>("");

  const params = useSearchParams();

  const search = params.get("query");
  useEffect(() => {
    setQuery(search);
    setActiveItem(search);
  }, []);

  const SetRightComp = (data) => {
    setQuery(data);
  };

  console.log(query);

  const AccordionData = [
    {
      id: 1,
      value: "item-1",
      icon: <FileText />,
      title: "Order issues",
      content: [
        {
          list: "Buying on Nile",
          link: `${HomeUrl}/SupportCenter?query=BuyingOnNile`,
          slug: "BuyingOnNile",
          components: <BuyingOnNile />,
        },
        {
          list: "Checkout",
          link: `${HomeUrl}/SupportCenter?query=Checkout`,
          slug: "Checkout",
          components: <Checkout />,
        },
        {
          list: "Find My Order",
          link: `${HomeUrl}/SupportCenter?query=FindMyOrder`,
          slug: "FindMyOrder",
          components: <FindMyOrder />,
        },
        {
          list: "Order Changes",
          link: `${HomeUrl}/SupportCenter?query=OrderChanges`,
          slug: "OrderChanges",
          components: <OrderChanges />,
        },
        {
          list: "Reviews",
          link: `${HomeUrl}/SupportCenter?query=Reviews`,
          slug: "Reviews",
          components: <Reviews />,
        },
      ],
    },
    {
      id: 2,
      value: "item-2",
      icon: <Truck />,
      title: "Shipping & delivery",
      content: [
        {
          list: "Shipping",
          link: `${HomeUrl}/SupportCenter?query=Shipping`,
          slug: "Shipping",
          components: <Shipping />,
        },
        {
          list: "Delivery",
          link: `${HomeUrl}/SupportCenter?query=Delivery`,
          slug: "Delivery",
          components: <Delivery />,
        },
      ],
    },
    {
      id: 3,
      value: "item-3",
      icon: <CircleDollarSign />,
      title: "Return & refund",
      content: [
        {
          list: "Returns",
          link: `${HomeUrl}/SupportCenter?query=Returns`,
          slug: "Returns",
          components: <Returns />,
        },
        {
          list: "Refunds",
          link: `${HomeUrl}/SupportCenter?query=Refunds`,
          slug: "Refunds",
          components: <Refunds />,
        },
      ],
    },
    {
      id: 4,
      value: "item-4",
      icon: <Archive />,
      title: "Product & stock",
      content: [
        {
          list: "Stock",
          link: `${HomeUrl}/SupportCenter?query=Stock`,
          slug: "Stock",
          components: <Stock />,
        },
        {
          list: "Size & fit",
          link: `${HomeUrl}/SupportCenter?query=SizeAndFit`,
          slug: "SizeAndFit",
          components: <SizeAndFit />,
        },
      ],
    },
    {
      id: 5,
      value: "item-5",
      icon: <GanttChartSquare />,
      title: "Managing my account",
      content: [
        {
          list: "Account preferences",
          link: `${HomeUrl}/SupportCenter?query=AccountPreferences`,
          slug: "AccountPreferences",
          components: <AccountPreferences />,
        },
        {
          list: "Signing in",
          link: `${HomeUrl}/SupportCenter?query=SigningIn`,
          slug: "SigningIn",
          components: <SigningIn />,
        },
      ],
    },
    {
      id: 6,
      value: "item-6",
      icon: <CreditCard />,
      title: "Payment & promos",
      content: [
        {
          list: "Payments",
          link: `${HomeUrl}/SupportCenter?query=Payments`,
          slug: "Payments",
          components: <Payments />,
        },
        {
          list: "Nile credit",
          link: `${HomeUrl}/SupportCenter?query=NileCredits`,
          slug: "NileCredits",
          components: <NileCredit />,
        },
        {
          list: "Promos",
          link: `${HomeUrl}/SupportCenter?query=Promos`,
          slug: "Promos",
          components: <Promos />,
        },
      ],
    },
    {
      id: 7,
      value: "item-7",
      icon: <ShieldCheck />,
      title: "Your security",
      content: [
        {
          list: "Security and Privacy",
          link: `${HomeUrl}/SupportCenter?query=SecurityAndPrivacy`,
          slug: "SecurityAndPrivacy",
          components: <SecurityAndPrivacy />,
        },
      ],
    },
    {
      id: 8,
      value: "item-8",
      icon: <FileStack />,
      title: "Policies & others",
      content: [
        {
          list: "Policies",
          link: `${HomeUrl}/SupportCenter?query=Policies`,
          slug: "Policies",
          components: <Policies />,
        },
        {
          list: "Feedbacks & collab inquiries",
          link: `${HomeUrl}/SupportCenter?query=FeedbacksAndCollabInquiries`,
          slug: "FeedbacksAndCollabInquiries",
          components: <FeedbacksAndCollabInquiries />,
        },
      ],
    },
  ];
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const findComponentByQueryAndSlug = (slug: any) => {
    const item = AccordionData.find((accordionItem) =>
      accordionItem.content.some((contentItem) => contentItem.slug === slug)
    );

    if (item) {
      const component = item.content.find(
        (contentItem) => contentItem.slug === slug
      )?.components;

      if (component) {
        // Assuming your components are React components, you can render them like this
        return <div>{component}</div>;
      }
    }

    // Return a default component or handle the case when no match is found
    return <div>No matching component found</div>;
  };

  const component = findComponentByQueryAndSlug(query);

  const handleClick = (citem) => {
    SetRightComp(citem.slug); // Assuming SetRightComp is a function to set some state

    // Set the active item
    setActiveItem(citem.slug);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-5">All help topics</h2>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full lg:w-[25%] lg:pr-10">
          {AccordionData?.map((item, index) => (
            <Accordion
              key={index}
              open={open === item.id}
              icon={<Icon id={item.id} open={open} />}
            >
              <AccordionHeader
                className="hover:bg-gray-100 rounded-xl px-2"
                onClick={() => handleOpen(item.id)}
              >
                <span className="flex gap-2 items-center">
                  {item.icon}
                  <h3 className="text-[0.9rem] mt-1">{item.title}</h3>
                </span>
              </AccordionHeader>
              <AccordionBody>
                <ul className="">
                  {item.content.map((citem, cindex) => (
                    <Link href={citem.link}>
                      <li
                        className={`font-medium text-[0.8rem] px-8 py-1  hover:border-l-2 border-orange-900  hover:bg-gradient-to-r from-orange-100  text-gray-500 hover:text-black ${activeItem === citem.slug
                            ? "bg-gradient-to-r from-orange-100 border-l-2 border-orange-900"
                            : ""
                          }`}
                        onClick={() => handleClick(citem)}
                        key={cindex}
                      >
                        {citem.list}
                      </li>
                    </Link>
                  ))}
                </ul>
              </AccordionBody>
            </Accordion>
          ))}
        </div>

        <div className="w-full lg:w-[70%] px-2">{component}</div>
      </div>
    </div>
  );
};

export default NewAccordionTab;
