import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Shipping = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Does Temu provide free shipping?",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "Why is my order taking longer to process than normal?",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "What is late delivery compensation?",
      content: "Content",
    },
    {
      id: 4,
      value: "item-4",
      title: "Why was my order divided into two or more packages?",
      content: "Content",
    },
    {
      id: 5,
      value: "item-5",
      title: "How do I update my shipping address?",
      content: "Content",
    },
    {
      id: 6,
      value: "item-6",
      title: "Why does USPS say that they haven't received my package yet?",
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
export default Shipping;
