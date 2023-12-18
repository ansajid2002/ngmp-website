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
const Delivery = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to track my order?",
      content: (
        <>
          <h3>
            You can track the latest shipping status of your order on the Nile
            Market Place app or Nile Market Place.com. Simply visit "Your
            orders" and click the "Track" button next to your order to get a
            direct link to your shipping information. You will be able to see
            your shipping carrier, tracking number, estimated delivery time, and
            latest shipping status on the page.
          </h3>
          <h3>
            If a tracking number isn't available yet, then our warehouse may
            still be processing your order. Please allow 1-3 business days for
            warehouse processing. We will notify you when your tracking number
            is ready and your order has been shipped.
          </h3>
          <h3></h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Why is there no tracking update?",
      content: (
        <>
          <h3>
            If you haven't received any tracking updates on your order since it
            shipped, it's most likely because your order was sent from our
            overseas warehouses. Tracking won't update until your package
            arrives in the United States and is picked up by our local shipping
            partner to deliver to your doorstep. The local shipping partner will
            scan your package (only during business days) to update your
            tracking info.
          </h3>
          <h3>
            You can track your order by going to the "Your orders" page of Nile
            Market Place.com or the Nile Market Place app. From there you will
            be able to find your order and click "Track" to view the latest
            tracking info.
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
      title:
        "What is the delivery time for an item? How long will it take to arrive?",
      content: (
        <>
          <h3>
            We always strive to ship out all orders as soon as possible. On the
            item page, you can find the estimated delivery date, along with
            information about the percentage of orders delivered within that
            time frame, so you can plan accordingly.
          </h3>
          <h3>
            Once you place your order, you will be able to see the estimated
            delivery time in "Your orders" of the Nile Market Place app or Nile
            Market Place.com.{" "}
          </h3>
          <h3>
            The estimated delivery time refers to the expected arrival of your
            order, taking into account the time needed for both processing and
            transit.{" "}
          </h3>
          <h3>
            You can check the estimated shipping time for your country at our{" "}
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
      id: 4,
      value: "item-4",
      title: "What should I do if I am missing item(s) from my order?",
      content: (
        <>
          <h3>
            There are two reasons why you may be missing items from your order.
          </h3>
          <h3>1. Your order is overweight due to excess items.</h3>
          <h3>
            For overweight orders, we may split the order and ship it out in
            multiple packages so that you get the other items in your order as
            quickly as possible. We will then ship out the remaining products as
            soon as they are processed. You can view details about your order in
            the 'Your orders' page of your Nile Market Place account. Click
            'track' next to your order so that you can see if your items were
            split into multiple packages.
          </h3>
          <h3>2. Items went missing during packing or transportation.</h3>
          <h3>
            If you are missing an item from your order and it is not scheduled
            to be sent in another package, you may request a refund by the
            following steps:
          </h3>
          <li>
            Click 'You' from the Nile Market Place app {">"} 'Customer support'{" "}
            {">"} 'Contact us', or click 'Support' on the top of Nile Market
            Place.com, then click 'Chat with Nile Market Place'
          </li>
          <li>Send 'missing item' and select the order you need help with</li>
          <li>Click 'Select missing item(s)'</li>
          <li>Select the item(s) and the quantity that is missing</li>
          <li>Upload the details of the missing item(s) and click 'Next'</li>
          <li>Select your refund method</li>
          <li>Click submit to request a refund for your missing item(s)</li>
          <h3>
            Once Nile Market Place issues your refund, please allow 5-14
            business days (up to 30 days) for the refund to reflect in your
            original payment method, as processing times vary across financial
            institutions. If you opt for a Nile Market Place credit refund that
            can be used in the future purchase, it will be swiftly added to your
            Nile Market Place Credit Balance within 3 minutes.
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "What should I do if I receive an item that I didn't order?",
      content: (
        <>
          <h3>
            If you have received a wrong item in your order and there's another
            one missing, please request a refund through your Nile Market Place
            account on Nile Market Place.com or the Nile Market Place app.
          </h3>
          <h3>1. Navigate to "Your Orders"</h3>
          <h3>2. For the problematic order, click "Return/Refund"</h3>
          <h3>
            3. Confirm that you received the package, then denote any missing or
            incorrect items and your reason for returning them.
          </h3>
          <h3>
            4. Review the return information, then proceed by clicking "Next
            Step"
          </h3>
          <h3>5. Choose your preferred return and refund methods.</h3>
          <h3>6. Click "Submit" to request a refund for your missing item.</h3>
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
export default Delivery;
