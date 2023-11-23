import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Returns = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to return or exchange an item on Nile",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "What is the status of my return or exchange?",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "Can I exchange the size/color of items?",
      content: "Content",
    },
    {
      id: 4,
      value: "item-4",
      title: "What if I received an item damaged or not as described?",
      content: "Content",
    },
    {
      id: 5,
      value: "item-5",
      title: "What if I received the wrong item?",
      content: "Content",
    },
    {
      id: 6,
      value: "item-6",
      title: "Can I change return options?",
      content: "Content",
    },
    {
      id: 7,
      value: "item-7",
      title: "How long do I have to return something?",
      content: "Content",
    },
    {
      id: 8,
      value: "item-8",
      title: "Do you have free returns?",
      content: "Content",
    },
    {
      id: 9,
      value: "item-9",
      title: "How do I ship my items back?",
      content: "Content",
    },
    {
      id: 10,
      value: "item-10",
      title: "Where is my return label?",
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
export default Returns;
