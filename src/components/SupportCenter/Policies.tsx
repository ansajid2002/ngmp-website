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

const Policies = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "What is Nile Market place's shipping policy?",
      content:
        "Please visit our shipping info page to view more details about our shipping policy.",
    },
    {
      id: 2,
      value: "item-2",
      title: "What is Nile Market place's late delivery compensation policy?",
      content: (
        <>
          <h2>
            To learn more about our late delivery compensation policy, please
            visit:{" "}
            <a
              href="/company/late-delivery-compensation"
              target="blank"
              className="text-orange-900"
            >
              late Delivery Compensation
            </a>{" "}
            page
          </h2>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "What is Nile Market place's privacy policy?",
      content: (
        <>
          <h2>
            To learn more about our privacy and policy, please visit:
            <a
              href="/company/privacy-policy"
              target="blank"
              className="text-orange-900"
            > Privacy Policy
            </a>
          </h2>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "What is Nile Market place's return policy?",
      content: (
        <>
          <h2>
            For more information about our return and refund policy, please
            refer to the link below:
            <br />
            <a
              href="/company/return-refund-policy"
              target="blank"
              className="text-orange-900"
            >
              Return & Refund Policy
            </a>
          </h2>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "What is Nile Market place's terms and conditions policy?",
      content: (
        <>
          <h2>
            To learn more about our terms and conditions policy, please visit:
            <a
              href="/company/terms-conditions"
              target="blank"
              className="text-orange-900"
            >
              Terms And Conditions
            </a>
          </h2>
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
          <AccordionBody>{item.content}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};
export default Policies;
