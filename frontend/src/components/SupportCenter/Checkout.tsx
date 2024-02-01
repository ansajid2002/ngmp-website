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

const Checkout = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to remove an item from my cart",
      content: (
        <>
          <h3>To remove an item from your shopping cart:</h3>
          <h3>
            1) Click the shopping cart icon from your Nile Market Place app or
            Nile Market Place.com
          </h3>
          <h3>
            2) Go to the item that you want to remove and click the trash bin
            icon to completely remove the item or the '-' button to edit the
            quantity. On the mobile app, you can also swipe left and click
            'Remove' to remove the item completely.{" "}
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Why was my credit card declined during checkout?",
      content: (
        <>
          <h3>
            Your credit card may be declined due to one of the following
            reasons:
          </h3>
          <li>
            Your card info might be incorrect. Please confirm your card number,
            expiration date, billing address, and security code to ensure that
            the transaction can be processed.
          </li>
          <li>
            Card issuer bank declined your payment. Please call your bank for
            additional assistance.
          </li>
          <h3>
            If your financial details are confirmed and you think your card may
            be declined due to technical error, please try to checkout on
            another browser or try another payment method to complete your
            order. We accept most major credit cards (Visa, MasterCard, American
            Express, Discover), Paypal, Apple Pay, Google Pay, Cash App Pay and
            buy now, pay later services, including Klarna, Afterpay and Affirm.
            For full payment details, please check our website https://Nile
            Market Place.com.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "How to check out as a guest on Nile Market-place",
      content: (
        <>
          <h3>
            Found the perfect items on Nile Market Place, but not ready to
            commit to creating an account? Here's how you can check out as a
            guest:
          </h3>
          <li>
            After adding items to your cart, click the cart icon from Nile
            Market Place.com to checkout.
          </li>
          <li>Proceed to checkout and select 'Continue as a guest.'</li>
          <li>
            Follow the onscreen instructions to fill out your payment and
            shipping details as usual to complete your order. You'll receive an
            email confirmation once your order has been successfully placed.{" "}
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

export default Checkout;
