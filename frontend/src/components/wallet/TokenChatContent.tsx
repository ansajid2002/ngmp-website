import { Modal } from "antd";
import { Check, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function TokenChatContent() {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const styling = {
    // backgroundImage: `url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')`,
    // backgroundAttachment: "fixed",
  };

  const data = [
    {
      paymento: "Ansari Afroz Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 2000,
      isSender: true,
      status: "completed",
    },
    {
      paymento: "Ansari Arfat Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 3000,
      isSender: false,
      status: "completed",
    },
    {
      paymento: "Ansari Shadab Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 4000,
      isSender: true,
      status: "completed",
    },
    {
      paymento: "Ansari Sajid Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 5000,
      isSender: false,
      status: "completed",
    },
    {
      paymento: "Ansari Ahmed Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 6000,
      isSender: true,
      status: "completed",
    },
    {
      paymento: "Ansari Razi Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 7000,
      isSender: false,
      status: "completed",
    },
    {
      paymento: "Ansari Shadab Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 4000,
      isSender: true,
      status: "completed",
    },
    {
      paymento: "Ansari Sajid Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 5000,
      isSender: false,
      status: "completed",
    },
    {
      paymento: "Ansari Ahmed Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 6000,
      isSender: true,
      status: "completed",
    },
    {
      paymento: "Ansari Razi Ahmed",
      email: "ansariafrozahmed@gmail.com",
      amount: 7000,
      isSender: false,
      status: "completed",
    },
  ];

  const showDetailModal = () => {
    setIsDetailsModalOpen(true);
  };
  const handleDetailOk = () => {
    setIsDetailsModalOpen(false);
  };
  const handleDetailCancel = () => {
    setIsDetailsModalOpen(false);
  };
  const handleTransactionDetails = (item) => {
    // console.log(item);
    setTransactionDetails(item);
    console.log(transactionDetails, "000000");
  };
  return (
    <div style={styling} className="p-2">
      {data.map((item: any, index: any) => (
        <div
          className={`flex items-center cursor-pointer py-2 ${
            item.isSender ? "justify-end" : "justify-start"
          }`}
          onClick={() => {
            showDetailModal();
            handleTransactionDetails(item);
          }}
        >
          <div
            className={`border border-white shadow-md bg-white w-52 p-3 rounded-t-2xl ${
              item.isSender ? "rounded-l-2xl" : "rounded-r-2xl"
            }`}
          >
            <h2 className="line-clamp-1 text-xs lg:text-sm">
              {item.isSender ? " Paid to" : "Received From"} {item.paymento}
            </h2>
            <h3 className="text-lg lg:text-xl font-semibold">${item.amount}</h3>
            <div className="flex text-xs items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="flex gap-[0.1rem] items-center">
                  <Check
                    size={12}
                    className="mt-1"
                    strokeWidth={3}
                    color="green"
                  />
                  {/* <ShieldCheck size={20} strokeWidth={3} /> */}
                  {item.isSender ? "Paid" : "Received"}
                </h2>
                <h2>2:47 PM</h2>
              </div>
              <ChevronRight size={15} />
            </div>
          </div>
        </div>
      ))}
      <Modal
        title="Transaction Details"
        className="text-center"
        open={isDetailsModalOpen}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
        footer={false}
      >
        <div className="pt-5 flex flex-col gap-2 items-center justify-center">
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <Image
              className="h-full w-full object-cover"
              src={"/avatarplaceholder.png"}
              width={100}
              height={100}
              alt="User Profile image"
            />
          </div>
          <div className="text-center space-y-2">
            <div>
              <h2 className="text-xl font-medium">
                To <span>{transactionDetails?.paymento}</span>
              </h2>
              <h2 className="text-gray-800 text-sm">
                {transactionDetails?.email}
              </h2>
            </div>
            <h3 className="text-4xl font-bold text-center text-green-700">
              $1000
            </h3>
            <h3 className="font-medium flex items-center justify-center gap-1 ">
              <CheckCircle2 size={15} color="green" />
              {transactionDetails?.status}
            </h3>
            <hr />
            <h3 className="font-medium">
              Dec 03, 2023 <span>4:02 PM</span>
            </h3>
          </div>
          <div className="space-y-4 text-left py-5 px-10 border rounded-xl">
            <div className="leading-tight">
              <h2 className="text-[0.95rem] font-medium">
                To : Ansari Afroz Ahmed
              </h2>
              <h2 className="text-[0.8rem] ">ansariafrozahmed@gmail.com</h2>
            </div>
            <div className="leading-tight">
              <h2 className="text-[0.95rem] font-medium">
                FROM : Ansari Shadab Ahmed
              </h2>
              <h2 className="text-[0.8rem]">ansariafrozahmed@gmaail.com</h2>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
