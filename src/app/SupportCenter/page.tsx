"use client";

import BreadCrumb from "@/components/BreadCrumb";
import AccordionTab from "@/components/SupportCenter/AccordionTab";
import NewAccordionTab from "@/components/SupportCenter/NewAccordionTab";
import { ChevronRightIcon } from "lucide-react";

const Page = () => {
  const styling = {
    backgroundImage:
      'url("https://aimg.kwcdn.com/upload_aimg/transaction/f287fda3-2741-4349-9aa5-46a22b82a79a.png.slim.png")',
    height: "100%",
    width: "100%",
    // padding: "50px",
    color: "white",
  };

  return (
    <div className="">
      <BreadCrumb label1={"Home"} label2={"Support Center"} />
      <div style={styling} className="px-5 py-10 md:p-16">
        <div className="space-y-2">
          <h1 className="text-[2.8rem] leading-none md:text-5xl font-medium">
            Hi, how can we help you?
          </h1>
          <p className="text-[1rem] leading-tight md:leading-normal md:text-xl">
            Select an order to get help with items, shipping, return or refund
            problems, etc.
          </p>
        </div>
      </div>

      <div className="p-5 lg:p-14 w-full">
        {/* <AccordionTab /> */}
        <NewAccordionTab />
      </div>
    </div>
  );
};

export default Page;
