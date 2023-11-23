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

const Promos = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

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
      title: "How to search for items on Nile Market-place",
      content: "Content",
    },
    {
      id: 3,
      value: "item-3",
      title: "How to purchase an item on Nile Market-place?",
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
      title: "Tips for buying safely on Nile Market-place",
      content: "Content",
    },
    {
      id: 7,
      value: "item-7",
      title: "Does Nile Market-place support drop shipping?",
      content: "Content",
    },
    {
      id: 8,
      value: "item-8",
      title: "Does Nile Market-place accept tax exemption certificates?",
      content: "Content",
    },
    {
      id: 9,
      value: "item-9",
      title: "How is Nile Market-place able to offer lower prices than others?",
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
export default Promos;
