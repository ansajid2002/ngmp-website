import BreadCrumb from "@/components/BreadCrumb";
import React from "react";

const page = () => {
  return (
    <>
      <BreadCrumb label1={"Home"} label2={"About Us"} />
      <div className="py-5 md:py-10 px-5 md:px-20 space-y-5">
        <h1 className="text-3xl md:text-5xl font-medium text-[#ED642B] mb-2">
          What is Nile ?
        </h1>
        <p>
          Nile is an online marketplace that connects consumers with millions of
          sellers, manufacturers and brands around the world with the mission to
          empower them to live their best lives. Nile is committed to offering
          the most affordable quality products to enable consumers and sellers
          to fulfill their dreams in an inclusive environment. Nile was founded
          in Boston, Massachusetts in 2022.
        </p>
        <h1 className="text-3xl md:text-5xl font-medium text-[#ED642B] mb-2">
          Where does Nile ship from?
        </h1>
        <p>
          Nile ships its products from a global network of suppliers and
          manufacturers, using experienced and reliable logistics partners.
          Nile's shipping origins can vary depending on the product being
          purchased. However, Nile works with leading package carriers like UPS,
          FedEx, and USPS to ensure that all orders are delivered promptly and
          securely to customers.
        </p>
        <h1 className="text-3xl md:text-5xl font-medium text-[#ED642B] mb-2">
          Nile's unique strengths
        </h1>
        <div>
          Nile is bringing the world’s best sellers, manufacturers and brands of
          all sizes to your doorstops because of our:
          <li>Ability to source the best products globally</li>
          <li>Experience in managing complex logistical supply chains</li>
          <li>Consumer-to-Manufacturing (“C2M”)</li>
        </div>
      </div>
    </>
  );
};

export default page;
