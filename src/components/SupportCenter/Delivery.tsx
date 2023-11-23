import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
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
const Delivery = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
      {data?.map((item, index) => (
        <Accordion
          key={index}
          open={open === item.id}
          icon={<Icon id={item.id} open={open} />}
        >
          <AccordionHeader onClick={() => handleOpen(item.id)}>
            <span className="text-[1rem] font-medium">{item.title}</span>
          </AccordionHeader>
          <AccordionBody>{item.content}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};
export default Delivery;
