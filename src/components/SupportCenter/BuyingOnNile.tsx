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

const BuyingOnNile = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "How to get help before I buy",
      content: (
        <>
          <h3>{t("Something on your mind? We are here to help!")}</h3>
          <h3>
            {t("For questions on specific items, you can message us from the Nile app or nilegmp.com.")}
          </h3>
          <h3>
            {t("For other questions on our policies or other topics, we recommend that you browse our Support Center where we answer our customers' most common questions. Happy shopping!")}
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How to search for items on Nile Market-place",
      content: (
        <>
          <h3>
            {t("You can use the search button at the top of your Nile Market Place app or Nile Market Place.com to look for items.")}
          </h3>
          <h3>
           {t("Describe what you're looking for in the search bar to start your search. For example: 'party dress,' or 'white denim shorts.' Please use multiple descriptive terms to narrow down the results. For example, using 'little black dress' as a search term will generally produce more curated results compared to using just 'dress.'")}
          </h3>
          <h3>
           {t("Search results are ordered by how relevant the items are to your search. You can use the 'Sort by' option to reorder your search results based on your preference.")}
          </h3>
          <h3>
            {t("For searches that you would like to track on desktop, you can click the orange 'Save' button to get notified when new items that fit your search are posted.")}
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title: "How to purchase an item on Nile Market-place?",
      content: (
        <>
          <h3>
           {t("When you shop on Nile, if you have any questions about an item, please feel free to message us anytime.")}
          </h3>
          <h3>
           {t("Rest assured that you can shop confidently with Nile Market Place's return and refund policy and Nile Market Place Purchase Protection Program.")}
          </h3>
          <h3>
           {t("Almost all items you bought on Nile Market Place are eligible for return and refund within 90 days if you are not satisfied with them, with just a few exceptions:")}
          </h3>
          <ul>
            <li>
             {t("Clothing items that have been worn, washed, damaged, or have had tags, packaging, or hygiene stickers removed, or are part of an incomplete set.")}
            </li>
            <li>{t("Items specifically labeled as non-returnable.")}</li>
            <li>{t("Customized items.")}</li>
            <li>{t("Some free gifts.")}</li>
          </ul>
          <h3>
           {t("In addition, under the Nile Market Place Purchase Protection Program, we offer full refunds for any item(s) that do not arrive, arrive damaged or are not as described.")}
          </h3>
          <h3>
           {t("Once you click checkout and complete your payment, congratulations! You've just made a purchase on Nile Market Place. We will send you an email confirming the items in your order. You can also view your order information by going to 'Your orders' on your account page from the Nile Market Place app or Nile Market Place.com.")}
          </h3>
          <h3>{t("You may learn more about our policies here:")}</h3>
          <a
            href="/company/return-refund-policy"
            target="blank"
            className="text-orange-900"
          >
            {t("Return & Refund Policy")}
          </a>
          <br />
          <a
            href="/company/privacy-policy"
            target="blank"
            className="text-orange-900"
          >
            {t("Provacy & Policy")}
          </a>
        </>
      ),
    },
    {
      id: 4,
      value: "item-4",
      title: "I received an email about an order I did not place",
      content: (
        <>
          <h3>
           {t("If you received an email confirmation about an order you did not place, first check with your family and friends to see if they may have accidentally used your account details to place an order. It may also be possible that:")}
          </h3>
          <div>
            <li>
             {t("Someone may have misspelled their email address when registering for an account on Nile Market Place")}
            </li>
            <li>
              {t("Someone may have created a Nile Market Place account using your email address")}
            </li>
            <li>
              {t("Someone may have placed an order from a computer where you were signed into Nile Market Place")}
            </li>
          </div>
          <h3>
           {t("If you suspect fraudulent activity, we recommend that you immediately change your account password to secure your account and prevent future unauthorized orders.")}
          </h3>
        </>
      ),
    },
    {
      id: 5,
      value: "item-5",
      title: "How to follow shops/sellers",
      content: (
        <>
          <h3>
            {t("Keep track of the shops you love by following them on Nile Market Place!")}
          </h3>
          <h3>
            {t("All you need to do is go to their individual shop page and click the 'Follow' button.")}
          </h3>
          <h3>
            {t("You can find the shop that sells the items you love by clicking on their name from the product details page or your order details page.")}
          </h3>
          <h3>
            {t("To view the shops you've followed, go to your account page on the Nile Market Place app or Nile Market Place.com. Click on 'Followed shops' to view the shops you've loved.")}
          </h3>
        </>
      ),
    },
    {
      id: 6,
      value: "item-6",
      title: "Tips for buying safely on Nile Market-place",
      content: (
        <>
          <h3>
           {t("Here are some best practices to help ensure safe purchases on Nile Market Place.")}
          </h3>
          <li>
           {t("Never give your full credit card number, tax identification number, or password in an email, Nile Market Place Message, or over the phone.")}
          </li>
          <li>
            {t("Check your credit card statement regularly to track your spending and card activity.")}
          </li>
          <li>
           {t("If you share your computer or device, sign out of any website accounts before letting others use it.")}
          </li>
          <li>
           {t("Change your passwords on a regular basis. The more complex a password is, the better you're protected.")}
          </li>
          <li>
  {t("Check your credit card statement regularly to track your spending and card activity.")}
</li>
<li>
  {t("Keep track of your credit card: who is authorized to use it, and who has access to it.")}
</li>
<li>
  {t("Learn how Nile Market Place's return and refund policy can help you get a full refund on your item. Almost all items you bought on Nile Market Place are eligible for return and refund if you are not satisfied with them, with just a few exceptions: (1) Clothing items that have been worn, washed, damaged, or have had tags, packaging, or hygiene stickers removed, or are part of an incomplete set; (2) Items specifically labeled as non-returnable; (3) Customized items; (4) Some free gifts.")}
</li>
<li>
  {t("Learn about Nile Market Place's Purchase Protection Program, which offers you full refunds for any item(s) that do not arrive, arrive damaged, or are not as described.")}
</li>
<li>
  {t("Keep your transactions on Nile Market Place. We can't verify or assist with transactions made outside of Nile Market Place.")}
</li>
<li>
  {t("If you receive a suspicious email claiming to be from Nile Market Place, please report it to our customer service.")}
</li>

        </>
      ),
    },
    {
      id: 7,
      value: "item-7",
      title: "Does Nile Market-place support drop shipping?",
      content: (
        <>
          <h3>
  {t("No, we do not support drop shipping on our platform. We connect consumers with millions of sellers, manufacturers, and brands around the world and sell exclusively on our website or Nile Market Place app. We recommend purchasing directly through our platform so that we are able to help you with any after-sale services and you are able to participate in our latest deals and promotions. We hope you enjoy shopping on Nile Market Place!")}
</h3>

        </>
      ),
    },
    {
      id: 8,
      value: "item-8",
      title: "Does Nile Market-place accept tax exemption certificates?",
      content: (
        <>
          <h3>
  {t("Yes, we do accept certain tax exempt certificates, including certificates for government bodies, nonprofit organizations, and other qualified entities. However, we currently do not accept resale certificates of any kind. Also, diplomatic tax exemptions such as personal and mission tax exemption cards may be used to obtain exemption status in person at the point-of-sale, but aren't valid for online purchases.")}
</h3>
<h3>
  {t("If you represent government bodies, nonprofit organizations, and other qualified entities, please email the following documentation to tax.exempt@Nile Market Place.com.")}
</h3>
<li>
  {t("Proof of exemption in PDF format for the state(s) where the items will be shipped. Please note, any incomplete information on your exemption document (signature, date, not checking every applicable box) will result in a request for you to resubmit the document with complete information.")}
</li>
<li>{t("Organization Name")}</li>
<li>{t("Name (Primary Purchaser)")}</li>
<li>{t("Full Address")}</li>
<li>{t("Phone Number")}</li>
<li>{t("The Nile Market Place user account email for your organization")}</li>
<li>
  {t("Organization Type: (Charitable / Religious / Educational / Government / Nonprofit Organization / Miscellaneous)")}
</li>
<h3>
  {t("Please note we do not accept sales tax permits, articles of incorporation, SSN, tax licenses, IRS determination letter (unless required by state law), W9's, or certificates of registration as proof of exemption.")}
</h3>

        </>
      ),
    },
    {
      id: 9,
      value: "item-9",
      title: "How is Nile Market-place able to offer lower prices than others?",
      content: (
        <>
         <h3>
  {t("Nile Market Place connects customers directly with cost-efficient producers, allowing for competitively priced goods. By eliminating multiple middlemen and shipping directly from factories to consumers, customers benefit from wholesale prices from the source.")}
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
