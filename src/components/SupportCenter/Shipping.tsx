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

const Shipping = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Does Nile Market Place provide free shipping?",
      content: (
        <>
          <h3>
            Nile Market Place currently provides free standard shipping for most
            orders and free express shipping for orders over US$129. For more
            information about shipping, please visit our{" "}
            <a
              href="/company/shipping-info"
              target="blank"
              className="text-orange-900"
            >
              shipping info
            </a>{" "}
            page.
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Why is my order taking longer to process than normal?",
      content: (
        <>
          <h3>
            Our warehouse normally processes all orders within 1-3 days.
            However, if your order is taking a longer time to process, it could
            be due to particular items in your order which have longer than
            normal processing times.
          </h3>
          <h3>
            You can view the estimated delivery time for each item in your order
            by going to their specific product pages. If you would like to
            receive the other items in your order ASAP, you may cancel the other
            longer-processing item(s) for a refund. Your remaining items can
            then be shipped out immediately.
          </h3>
          <h3>
            We know you're excited to get your order through and so are we! If
            your order arrives late, we will issue a $5 credit (standard
            shipping) or a $13 credit (express shipping) to your account as a
            small sign of appreciation for your patience.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "What is late delivery compensation?",
      content: (
        <>
          <h3>
            If we don't deliver your order on or before Nile Market Place's
            latest estimated delivery date, we will issue you a credit within 48
            hours of that date. The credit will be issued to your Nile Market
            Place credit balance in the currency used for the order and with the
            exchange rate from when your order was placed. You can check the
            compensation amount for late delivery in your order details.
          </h3>
          <h3>
            To learn more about our late delivery compensation policy, please
            visit:{" "}
            <a
              href="/company/late-delivery-compensation"
              target="blank"
              className="text-orange-900"
            >
              Late Delivery Compensation
            </a>
          </h3>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "Why was my order divided into two or more packages?",
      content: (
        <>
          <h3>
            We sometimes do partial shipping to help you receive certain items
            from your order faster. While most items can be processed within 1-3
            days, some items may have longer processing time for various reasons
            including, for example, being in different warehouses.
          </h3>
          <h3>
            Your order may also be divided into two or more packages if the
            total combined weight exceeds the weight limits of couriers.
          </h3>
          <h3>
            If your order is divided into multiple packages, you will be able to
            see the estimated delivery times and individual tracking numbers for
            each package in separate tabs on your order's tracking page. Just go
            to "Your orders" on Nile Market Place.com or your Nile Market Place
            app and click "Track" button next to the order you want to check.
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "How do I update my shipping address?",
      content: (
        <>
          <h3>
            If your order has not yet been packed, you can follow the steps
            below to update your shipping address:
          </h3>
          <h3>
            1. Go to "Your orders" in Nile Market Place.com or your Nile Market
            Place app,
          </h3>
          <h3>2. Click on your order to view your order details,</h3>
          <h3>3. Next to your address, click on "Edit" to change address,</h3>
          <h3>
            4. If the change is successful, you will receive a prompt that says
            "your address has been updated" and the order details will show the
            latest address.
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
export default Shipping;
