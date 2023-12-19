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

const SecurityAndPrivacy = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const data = [
    {
      id: 1,
      value: "item-1",
      title: "Protect Yourself from Spam Text Messages and Phishing Scams",
      content: (
        <>
          <h3>
            Beware of spam messages, emails, and phone calls! Scammers
            frequently use these communication methods to steal personal and
            financial information. To protect yourself, we recommend that you do
            not respond to these messages or calls, and avoid clicking on links
            in emails or text messages from unknown sources. If you're uncertain
            about the legitimacy of a message, it's better to be safe and report
            it to us. If you require assistance, please contact our customer
            service team, and we will investigate your reports thoroughly to
            ensure your information stays safe and secure.
          </h3>
        </>
      ),
    },
    {
      id: 2,
      value: "item-2",
      title: "How does Nile Market place protect your personal information?",
      content: (
        <>
          <h2 className="font-bold text-black">
            Nile Market place Privacy Notice
          </h2>
          <h3>
            We at Nile Market place understand the importance of your personal
            information and are committed to protecting your privacy. This
            Privacy Notice details how Nile Market place and its affiliates
            (collectively "Nile Market place") collect, process, and use your
            personal information through our websites, services, products, and
            applications that reference this Privacy Notice (collectively "Nile
            Market place Services"). By utilizing Nile Market place Services,
            you are consenting to the practices described in this Privacy
            Notice.
          </h3>
          <h2 className="font-bold text-black">
            Information Collection and Usage
          </h2>
          <h3>
            We collect personal information through various means to offer and
            enhance our Services. This includes:
          </h3>
          <h3>
            <span className="font-bold text-black">
              Directly Provided Information:
            </span>
            Information you submit during registration or while using our
            services.
          </h3>
          <h3>
            <span className="font-bold text-black">
              Automatically Collected Data:
            </span>
            Information collected when you interact with our Services.
          </h3>
          <h3>
            <span className="font-bold text-black">Third-Party Sources: </span>
            Data from partners and suppliers that help us provide and improve
            Nile Market place Services.
          </h3>
          <h3 className="font-bold text-black">
            What Personal Information About Customers Does Nile Market place
            Collect?
          </h3>
          <h3>
            Nile Market place collects your personal information to provide and
            improve our services. Here's what we collect:
          </h3>
          <h3>
            <span className="font-bold text-black">
              Information You Give Us:
            </span>
            We receive and store any information you provide in relation to Nile
            Market place Services. This includes but is not limited to your
            name, address, payment information, and purchase history.
          </h3>
          <h3>
            <span className="font-bold text-black">Automatic Information:</span>
            We automatically collect information when you use Nile Market place
            Services, such as your browsing and purchase history, as well as
            data collected through cookies and other tracking technologies.
          </h3>
          <h3>
            <span className="font-bold text-black">
              Information from Other Sources:
            </span>
            Occasionally, we might receive information about you from other
            sources and add it to our account information. This could include
            updated delivery and address information from our delivery partners.
          </h3>
          <h3 className="font-bold text-black">
            Data Security and Confidentiality
          </h3>
          <h3>
            <span className="font-bold text-black">
              Safeguarding Your Information:
            </span>
            We employ robust security measures to protect your data against
            unauthorized access, alteration, disclosure, or destruction. These
            measures include encryption, access control, and secure data
            storage.
          </h3>
          <h3>
            <span className="font-bold text-black">
              Confidentiality Practices:
            </span>
            Our team is trained in the importance of privacy and we maintain
            strict confidentiality protocols. We only share your information
            with trusted partners as necessary and under strict privacy
            agreements.
          </h3>
          <h3 className="font-bold text-black">
            Vulnerability Collection and Response Platform
          </h3>
          <h3>
            <span className="font-bold text-black">
              Proactive Cybersecurity Measures:
            </span>
            To further protect the security of our users, businesses, and
            products, Nile Market place has established a vulnerability
            collection and response platform.
          </h3>
          <h3>
            <span className="font-bold text-black">
              Partnership with HackerOne:
            </span>
            We have partnered with the renowned cybersecurity agency HackerOne.
            This collaboration ensures a robust defense against digital threats
            and enhances the security of all Nile Market place Services.
          </h3>
          <h3>
            <span className="font-bold text-black">
              Engagement and Transparency:
            </span>
            For more information on our cybersecurity efforts and how we address
            vulnerabilities, please visit our Nile Market place Security
            Response Center
          </h3>
          <h3>
            We reserve the right to modify this policy. Any changes will be
            communicated through our Services.
          </h3>
        </>
      ),
    },
    {
      id: 3,
      value: "item-3",
      title:
        "Is it safe to shop on Nile Market place? How will my information be used?",
      content: (
        <>
          <h2>
            Nile Market place is a safe shopping platform. We care about our
            customers' privacy and data security.
          </h2>
          <h2>
            We can assure you that all of our payment links have PCI
            certifications. We work with major payment providers like Visa,
            Mastercard, PayPal, Apple Pay, and Google Pay, which all have
            stringent consumer protection policies and state-of-the-art
            technology in place to protect our customers' payment data.
          </h2>
          <h2>
            We also describe in detail how we collect, use, and protect your
            personal information in our Privacy Policy, which can be found in
            Nile Market place's Privacy and Cookie Policy
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
          <AccordionBody>
            <div className="space-y-4 p-2">{item.content}</div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};
export default SecurityAndPrivacy;
