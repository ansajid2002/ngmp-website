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

const Refunds = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How do I track my refund?",
      content: (
        <>
          <h3>
            You may track your refund progress through any of the following
            ways:
          </h3>
          <h3>
            1. Please go to 'Your orders' in Nile Market Place app or on Nile
            Market Place.com, find the corresponding order and click to view its
            details. Scroll to the refunded item and click 'Details'. You can
            then check your refund status and refund method for each refunded
            item.
          </h3>
          <h3>
            2. Please go to your account in Nile Market Place app or on Nile
            Market Place.com, find the 'Messages' section and click your refund
            message notification to view the details.
          </h3>
          <h3>
            3. If you enabled text or email notifications for your order, you
            can click on the links there to track your refund status as well.
          </h3>
          <h3>
            Once Nile Market Place issues your refund, please allow 5-14
            business days (up to 30 days) for the refund to reflect in your
            original payment method, as processing times vary across financial
            institutions. If you opt for a Nile Market Place credit refund, it
            will be swiftly added to your Nile Market Place Credit Balance
            within 3 minutes.
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "When will I receive my refund? How long does it take?",
      content:
        "For items returned and eligible for a refund, we will promptly initiate the refund process upon receiving the item(s) and conducting a quality inspection. Once Nile Market Place issues your refund, please allow 5-14 business days (up to 30 days) for the refund to reflect in your original payment method, as processing times vary across financial institutions. If you opt for a Nile Market Place credit refund, it will be swiftly added to your Nile Market Place Credit Balance within 3 minutes.",
    },
    {
      id: 3,
      value: "item-3",
      title: "Will you let me know when I get my refund?",
      content:
        "We will notify you when your refund has been successfully processed by Nile Market Place. However, we will not know when the refund reaches your original payment method. Once Nile Market Place issues your refund, please allow 5-14 business days (up to 30 days) for the refund to reflect in your original payment method, as processing times vary across financial institutions. If you opt for a Nile Market Place credit refund that can be used in the future purchase, it will be swiftly added to your Nile Market Place Credit Balance within 3 minutes.",
    },
    {
      id: 4,
      value: "item-4",
      title: "What if my refund amount is incorrect?",
      content:
        "When items are refunded, the amount may not match the item's full price since sales taxes, shipping, used coupons and credit are taken into account. Additionally, if this is not your order's first return, a $7.99 shipping fee will also be deducted from the refund amount.",
    },
    {
      id: 5,
      value: "item-5",
      title: "What is a price adjustment? How to get the price adjustment?",
      content: (
        <>
          <h3>
            Items purchased from Nile Market Place are eligible for our Price
            Adjustment Policy.
          </h3>
          <h3>
            Nile Market Place will provide the price difference if the list
            price of the same item (of the same size, color, etc., from the same
            shop) was reduced within 30 days of purchase in the same country or
            region. Items that are promotional, no longer available, on
            clearance, etc. may not be eligible for our Price Adjustment Policy.
          </h3>
          <h3>
            The shipment of your order will not be affected by applying for a
            price adjustment before you receive your items.
          </h3>
          <h3>
            Fees, including but not limited to shipping fees, will be excluded
            for any price adjustment calculation. Nile Market Place reserves the
            right to the final interpretation of our Price Adjustment Policy,
            the right to modify the terms of this Policy at any time, and the
            right to deny any price adjustment at our sole discretion.
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "How to use an ARN to track your refund?",
      content: (
        <>
          <h3>
            Acquirer Reference Numbers (ARN) are linked to online Visa and
            Mastercard debit and credit card transactions.
          </h3>
          <h3>To find the ARN, you can Follow the steps below:</h3>
          <h3>
            1. Go to the relevant order in 'Your orders' and then click on
            'Refund details'
          </h3>
          <h3>2. Find the ARN in 'Refund amount and method' section.</h3>
          <h3>
            You can provide the ARN to your card issuer to help them trace the
            refund. If you are communicating with them online, you can click the
            'copy' button and paste it into the online chat.
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
export default Refunds;
