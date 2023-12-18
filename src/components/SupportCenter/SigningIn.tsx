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

const SigningIn = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to create a Nile Market Place account",
      content: (
        <>
          <h3>
            Welcome to Nile Market Place! We'd love to help you join our
            community.
          </h3>
          <div>
            <h3>To register for a Nile Market Place account:</h3>
            <h3>
              1. Download and open your Nile Market Place app or visit Nile
              Market Place.com.
            </h3>
            <h3>
              2. Go to the user avatar on the Nile Market Place app and click
              'Sign in/Register' on top of the page, or click 'Sign in/Register'
              in the top righthand corner of Nile Market Place.com.
            </h3>
            <h3>
              3. Carefully review Nile Market Place's Terms of Use and Privacy
              Policy.
            </h3>
            <h3>
              4. You may use your email address or phone number to create an
              account and set up a new password, or you may also click 'Continue
              with Google', 'Continue with Facebook', 'Continue with Twitter' or
              'Continue with Apple' to login using your existing accounts.
            </h3>
          </div>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "I can't sign into my account",
      content: (
        <>
          <h3>
            If you are having trouble signing into your account, please first
            confirm that you are using the correct login email, phone number, or
            authentication method to login to your Nile Market Place account.
          </h3>
          <h3>
            If you originally signed in with your Facebook, Google, Twitter, or
            Apple login details, you will have to login through this method
            only.
          </h3>
          <h3>
            If you are still unable to login, please click 'Forgot Your
            Password' to reset your password.
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
export default SigningIn;
