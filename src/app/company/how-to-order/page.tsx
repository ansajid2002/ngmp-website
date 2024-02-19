import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";
import React from "react";

const Page = () => {
  const stepData = [
    {
      id: 1,
      step: "step 01",
      label: "Add item(s) to your shopping cart.",
      list1: [
        "1. Find items that you like and select a color, size, and the quantity you would like to purchase.",
        "2. Review the item and your selected color, size, and quantity and then click Add to cart.",
      ],
      image: "/images/step01.png",
    },
    {
      id: 2,
      step: "step 02",
      label: "Go to your shopping cart.",
      list1: [
        "1. After adding an item to your cart, you can click Go to cart on the right popup window.",
      ],
      image: "/images/step02.png",
    },
    {
      id: 3,
      step: "step 03",
      label:
        "Review your added items and make some modifications if necessary in your cart.",
      list1: ["1. When you're ready to checkout, click Checkout."],
      image: "/images/step03.png",
    },
    {
      id: 4,
      step: "step 04",
      label: "Log into your Nile account.",
      list1: [
        "1. Sign in/ Register with your email, phone number or third-party platform. Or proceed to checkout as a guest by clicking Continue as a guest button.",
      ],
      image: "/images/step04.png",
    },
    {
      id: 5,
      step: "step 05",
      label: "Fill in your shipping information.",
      list1: [
        "1. Fill in the shipping address.",
        "2. Click Continue to payment.",
      ],
      image: "/images/step05.png",
    },
    {
      id: 6,
      step: "step 06",
      label: "Submit your order.",
      list1: [
        "1. Choose a shipping method.",
        "2. Select a payment method.",
        "3. Review your order summary. If you have a coupon available, make sure to apply it.",
        "4. When you're all ready to place the order, click Submit order.",
      ],
      image: "/images/step06.png",
    },
  ];

  return (
    <>
      <BreadCrumb label1={"Home"} label2={"How to order"} />
      <div className="p-5 lg:p-10">
        <div className="lg:text-center">
          <h1 className="text-4xl pb-2 font-semibold">How to order</h1>
          <p>
            Purchasing an item on Nile is easy. Simply follow the steps below.
          </p>
        </div>

        {stepData?.map((item: any, index: any) => (
          <div className="w-full py-10 space-y-5 lg:flex">
            <div className="lg:w-[50%] lg:px-10 flex flex-col items-start justify-center">
              <h2 className="text-3xl text-green-600 font-bold uppercase">
                {item.step}
              </h2>
              <h3 className="pb-5 font-medium text-lg">{item.label}</h3>
              <ul className="space-y-2 text-sm lg:text-base">
                {item?.list1?.map((item: any, index: any) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className="lg:w-[50%]">
              <img src={item.image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
