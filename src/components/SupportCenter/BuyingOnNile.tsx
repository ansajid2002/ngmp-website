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

const BuyingOnNile = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Hi, how can we help you?",
      content: (
        <>
          <h3  className="text-base">Nile Global Marketplace (NGMP) is a digital platform where vendors can register, upload their products, and sell them to potential buyers.</h3>

        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How can I become a vendor on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            To become a vendor on NGMP, simply visit our website or download our app, then follow the easy registration process for vendors. Once registered, you can start uploading your products and selling them on our platform.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "What kind of products can I sell on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            NGMP accepts a wide variety of products across different categories, including but not limited to electronics, fashion, home goods, beauty products, and more. However, we do have guidelines in place regarding prohibited items, such as illegal goods, counterfeit items, and restricted substances.
          </h3>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "How do I upload products on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            Uploading products on NGMP is straightforward. After registering as a vendor and logging into your account, you can navigate to the product upload section and follow the prompts to add images, descriptions, pricing, and other relevant details for each product.
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "How does the selling process work on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            Once your products are uploaded on NGMP, they become visible to potential buyers browsing the platform. Interested buyers can view your products, make inquiries via our chat feature, and proceed with purchasing. You will be notified of any orders placed, and you can then fulfill the orders accordingly.
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "How does payment processing work on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            NGMP facilitates secure payment processing through various methods, including credit/debit cards, digital wallets, and other online payment gateways. When a buyer makes a purchase, the payment is processed securely through our platform, and you, as the vendor, can access your earnings through your NGMP account.
          </h3>
        </>
      ),
    },
    {
      id: 7,
      value: "item-7",
      title: "Is there a fee for selling on Nile Global Marketplace?",
      content: (
        <>
          <h3  className="text-base">
            NGMP may charge a nominal fee or commission for each successful sale made through the platform. Additionally, there may be other optional services or features available for a fee to enhance your selling experience on NGMP.
          </h3>

        </>
      ),
    },
    {
      id: 8,
      value: "item-8",
      title: "What measures does Nile Global Marketplace take to ensure a safe and secure selling environment?",
      content: (
        <>
          <h3  className="text-base">
            NGMP prioritizes the safety and security of both vendors and buyers on our platform. We employ various security measures, including robust data encryption, secure payment processing, identity verification for vendors, and moderation of listings to prevent the sale of prohibited or fraudulent items.
          </h3>
        </>
      ),
    },
    {
      id: 9,
      value: "item-9",
      title: "How can I contact Nile Global Marketplace for further assistance or inquiries?",
      content: (
        <>
          <h3 className="text-base">
            If you have any questions, concerns, or need assistance with using NGMP, you can reach out to our customer support team via email, phone, or through the in-app messaging feature. We are here to assist you and ensure your experience on Nile Global Marketplace is smooth and satisfactory.
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
          <AccordionHeader
            className="hover:bg-gray-100 px-2 rounded-lg"
            onClick={() => handleOpen(item.id)}
          >
            <span className="text-[1rem] text-black font-medium">
              {t(`${item.title}`)}
            </span>
          </AccordionHeader>
          <AccordionBody>
            <div className="space-y-4 p-2">{item.content}</div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default BuyingOnNile;
