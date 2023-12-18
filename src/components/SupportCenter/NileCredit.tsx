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

const NileCredit = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "What is Nile Token?",
      content:
        "Nile Tokens are shopping credits that can be used to pay for orders on the Temu app or Temu.com.",
    },
    {
      id: 2,
      value: "item-2",
      title: "Where can I see my Nile Token balance?",
      content:
        "You may view your Nile Token balance from your Temu app or Temu.com in your account page under wallet.",
    },
    {
      id: 3,
      value: "item-3",
      title: "How to use Nile Token ?",
      content:
        "Your credits will be automatically applied to eligible orders at checkout. You don't have to do anything! But if you prefer not to use your credit balance for a particular order, you may also change the amount of credit before completing checkout.Your credits will be automatically applied to eligible orders at checkout. You dont have to do anything! But if you prefer not to use your credit balance for a particular order, you may also change the amount of credit before completing checkout.",
    },
    {
      id: 4,
      value: "item-4",
      title: "Does Nile Token expire?",
      content:
        "No, it does not. Nile Token is valid forever and there is no expiration date. ",
    },
    {
      id: 5,
      value: "item-5",
      title: "Can I Withdraw Cash from My Credit Balance?",
      content: (
        <>
          <h3>
            Your credit balance can only be used for purchases on Temu. You will
            not be able to redeem your Nile Tokens for cash. Credits in your
            Temu account will never expire.
          </h3>
          <h3>
            If your order is refunded to credit and you want to change the
            refund method to the original payment method, please do not use the
            credit that has been returned and ask customer service for more
            help.
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "Can I still use Nile Tokens if I already applied a coupon code?",
      content: "Yes! You may use Nile Tokens in conjunction with a coupon.",
    },
    {
      id: 7,
      value: "item-7",
      title: "Can I transfer my Nile Token balance to another Nile account?",
      content: "Yes! you can",
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
export default NileCredit;
