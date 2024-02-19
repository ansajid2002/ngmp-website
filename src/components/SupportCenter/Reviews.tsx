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

const Reviews = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to leave a review?",
      content: (
        <>
          <div>
            <h3>To leave a review:</h3>
            <h3>
              1. Sign in to the Nile Market Place app or Nile Market Place.com
              and click on your user avatar to go to your account page;
            </h3>
            <h3>2. Go to 'Your orders';</h3>
            <h3>3. Find the relevant order and open the order details page;</h3>
            <h3>4. Click 'Leave a review';</h3>
            <h3>
              5. You will then be able to leave individual reviews and ratings
              and upload photos and/or videos for each item in your order. The
              more descriptive you are with your review, the more helpful it
              will be to other customers;
            </h3>
            <h3>
              6. When you're done leaving your reviews, click the 'Submit'
              button at the bottom of the page.
            </h3>
          </div>
          <h3>
            Your review will be posted in the customer reviews section for the
            items you ordered. If you would like to anonymize your name so only
            the first and last letter of your username shows, remember to check
            the 'Hide your name' option under the 'Submit' button.
          </h3>
          <h3>
            We greatly value your feedback and thank you for taking the time to
            leave product reviews for Nile Market Place and our merchants to
            continuously serve you better.
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
export default Reviews;
