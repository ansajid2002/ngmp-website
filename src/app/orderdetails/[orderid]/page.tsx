"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { ArrowDownToLine, FileText, HelpCircle, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Steps, Modal } from "antd";
// import "antd/dist/antd.css";

const { Step } = Steps;

const renderSteps = () => {
  const currentStep = 2;

  const [current, setCurrent] = useState(0);
  const data = [
    {
      title: "Order Confirmed",
      subtitle: "Thu, 3rd Nov",
      content: "Your order has been placed",
    },
    {
      title: "Shipped",
      subtitle: "Thu, 4th Nov",
      content: "Your order has been shipped",
    },
    {
      title: "Out For Delivery",
      subtitle: "Thu, 5th Nov",
      content: "Your order is out for delivery",
    },
    {
      title: "Delivered",
      subtitle: "Thu, 6th Nov",
      content: "Your order has been delivered",
    },
  ];

  const onStepHover = (index: number) => {
    console.log("onHover:", index);
    setCurrent(index);
  };

  const desc = data[current];

  return (
    <div>
      <Steps current={currentStep}>
        {data.map((item, index) => (
          <Step
            key={index}
            title={item.title}
            description={item.subtitle}
            onMouseEnter={() => onStepHover(index)}
            onMouseLeave={() => setCurrent(currentStep)}
          />
        ))}
      </Steps>
      <div className="p-5 text-center">
        <p className="text-[#ed642b] text-lg">{desc.content}</p>
      </div>
    </div>
  );
};

const renderOrderDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priceDetailsData = [
    {
      id: 1,
      title: "Price(1 item)",
      amount: "$2,400",
    },
    {
      id: 2,
      title: "Selling price",
      amount: "$1,200",
    },
    {
      id: 3,
      title: "Extra discount",
      amount: "-$200",
    },
    {
      id: 4,
      title: "Special price",
      amount: "$999",
    },
    {
      id: 5,
      title: "Shipping discount",
      amount: "-$70",
    },
    {
      id: 6,
      title: "Shipping fee",
      amount: "$70",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-[50%]  py-2 border-b-2 md:border-b-0">
      <div className="flex gap-2 items-center justify-start">
        <img
          src="/placeholder.png"
          className="h-20 md:h-24 w-20 md:w-24"
          alt="Product Image"
        />
        <div>
          <h2 className="line-clamp-1">Trending sneaker shoe for mens</h2>
          <p className="text-sm text-gray-700">
            Color: <span>White</span>
          </p>
          <p className="text-sm text-gray-700">
            Seller: <span>Pasha Shop</span>
          </p>
          <div className="flex gap-3 items-center ">
            <p className="font-medium">$999</p>
            <p
              className="flex gap-1 items-center text-sm font-medium text-[#ed642b] cursor-pointer"
              onClick={showModal}
            >
              Price Details
              <HelpCircle size={15} />
            </p>
            <Modal
              title="Price details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <div className="border-t-2 py-2">
                {priceDetailsData?.map((item: any, index: any) => (
                  <div
                    className="flex items-center justify-between py-1"
                    key={index}
                  >
                    <h2>{item.title}</h2>
                    <h2 className="font-medium">{item.amount}</h2>
                  </div>
                ))}
                <div className="text-lg font-medium flex items-center justify-between mt-2 py-2 border-t-2">
                  <h2>Price</h2>
                  <h2>$999</h2>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <h2 className="text-sm text-gray-700 mt-2">
        Return policy ended on Nov 09
      </h2>
    </div>
  );
};

const page = () => {
  const params = useParams();
  // console.log(params);

  return (
    <>
      <BreadCrumb label1={"Home"} label2={"Order Details"} />

      <div className="md:flex items-start justify-between bg-white mx-3 md:mx-10 border shadow-xl my-3 p-3 md:p-6">
        {/* 1 */}
        <div className=" md:w-[50%] space-y-1 md:pr-10 md:border-r-2 border-b-2 md:border-b-0 pb-5 md:pb-0 border-gray-300">
          <h2 className="font-medium">Delivery Address</h2>
          <h2 className="font-medium">Ansari Afroz</h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio animi
            tempora facere sed aspernatur autem, voluptatum quod placeat ducimus
            ipsum laborum iste nostrum similique laudantium commodi amet.
          </p>
          <h3 className="font-medium">
            Phone number <span className="font-normal">7208820113 </span>
          </h3>
        </div>
        {/* 2 */}
        <div className="md:w-[50%] md:space-y-5 md:pl-10 pt-5 md:pt-0">
          <h2 className="font-semibold">More Actions</h2>
          <div className="flex items-center justify-between">
            <span className="flex gap-1 items-center ">
              <FileText color="#ed642b" size={25} />
              Download Invoice
            </span>
            <h2 className="flex gap-1 cursor-pointer items-center py-1 px-4 md:px-6 border border-gray-600 rounded-lg">
              Download
              <ArrowDownToLine size={17} />
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white mx-3 md:mx-10 border shadow-xl my-3 p-3 md:p-6">
        <div className="md:flex items-start justify-center">
          {/* 1 */}
          {renderOrderDetails()}
          {/* 2 */}
          <div className="w-full md:w-[50%] py-2 text-[#ed642b] space-y-2 text-sm font-medium">
            <h2 className="flex items-center gap-1">
              <Star size={20} />
              Rate & Review Produt
            </h2>
            <h2 className="flex items-center gap-1">
              <HelpCircle size={20} />
              Need help ?
            </h2>
          </div>
        </div>
        <div className="w-full pt-14">{renderSteps()}</div>
      </div>
    </>
  );
};

export default page;
