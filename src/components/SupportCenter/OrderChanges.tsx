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

const OrderChanges = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How can I make a change or modify items in my order?",
      content: (
        <>
          <h3>
            If your order has already been packed, you will not be able to make
            any changes or modifications to your order. Please wait for your
            items to arrive and then submit a return and refund request for the
            items you don't wish to keep.
          </h3>
          <h3>
            If your order has not been packed yet, you can still add or cancel
            items in your order, but you are not able to edit existing items.
          </h3>
          <h3>
            Please follow the steps below to cancel or add items from the Nile
            Market Place app or Nile Market Place.com.
          </h3>
          <div>
            <h3>Nile Market Place App</h3>
            <li>Sign into your account</li>
            <li>
              Select the user avatar at the bottom of the screen and click 'Your
              orders' from the main menu
            </li>
            <li>
              Find the relevant order under 'All Orders' and click "Cancel/Other
              help" or "Add more items to order"
            </li>
            <li>
              Follow the instructions on the screen to cancel or add more items.
            </li>
          </div>
          <div>
            <h3>Nilegmp.com</h3>
            <li>Sign into your account</li>
            <li>
              Click the user avatar in the top right corner of the screen and
              click 'Your orders' from the lefthand menu
            </li>
            <li>
              Find the relevant order under 'All Orders' and click "Cancel/Other
              help" or "Add more items to order"
            </li>
            <li>
              Follow the instructions on the screen to cancel or add more items.
            </li>
          </div>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How to cancel my order?",
      content: (
        <>
          <h3>
            If your order has not been packed yet, you can still cancel directly
            from Nile Market Place.com or your Nile Market Place app.
          </h3>
          <div>
            <h3>Nile Market Place App</h3>
            <li>Sign into your account</li>
            <li>
              Select the user avatar at the bottom of the screen and click 'Your
              orders' from the main menu
            </li>
            <li>
              Find the relevant order under 'All Orders' and click "Cancel/Other
              help"
            </li>
            <li>
              Follow the instructions on the screen and select 'I want to cancel
              item(s)'
            </li>
            <li>
              Click "All" at the bottom of the screen to select all items for
              cancellation and "Submit". You will get a refund confirmation in
              your message inbox.
            </li>
          </div>
          <div>
            <h3>Nilegmp.com</h3>
            <li>Sign into your account</li>
            <li>
              Click the user avatar in the top right corner of the screen and
              click 'Your orders' from the lefthand menu
            </li>
            <li>
              Find the relevant order under 'All Orders' and click "Cancel/Other
              help"
            </li>
            <li>
              Follow the instructions on the screen and select 'I want to cancel
              item(s)'
            </li>
            <li>Click "All" at the top of the list</li>
            <li>
              Scroll to the bottom of the page to click "Cancel checked items"
            </li>
            <li>You will get a refund confirmation in your message inbox.</li>
          </div>
          <h3>
            If your order has already been packed, unfortunately we are not able
            to cancel your order. However, almost all items are returnable
            within 90 days of purchase. Please wait for your order to arrive and
            then request a refund.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "How to get help with an order",
      content: (
        <>
         <h3>
  {t('If you have already placed an order, the best way for you to get help is through the Nile Market Place app or Nile Market Place.com. From your accounts page, you will be able to do things like:')}
</h3>
<div>
  <li>{t('View your orders')}</li>
  <li>{t('Confirm your shipping address')}</li>
  <li>{t('Track your latest order status')}</li>
  <li>{t('Add/cancel items in your order')}</li>
  <li>{t('Report wrong/missing/damaged items')}</li>
  <li>{t('Request a return, refund, or exchange')}</li>
  <li>{t('Review your items')}</li>
  <li>{t('And a lot more!')}</li>
</div>
          <h3>
            {t(`If you need help with a specific request, we recommend that you
            explore our Support Center, which has the answers to our customers'
            most common questions. We try to keep this as updated as possible so
            you'll always have the answers you need available at your
            fingertips.`)}
          </h3>
          <h3>
            {t(`If you need some extra support, our Customer Service team is always
            happy to help. Please make sure that you have your order number,
            starting with 'PO,' ready so that they can best assist you.`)}
          </h3>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "How to get help with a purchased item",
      content: (
        <>
          <h3>
            If you need help with an item you purchased, please contact us
            anytime:
          </h3>
          <h3>
            1. Sign in to your Nile Market Place app or Nile Market Place.com
            and go to your account page. On the Nile Market Place app, click the
            user avatar at the bottom of your screen. On Nile Market Place.com,
            click your username in the top right corner.
          </h3>
          <h3>2. Go to 'Your orders.'</h3>
          <h3>
            3. Go to the specific order to open the order details, and click the
            specific item you need help with.
          </h3>
          <h3>
            4. You can click 'Live Chat' and type into the chat box directly.
            Our customer service team will be with you shortly.
          </h3>
          <h3>
            From here, you can also click on the item in the chat to request a
            return, repurchase the same item, or get other help from Nile Market
            Place.
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

export default OrderChanges;
