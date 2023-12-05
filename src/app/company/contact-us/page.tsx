"use client";
import BreadCrumb from "@/components/BreadCrumb";
import { ChevronRight, MessageCircle } from "lucide-react";
import React from "react";

const page = () => {
  const styling = {
    backgroundImage: `url(https://images.pexels.com/photos/1029622/pexels-photo-1029622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
  };
  return (
    <>
      <BreadCrumb label1={"Home"} label2={"Contact Us"} />
      <div
        style={styling}
        className="px-5 md:px-10 py-14 md:py-24 bg-no-repeat bg-cover"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-[#ed642b]">
          Contact Us
        </h2>
        <p className="text-xl">Real-time and fast responses</p>
      </div>

      {/* <div className="p-10 flex items-center">
        <div className="w-[50%] flex items-center">
          <MessageCircle size={30} />
          <div>
            <h2>Need help ?</h2>
            <h3>You can contact Nile customer service for help</h3>
            <div className="flex items-center">
              <p>Contact us</p>
              <ChevronRight />
            </div>
          </div>
        </div>
        <div className="w-[50%]">div2</div>
      </div> */}
    </>
  );
};

export default page;
