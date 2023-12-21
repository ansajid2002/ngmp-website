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

const Payments = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Why has my payment been declined?",
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
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "Why am I charged for sales tax?",
      content:
        "Depending on your state, some categories of items are taxed and others are not. We're required to charge sales tax on applicable items if the state you're in mandates it.",
    },
    {
      id: 3,
      value: "item-3",
      title: "Why is sales tax charged on some items and not others?",
      content:
        "Depending on your state, some categories of items are taxed and others are not. We're required to charge sales tax on applicable items if the state you're in mandates it.",
    },
    {
      id: 4,
      value: "item-4",
      title: "How do I edit my credit/debit card?",
      content:
        "At checkout or Your payment methods click Edit to edit to your card.",
    },
    {
      id: 5,
      value: "item-5",
      title: "How do I delete my credit/debit card?",
      content: "At Your payment methods click Edit to delete your card.",
    },
    {
      id: 6,
      value: "item-6",
      title: "Avoiding Payment Scams",
      content: (
        <>
          <h3>
            Protect yourself from fraud on the internet by identifying and
            avoiding internet scams and phishing attempts.
          </h3>
          <h3>
            When in doubt, ask the intended recipient for more information about
            the purpose and safety of the requested payment. Don't send the
            payment until you're comfortable with the transaction.
          </h3>
          <h3>To avoid payment scams:</h3>
          <div>
            <li>
              Don't do business with a merchant who directs you off the Nile
              Market Place website. A legitimate Nile Market Place merchant
              transaction will never occur off the Nile Market Place website.
            </li>
            <li>
              Don't send money (by cash, wire transfer, Western Union, PayPal,
              MoneyGram, or other means) to a merchant who claims that Nile
              Market Place will guarantee the transaction, refund your funds if
              you're not satisfied with the purchase, or hold your funds in
              escrow.
            </li>
            <li>
              Don't make a payment to claim lottery or prize winnings, or on a
              promise of receiving a large amount of money.
            </li>
            <li>
              Don't make a payment because you're guaranteed a credit card or
              loan.
            </li>
            <li>
              Don't respond to an internet or phone offer that you're not sure
              is honest.
            </li>
            <li>
              Don't make a payment to someone you don't know or whose identity
              you can't verify.
            </li>
            <li>
              Don't respond to emails that ask you to provide account
              information, such as your email address and password combination.
              Nile Market Place will never ask you for personal information.
            </li>
          </div>
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
export default Payments;
