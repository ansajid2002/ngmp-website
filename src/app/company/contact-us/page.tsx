import BreadCrumb from "@/components/BreadCrumb";
import ContactUs from "@/components/ContactUs";
import React from "react";

const Page = () => {
  return (
    <>
      <BreadCrumb label1={"Home"} label2={"Contact Us"} />
      <ContactUs />
    </>
  );
};

export default Page;
