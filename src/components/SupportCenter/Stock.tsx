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

const Stock = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How do I know if an item is in stock?",
      content: (
        <>
          <h3>
            You may see if an item is in stock by going to the product details
            page. From there, you can see which sizes/colors are available and,
            if inventory is running low, you may also see an alert that tells
            you exactly how many items are left.
          </h3>
          <h3>
            For any specific questions about an item or its availability, please
            feel free to contact us.
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How can I be notified of out-of-stock items?",
      content:
        "You can subscribe to an item to be notified when it is back in stock from the Nile Market Place mobile app. From your app, just go to the item's product details page. Select the out-of-stock size, if applicable, and click the Notify me button in the bottom right corner. If your item comes back in stock within 30 days, you will receive a notification.",
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
          <AccordionBody>
            <div className="space-y-4 p-2">{item.content}</div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};
export default Stock;
