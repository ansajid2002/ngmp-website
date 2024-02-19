import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { t } from "i18next";

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

const FindMyOrder = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Why can't i find my order in my account?",
      content: (
        <>
          <h3>
            We're sorry to know that you can't find your order. You can choose
            the following ways to find your orders.
          </h3>
          <h3>1. Provide Order ID to find order</h3>
          <h3>2. Provide phone number to find order</h3>
          <h3>3. Provide email address to find order</h3>
          <h3>4. Provide payment information to find order</h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Where is my order iD?",
      content: (
        <>
          <h3>
            Your order number always starts with 'PO.' You may find your order
            ID number in one of the following ways:
          </h3>
          <li>
            Reference your email confirmation to find your order ID in the email
            subject line.
          </li>
          <li>
            If you enabled text message tracking for your order, you can
            reference your past texts to see your order ID listed at the
            beginning of each message.
          </li>
          <li>
            From Nile Market Place.com, sign into your account. Click into your
            user avatar in the top righthand corner. From the lefthand menu,
            under 'Your orders,' click into 'All orders.' Your order ID can be
            found directly under each order entry.
          </li>
          <li>
            From the Nile Market Place mobile app, sign into your account. Click
            into your user avatar at the bottom of your screen. Select 'Your
            orders' from the menu and click the specific order you are having
            trouble with. Your order ID is shown at the top of the order details
            page.
          </li>
        </>
      ),
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
            <span className="text-[1rem] font-medium">{t(`${item.title}`)}</span>
          </AccordionHeader>
          <AccordionBody>
            <div className="space-y-4 p-2">{item.content}</div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default FindMyOrder;
