import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Delivery = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to track my order?",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "Why is there no tracking update?",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title:
        "What is the delivery time for an item? How long will it take to arrive?",
      content: "Content",
    },
    {
      id: 4,
      value: "item-4",
      title:
        "My tracking info says my package was delivered, but I haven't received it.",
      content: "Content",
    },
    {
      id: 5,
      value: "item-5",
      title: "What should I do if I am missing item(s) from my order?",
      content: "Content",
    },
    {
      id: 6,
      value: "item-6",
      title: "What should I do if I receive an item that I didn't order?",
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
export default Delivery;
