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

const AccountPreferences = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to set notification preferences?",
      content: (
        <>
          <h3>
            {t(`If you don't want to receive email, push, or SMS-related
            notifications, you can open the Nile Market Place app, go to 'You'{" "}
            {">"}
            'Settings' {">"} 'Notifications' and choose 'Edit' to set your
            preferences.`)}
          </h3>
          <h3>
            {t(`You can also go to Nile Market Place.com and click your username in
            the top right comer of your screen. Click 'Notifications' on the
            left sidebar and then choose 'Edit' to set your preferences.`)}
          </h3>
          <h3>
            {t(`You can click the link below to select your notification
            preferences:`)}
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How to change my password",
      content: (
        <>
          <h3>{t("Please follow these steps to change your password:")}</h3>
          <h3>
            {t(`1. Sign in to Nile Market Place app or Nile Market Place.com and go
            to your account page.`)}
          </h3>
          <h3>{t("2. Go to 'Settings'")} {">"} {t("Account security")}.</h3>
          <h3>{t("3. Find 'Password' and click 'Edit' to change your password.")}</h3>
          <h3>
            {t(`4. Enter your 'Old password' and 'New password' (Minimum 6
            characters required).`)}
          </h3>
          <h3>{t("5. Click 'Submit' and you're done.")}</h3>
          <h3>
            {t(`If you used your Google, Facebook, Apple, or Twitter account details
            to log in to Nile Market Place, then you will need to change your
            password details there.`)}
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "How to change my address",
      content: (
        <>
          <h3>{t("Please follow these steps to change your address:")}</h3>
          <h3>
            {t(`1. Sign in to Nile Market Place app or Nile Market Place.com and go
            to your account page`)}
          </h3>
          <h3>{t(`2. Go to 'Addresses'`)}</h3>
          <h3>
            {t(`3. From here, you can change your address by clicking "Edit" next to
            the address you want to change.`)}
          </h3>
          <h3>{t(`4. Update your address details and then click "Save".`)}</h3>
          <h3>
            {t(`If desired, you can also change your default address, delete
            addresses, or add a new address from this screen as well.`)}
          </h3>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "How to change my email address",
      content: (
        <>
          <h3>{t(`Please follow these steps to change your email address:`)}</h3>
          <h3>
            {t(`1. Sign in to Nile Market Place app or Nile Market Place.com and go
            to your account page.`)}
          </h3>
          <h3>{t(`2. Go to 'Settings'`)} {">"} {t(`'Account security'`)}.</h3>
          <h3>
            {t(`3. Click 'Edit' next to the 'Email' line to make changes to your
            information. For security purposes, you may be prompted to enter
            your password or verify your original email address before you can
            edit. Enter your password or verification code to proceed.`)}
          </h3>
          <h3>
            {t(`4. Enter your new email address and click 'Continue' to update your
            email address.`)}
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "How to change my mobile phone number",
      content: (
        <>
          <h3>{t(`Please follow these steps to change your phone number:`)}</h3>
          <h3>
            {t(`1. Sign in to Nile Market Place app or Nile Market Place.com and go
            to your account page`)}
          </h3>
          <h3>{t(`2. Go to 'Settings'`)} {">"} {t(`'Account security'`)}.</h3>
          <h3>
            {t(`3. Click 'Edit' next to the 'Mobile phone number' line to make
            changes to your information. For security purposes, you may be
            prompted to enter your password or verify your original phone number
            before you can edit. Enter your password or verification code to
            proceed.`)}
          </h3>
          <h3>
            {t(`4. Enter your new mobile phone number and click 'Continue' to update
            your number.`)}
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "How to update my username",
      content: (
        <>
          <h3>
{t(`            On the Nile Market Place app, go to the user avatar at the bottom of
            your screen. Click your username {">"} select 'Name' {">"} delete
            your old name and enter your new name. Click save and you're done!
`)}          </h3>
          <h3>
            {t(`On Nile Market Place.com, click your username in the top right
            corner of your screen. Click 'Your profile' {">"} delete your old
            name and enter your new name. Click save and you're done!`)}
          </h3>
        </>
      ),
    },
    {
      id: 7,
      value: "item-7",
      title: "How do I update my payment methods?",
      content: (
        <>
          <h3>
            {t(`1. Go to your accounts tab by clicking your user avatar in the top
            right corner`)}
          </h3>
          <h3>{t(`2. Choose 'Your payment methods' in the lefthand menu`)}</h3>
          <h3>
            {t(`3. Click '+ Add a new card' to add a new payment method, or click
            'Edit' or 'Remove' to update any existing payment methods attached
            to your account.`)}
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

export default AccountPreferences;
