import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BuyingOnNile = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to get help before I buy",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "How to search for items on Temu",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "How to purchase an item on Temu?",
      content: "Content",
    },
    {
      id: 4,
      value: "item-4",
      title: "I received an email about an order I did not place",
      content: "Content",
    },
    {
      id: 5,
      value: "item-5",
      title: "How to follow shops/sellers",
      content: "Content",
    },
    {
      id: 6,
      value: "item-6",
      title: "Tips for buying safely on Temu",
      content: "Content",
    },
    {
      id: 7,
      value: "item-7",
      title: "Does Temu support drop shipping?",
      content: "Content",
    },
    {
      id: 8,
      value: "item-8",
      title: "Does Temu accept tax exemption certificates?",
      content: "Content",
    },
    {
      id: 9,
      value: "item-9",
      title: "How is Temu able to offer lower prices than others?",
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

export default BuyingOnNile;
