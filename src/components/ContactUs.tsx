import {
  Archive,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  File,
  FileText,
  Info,
  MapPin,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const renderFAQ = () => {
  const OrderIssues = [
    "Buying on Nile",
    "Checkout",
    "Find my order",
    "Order changes",
    "Reviews",
  ];
  const ShippingDelivery = ["Shipping", "Delivery"];
  const ReturnRefund = ["Returns", "Refunds"];
  const ProductStock = ["Stock", "Size & fit"];
  const ManagingMyAccount = ["Account preferences", "Signing in"];
  const PaymentPromos = ["Payments", "Nile credit", "Promos"];
  const YourSecurity = ["Secuirty and Privacy"];
  const PoliciesOthers = ["Policies", "Feedbacks & collab inquiries"];
  return (
    <div className="px-2 py-10 md:py-20">
      <h2 className=" text-center text-2xl md:text-3xl px-5 font-bold capitalize pb-5">
        Have a question ? Well, we've got some answers.
      </h2>

      <div className="flex w-full md:px-40 p-2 md:p-6 mb-5">
        <div className="md:w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <FileText size={15} />
            Order issues
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {OrderIssues?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <Truck size={15} />
            Shipping & delivery
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {ShippingDelivery?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full md:px-40 p-2 md:p-6 mb-5">
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <CircleDollarSign size={15} />
            Return & Refund
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {ReturnRefund?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 md:gap-2 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-2 items-center font-medium md:text-lg">
            <Archive size={15} />
            Product & stock
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {ProductStock?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full md:px-40 p-2 md:p-6 mb-5">
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <User size={15} />
            Managing my account
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {ManagingMyAccount?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <CreditCard size={15} />
            Payment & promos
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {PaymentPromos?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full md:px-40 p-2 md:p-6 mb-5">
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <ShieldCheck size={15} />
            Your security
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {YourSecurity?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 space-y-2">
          <h2 className="flex gap-1 md:gap-2 items-center font-medium md:text-lg">
            <Info size={15} />
            Policies & others
          </h2>
          <ul className="md:space-y-3 px-2 md:px-10">
            {PoliciesOthers?.map((item: any, index: any) => (
              <li key={index}>
                <Link
                  href={"/SupportCenter?query=BuyingOnNile"}
                  className="flex gap-1 items-center hover:bg-gray-200 p-2 rounded-md"
                >
                  {item}
                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const styling = {
    backgroundImage: `url(https://images.pexels.com/photos/1029622/pexels-photo-1029622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
  };
  return (
    <>
      <div
        style={styling}
        className="px-5 md:px-10 py-14 md:py-24 bg-no-repeat bg-cover"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-[#ed642b]">
          Contact Us
        </h2>
        <p className="text-xl">Real-time and fast responses</p>
      </div>

      <div className="px-3 md:px-20  py-10 md:flex items-center">
        <div className="md:w-[50%] flex items-center mb-5 md:mb-0">
          {/* <MessageCircle size={30} className="mr-3" color="#ed642b" /> */}
          <div className="space-y-1">
            <h2 className="font-medium">Need help ?</h2>
            <h3>You can contact Nile customer service for help</h3>
            <div className="flex items-end text-[#ed642b] hover:underline cursor-pointer">
              <p>Contact us</p>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
        <div className="md:w-[50%] flex items-center ">
          {/* <MapPin size={40} className="mr-3" color="#ed642b" /> */}
          <div className="space-y-1">
            <h2 className="font-medium">Office Address</h2>
            <h3 className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
              ipsa, quae necessitatibus non vero autem quas.
            </h3>
            <div className="flex items-center text-[#ed642b]">
              {/* <Info size={20} className="mr-2" /> */}
              <p className="text-sm hover:underline cursor-pointer">
                Please note, returns will not be accepted at this address. If
                you want to return your items, please click here
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        <h2 className="text-2xl text-center px-5 md:text-3xl tracking-wide uppercase">
          We are also available on social media
        </h2>
        <div className="flex gap-2 md:gap-8">
          <Image src={"/facebook.png"} width={50} height={50} alt="facebook" />
          <Image
            src={"/instagram.png"}
            width={50}
            height={50}
            alt="instagram"
          />
          <Image
            src={"/pinterest.png"}
            width={50}
            height={50}
            alt="pinterest"
          />
          <Image src={"/twitter.png"} width={50} height={50} alt="twitter" />
          <Image src={"/youtube.png"} width={50} height={50} alt="youtube" />
        </div>
      </div>

      {renderFAQ()}

      <div className="flex flex-col items-center justify-center py-10 md:py-20">
        <h2 className="text-xl px-5 text-center font-medium mb-5">
          Can't find the answer you are looking for ?
        </h2>
        <div className="border rounded-full border-black py-2 px-16 flex gap-2 items-center">
          <MessagesSquare size={20} />
          Contact Us
        </div>
      </div>
    </>
  );
};

export default ContactUs;
