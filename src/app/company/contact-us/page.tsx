"use client";
import BreadCrumb from "@/components/BreadCrumb";
import ContactUs from "@/components/ContactUs";
import React from "react";

const page = () => {
  return (
    <>
      <BreadCrumb label1={"Home"} label2={"Contact Us"} />
      <ContactUs />
    </>
  );
};

export default page;
