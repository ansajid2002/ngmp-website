import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Refunds = () => {
  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How do I track my refund?",
      content: "Content",
    },
    {
      id: 2,
      value: "item-2",
      title: "When will I receive my refund? How long does it take?",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "Will you let me know when I get my refund?",
      content: "Content",
    },
    {
      id: 4,
      value: "item-4",
      title: "What if my refund amount is incorrect?",
      content: "Content",
    },
    {
      id: 5,
      value: "item-5",
      title: "What is a price adjustment? How to get the price adjustment?",
      content: "Content",
    },
    {
      id: 6,
      value: "item-6",
      title: "How to use an ARN to track your refund?",
      content: "Content",
    },
    {
      id: 7,
      value: "item-7",
      title:
        "Why does it look like I am being charged again after requesting a refund?",
      content: "Content",
    },
    {
      id: 8,
      value: "item-8",
      title:
        "Why is the amount refunded to Klarna different from what I was expecting?",
      content: "Content",
    },
    {
      id: 9,
      value: "item-9",
      title:
        "Why is the amount refunded to Afterpay different from what I was expecting?",
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
export default Refunds;
