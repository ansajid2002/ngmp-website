import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Checkout = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to remove an item from my cart",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "Why was my credit card declined during checkout?",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "How to check out as a guest on Temu",
      content: "Content",
    },
  ];

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {data?.map((item, inidex) => (
          <AccordionItem value={item.value}>
            <AccordionTrigger className="text-[1rem] font-medium hover:bg-slate-100 px-3 rounded-xl">
              <span>{item.title}</span>
            </AccordionTrigger>
            <AccordionContent className="text-[0.9rem] text-slate-700 p-3">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Checkout;
