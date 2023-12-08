import { ChevronRight, DollarSign, FileText, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";
import TransactionDetails from "./TransactionDetails";

const WalletDetails = () => {
  const listData = [
    {
      id: 1,
      icon1: <FileText size={16} />,
      text: "Download Report",
      link: "#",
    },
    {
      id: 1,
      icon1: <DollarSign size={16} />,
      text: "Send token to Nile user",
      link: "/token-transaction",
    },
    {
      id: 1,
      icon1: <Wallet size={16} />,
      text: "Add token to wallet",
      link: "/add-token-wallet",
    },
  ];

  return (
    <div className="m-3 bg-white px-4 py-5 md:p-10 rounded-t-3xl">
      <div className="flex gap-2 items-center justify-start mb-4">
        <Wallet size={30} color="#063b69" />
        <h2 className="text-2xl font-bold text-[#063b69]">Nile Wallet</h2>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-start gap-3 justify-between">
        {/* -------- */}
        <div>
          <div>
            {/* ----- */}
            <div className="text-[#063b69]">
              {listData?.map((item: any, index: any) => (
                <Link
                  href={item.link}
                  key={index}
                  className="flex font-medium items-center gap-1 py-1 group cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    {item.icon1}
                    <h2>{item.text}</h2>
                  </span>
                  <ChevronRight
                    size={20}
                    className="mt-0.5 transition-all ease-in-out group-hover:-rotate-90"
                    color="#ed642b"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* ------- */}
        <div className="md:border-l-2 md:px-10 border-gray-300">
          <h2 className=" font-medium text-[#063b69]">Available Nile Token</h2>
          <h2 className="text-green-700 text-3xl font-bold mt-1">
            $<span>1000.00</span>
          </h2>
        </div>
        {/* --------- */}
      </div>

      {/* Transaction Details */}
      <div className="pt-12 pb-5 overflow-hidden overflow-x-auto">
        <TransactionDetails />
      </div>
    </div>
  );
};

export default WalletDetails;
