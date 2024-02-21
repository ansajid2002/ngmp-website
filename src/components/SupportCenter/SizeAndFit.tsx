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

const SizeAndFit = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Your sizing is too small/large and doesn't fit me",
      content: (
        <>
          <h3>
            We are sorry that you are not happy with the fit of your item. Some
            pieces might fit differently depending on the styles, such as
            oversized sweatshirts and t-shirts which run bigger than the general
            guidelines.
          </h3>
          <h3>
            If you are not satisfied with your clothing item, you may return it
            for a full refund and reorder the item in a different size, if
            available. Almost all items are eligible for a return and refund
            with the exception of clothing items that are worn, washed, damaged,
            with tags, packaging or hygiene sticker removed or in incomplete
            set.
          </h3>
          <h3>
            For future orders, you may contact us if you have any questions
            about the sizing and measurements of the products.
          </h3>
          <h3>
            At Nile Market Place, inclusion and diversity is one of our core
            values and we are constantly trying to enhance our offerings so that
            we continue to enable our customers to enjoy the best quality,
            flexibility, and choice in their product selection.
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Where to find plus size products",
      content: (
        <>
          <h3>
            If you're using the Nile Market Place app, you can find plus size
            products under the "Women's Curve + Plus" category in the lefthand
            menu of the "Categories"tab.
          </h3>
          <h3>
            If you're on Nile Market Place.com, you can click "Categories" in
            the navigation menu at the top of the page, and select "Women's
            Curve + Plus" from the dropdown list.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "Item doesn't have my size",
      content: (
        <>
          <h3>
            We are sorry that you are not able to find the item that you want in
            your size. At Nile Market Place, inclusion and diversity is one of
            our core values and we are constantly trying to enhance our
            offerings so that we continue to enable our customers to enjoy the
            best quality, flexibility, and choice in their product selection.
          </h3>
          <h3>
            If you have any specific questions about an item's size or
            measurements, please feel free to contact us.
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

export default SizeAndFit;
