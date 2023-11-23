"use client";

import AccordionTab from "@/components/SupportCenter/AccordionTab";
import { ChevronRightIcon } from "lucide-react";

const Page = () => {
  const styling = {
    backgroundImage:
      'url("https://aimg.kwcdn.com/upload_aimg/transaction/f287fda3-2741-4349-9aa5-46a22b82a79a.png.slim.png")',
    height: "100%",
    width: "100%",
    padding: "50px",
    color: "white",
  };

  return (
    <div className="">
      <div style={styling}>
        <ul className="flex items-center gap-1 font-medium mb-5">
          <li>Home</li>
          <ChevronRightIcon className="h-4 " />
          <li>Support Center</li>
        </ul>
        <div className="space-y-2">
          <h1 className="text-5xl font-medium">Hi, how can we help you?</h1>
          <p className="text-xl">
            Select an order to get help with items, shipping, return or refund
            problems, etc.
          </p>
        </div>
      </div>

      <div className="p-14 w-full">
        <AccordionTab />
      </div>
    </div>
  );
};

export default Page;
