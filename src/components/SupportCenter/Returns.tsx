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

const Returns = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to return or exchange an item on Nile Market Place",
      content: (
        <>
          <h3>
            Unfortunately, we do not offer exchanges at the moment, but you can
            place a new order and initiate a return of the existing order.
            Almost all items are eligible for returns and refunds within 90 days
            from the purchase date. The few exceptions are for:
          </h3>
          <div>
            <li>
              Clothing items that have been worn, washed, damaged, or have had
              tags, packaging, or hygiene stickers removed, or are part of an
              incomplete set.
            </li>
            <li>Items specifically labeled as non-returnable.</li>
            <li>Customized items.</li>
            <li>Some free gifts.</li>
          </div>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "What is the status of my return or exchange?",
      content: (
        <>
          <h3>
            You can track your return status by going to your Nile Market Place
            account from the Nile Market Place app or Nile Market Place.com. Go
            to 'Your orders' {">"}'Returns'. From there, you will be able to
            track the status of your return, when we receive your package, and
            when your refund has been issued.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "Can I exchange the size/color of items?",
      content: (
        <>
          <h3>
            Unfortunately, we do not offer exchanges at the moment, but you can
            place a new order and initiate a return. Almost all items are
            eligible for returns and refunds within 90 days from the purchase
            date. The few exceptions are for:
          </h3>
          <div>
            <li>
              Clothing items that have been worn, washed, damaged, or have had
              tags, packaging, or hygiene stickers removed, or are part of an
              incomplete set.
            </li>
            <li>Items specifically labeled as non-returnable.</li>
            <li>Customized items.</li>
            <li>Some free gifts.</li>
          </div>
          <h3>
            For more information about our return and refund policy, please
            refer to the link below:{" "}
            <a
              href="/company/return-refund-policy"
              target="blank"
              className="text-orange-900"
            >
              Return & Refund Policy
            </a>
          </h3>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "What if I received an item damaged or not as described?",
      content: (
        <>
          <h3>
            When you shop on Nile Market Place, your orders are safe under the
            Nile Market Place Purchase Protection Program which offers refunds
            for items that do not arrive, arrive damaged, or are not as
            described. You may be asked to send the item back before your refund
            can be issued. Please note that this amount may not match the full
            price of the items since sales taxes, shipping, used coupons and
            credit are taken into account.
          </h3>
          <h3>
            To report an item as damaged or not as described, please follow the
            steps below to request your refund:
          </h3>
          <h3>1. Sign into your account.</h3>
          <h3>
            2. Find the relevant order under 'Your orders' and click
            'Return/Refund'.
          </h3>
          <h3>
            3. Confirm that you have received the package, and select the
            item(s) you would like to return and the reason for the return. If
            applicable, you may also upload photos and/or comments to further
            explain.
          </h3>
          <h3>4. Confirm the return information, and click 'Next'.</h3>
          <h3>
            5. If there is no need to return your item, then your final step is
            simply to select your refund method. You may choose to receive your
            refund as a Nile Market Place credit balance or credit to your
            original payment method. Make your selection and click 'Submit'.
          </h3>
          <h3>
            5. If there is no need to return your item, then your final step is
            simply to select your refund method. You may choose to receive your
            refund as a Nile Market Place credit balance or credit to your
            original payment method. Make your selection and click 'Submit'.
          </h3>
          <h3>
            7. If applicable, print and tape your return label to the outside of
            your return package. The first return for EVERY order is free. Mail
            out your package at the nearest USPS or UPS location and you're
            done!
          </h3>
          <h3>
            8. You can reference the status of your refund or rebuy any items
            from your order on your order details page.
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "What if I received the wrong item?",
      content: (
        <>
          <h3>
            If you received the wrong item in your order and are missing an
            item, please go to your Nile Market Place account on Nile Market
            Place.com or Nile Market Place app to request a refund.
          </h3>
          <h3>1. Go to 'Your orders'</h3>
          <h3>2. Click 'Return/Refund' for the relevant order</h3>
          <h3>
            3. Confirm that you have received the package, and select the reason
            for your return as 'Wrong item was sent'. You may also upload photos
            and/or comments to further explain.
          </h3>
          <h3>4. Confirm the return information, and click 'Next'.</h3>
          <h3>
            5. If there is no need to return your item, then your final step is
            simply to select your refund method. You may choose to receive your
            refund as a Nile Market Place credit balance or credit to your
            original payment method. Make your selection and click 'Submit'.
          </h3>
          <h3>
            6. If you need to return your item(s), you will have the option to
            choose your return method. Select your return and refund methods.
            Then, click 'Submit'.
          </h3>
          <h3>
            7. Print and tape your return label to the outside of your return
            package. The first return for EVERY order is free. Mail out your
            package at the nearest USPS or UPS location and you're done!
          </h3>
          <h3>
            After you apply for your return, you will need to return your
            package within 14 days. You can reference the status of your refund
            or rebuy any items from your order on your order details page.
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "Can I change return options?",
      content: (
        <>
          <h3>
            If you have not mailed out your package, you may cancel your
            existing return request and submit a new one with a different return
            method.
          </h3>
        </>
      ),
    },
    {
      id: 7,
      value: "item-7",
      title: "How long do I have to return something?",
      content: (
        <>
          <h3>
            Almost all items are eligible for returns and refunds within 90 days
            from the purchase date. The few exceptions are for:
          </h3>
          <div>
            <li>
              Clothing items that have been worn, washed, damaged, or have had
              tags, packaging, or hygiene stickers removed, or are part of an
              incomplete set.
            </li>
            <li>Items specifically labeled as non-returnable.</li>
            <li>Customized items.</li>
            <li>Some free gifts.</li>
          </div>
          <h3>
            After you submit your return request, you will need to return your
            package within 14 days. You may not return any items after the
            90-day window expires.
          </h3>
          <h3>
            For more information about our{" "}
            <a
              href="/company/return-refund-policy"
              target="blank"
              className="text-orange-900"
            >
              Return & Refund Policy
            </a>
          </h3>
        </>
      ),
    },
    {
      id: 8,
      value: "item-8",
      title: "How do I ship my items back?",
      content: (
        <>
          <h3>
            If your items are eligible for a return, you may follow the steps
            below to start your return process:
          </h3>
          <h3>1. Sign into your account.</h3>
          <h3>
            2. Find the relevant order under 'Your orders' and click
            'Return/Refund'.
          </h3>
          <h3>
            3. Confirm that you have received the package, and select the
            item(s) you would like to return and the reason for the return. If
            applicable, you may also upload photos and/or comments to further
            explain.
          </h3>
          <h3>4. Confirm the return information, and click 'Next'.</h3>
          <h3>
            5. If there is no need to return your item, then your final step is
            simply to select your refund method. You may choose to receive your
            refund as a Nile Market Place credit balance or credit to your
            original payment method. Make your selection and click 'Submit'.
          </h3>
          <h3>
            6. If you need to return your item(s), you will have the option to
            choose your return method. Select your return and refund methods.
            Then, click 'Submit'.
          </h3>
          <h3>
            7. Print and tape your return label to the outside of your return
            package. The first return for EVERY order is free. Mail out your
            package at the nearest USPS or UPS location and you're done!
          </h3>
          <h3>
            If you would like to request return and refund of additional items
            before shipping out the return package, please follow the
            instructions on the return details page and choose to use the same
            return label. Then you can ship back the additional items together
            and avoid return shipping fees.
          </h3>
          <h3>
            After you apply for your return, you will need to return your
            package within 14 days. You can reference the status of your refund
            or rebuy any items from your order on your order details page.
          </h3>
        </>
      ),
    },
    {
      id: 9,
      value: "item-9",
      title: "Where is my return label?",
      content: (
        <>
          <h3>
            After you submit a return request, you can print your return label
            from the 'Returns' tab under 'Your orders' in the Nile Market Place
            app or on Nile Market Place.com. Then, tape your return label to the
            outside of your return package and mail it out from your nearest
            USPS or UPS location within 14 days of your return request. The
            first return for EVERY order is free!
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
export default Returns;
