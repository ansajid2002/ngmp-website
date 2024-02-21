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

const Promos = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to redeem a coupon code",
      content: (
        <>
          <h3>
            When you place an order, our system will automatically apply the
            optimal coupon that helps you maximize your savings. Only one coupon
            can be applied per order.
          </h3>
          <h3>
            Please ensure that your unused coupons are in your account for use
            by going to your Nile Market place account page from the Nile Market
            place app or Nile Market place.com. Select "Coupon codes" from the
            menu to view your unused, used, and expired coupons.
          </h3>
          <h3>
            If you have a new coupon code that you would like to add to your
            account, enter it into the entry field on the "Unused" tab and click
            "Apply."
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Where can I get the discount?",
      content:
        "We have many themed activities, promos, and sales that can be automatically applied at checkout to help you maximize your savings. Please stay tuned.",
    },
    {
      id: 3,
      value: "item-3",
      title: "Why isn't my coupon code working?",
      content: (
        <>
          <div>
            <h3>
              There are a few reasons why your coupon code may not be working:
            </h3>
            <h3>1. The code inputted may not be accurate.</h3>
            <h3>2. The code may have already expired.</h3>
            <h3>3. The minimum order requirements have not been met.</h3>
            <h3>
              4. Another promo code is already in use which helps you better
              maximize your savings.
            </h3>
          </div>
          <h3>
            For more details about your coupons, you can go to your Nile Market
            place account page from the Nile Market place app or Nile Market
            place.com. Select "Coupon codes" from the menu to view your unused,
            used, and expired coupons.
          </h3>
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
export default Promos;
