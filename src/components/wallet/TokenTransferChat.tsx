import Image from "next/image";
import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  ArrowRightLeft,
  Check,
  ChevronRight,
  DollarSign,
  ShieldCheck,
  StepForward,
} from "lucide-react";
import { Modal } from "antd";
import { AdminUrl } from "@/app/layout";
import TokenChatContent from "./TokenChatContent";

//   const [transactionDetails, setTransactionDetails] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const styling = {
//     // backgroundImage: `url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')`,
//     // backgroundAttachment: "fixed",
//   };

//   const data = [
//     {
//       paymento: "Ansari Afroz Ahmed",
//       amount: 2000,
//       isSender: true,
//     },
//     {
//       paymento: "Ansari Arfat Ahmed",
//       amount: 3000,
//       isSender: false,
//     },
//     {
//       paymento: "Ansari Shadab Ahmed",
//       amount: 4000,
//       isSender: true,
//     },
//     {
//       paymento: "Ansari Sajid Ahmed",
//       amount: 5000,
//       isSender: false,
//     },
//     {
//       paymento: "Ansari Ahmed Ahmed",
//       amount: 6000,
//       isSender: true,
//     },
//     {
//       paymento: "Ansari Razi Ahmed",
//       amount: 7000,
//       isSender: false,
//     },
//     {
//       paymento: "Ansari Shadab Ahmed",
//       amount: 4000,
//       isSender: true,
//     },
//     {
//       paymento: "Ansari Sajid Ahmed",
//       amount: 5000,
//       isSender: false,
//     },
//     {
//       paymento: "Ansari Ahmed Ahmed",
//       amount: 6000,
//       isSender: true,
//     },
//     {
//       paymento: "Ansari Razi Ahmed",
//       amount: 7000,
//       isSender: false,
//     },
//   ];

//   const showDetailModal = () => {
//     setIsDetailsModalOpen(true);
//   };
//   const handleDetailOk = () => {
//     setIsDetailsModalOpen(false);
//   };
//   const handleDetailCancel = () => {
//     setIsDetailsModalOpen(false);
//   };
//   const handleTransactionDetails = (item) => {
//     // console.log(item);
//     setTransactionDetails(item);
//     console.log(transactionDetails, "000000");
//   };
//   return (
//     <div style={styling} className="p-2">
//       {data.map((item: any, index: any) => (
//         <div
//           className={`flex items-center cursor-pointer py-2 ${
//             item.isSender ? "justify-end" : "justify-start"
//           }`}
//           onClick={() => {
//             showDetailModal();
//             handleTransactionDetails(item);
//           }}
//         >
//           <div
//             className={`border border-white shadow-md bg-white w-52 p-3 rounded-t-2xl ${
//               item.isSender ? "rounded-l-2xl" : "rounded-r-2xl"
//             }`}
//           >
//             <h2 className="line-clamp-1 text-xs lg:text-sm">
//               Payment to {item.paymento}
//             </h2>
//             <h3 className="text-lg lg:text-xl font-semibold">${item.amount}</h3>
//             <div className="flex text-xs items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <h2 className="flex items-center">
//                   <Check size={15} strokeWidth={3} color="green" />
//                   {/* <ShieldCheck size={20} strokeWidth={3} /> */}
//                   Paid
//                 </h2>
//                 <h2>2:47 PM</h2>
//               </div>
//               <ChevronRight size={15} />
//             </div>
//           </div>
//         </div>
//       ))}
//       <Modal
//         title="Transaction Details"
//         open={isDetailsModalOpen}
//         onOk={handleDetailOk}
//         onCancel={handleDetailCancel}
//         footer={false}
//       >
//         <h2>{transactionDetails?.paymento}</h2>
//       </Modal>
//     </div>
//   );
// };

const TokenTransferChat = ({ customerData }) => {
  console.log(customerData, "99999999999999999999999999");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
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
    <>
      {customerData ? (
        <div className="lg:w-[55%] transition-all ease-in-out border rounded-t-xl shadow-md">
          <div>
            <div className="w-full h-full border-b-2 flex items-center gap-4 justify-between px-3 py-2">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="h-7 lg:h-9 w-7 lg:w-9 overflow-hidden rounded-full">
                  <Image
                    className="h-full w-full object-cover"
                    src={
                      (customerData &&
                        customerData.picture &&
                        `${AdminUrl}/uploads/customerProfileImages/${customerData.picture}`) ||
                      "/avatarplaceholder.png"
                    }
                    width={100}
                    height={100}
                    alt="User Profile image"
                  />
                </div>
                <div>
                  <h2 className="text-sm lg:text-base line-clamp-1 font-medium">
                    {customerData?.family_name} {customerData?.given_name}
                  </h2>
                </div>
              </div>
              <div>
                <Button
                  variant="gradient"
                  className="flex items-center gap-2"
                  onClick={showModal}
                >
                  pay
                  <ArrowRightLeft size={18} className="-rotate-90" />
                </Button>
                <Modal
                  // title="Transfer Nile Token To Other Nile User"s
                  open={isModalOpen}
                  footer={false}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div className="pt-5 flex flex-col gap-2 items-center justify-center">
                    <div className="h-7 lg:h-14 w-7 lg:w-14 overflow-hidden rounded-full">
                      <Image
                        className="h-full w-full object-cover"
                        src={
                          (customerData &&
                            customerData.picture &&
                            `${AdminUrl}/uploads/customerProfileImages/${customerData.picture}`) ||
                          "/avatarplaceholder.png"
                        }
                        width={100}
                        height={100}
                        alt="User Profile image"
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="text-lg font-medium">
                        Paying{" "}
                        <span>
                          {customerData?.family_name} {customerData?.given_name}
                        </span>
                      </h2>
                      <h2 className="text-gray-800">{customerData?.email}</h2>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* <div className="text-2xl">$</div> */}
                      <div className=" flex items-center justify-center">
                        {/* <Input
                  type="number"
                  variant="static"
                  placeholder="0"
                  className="border-none focus:ring-0 p-2 text-center"
                /> */}
                        <input
                          type="number"
                          name="number"
                          className=" text-center scrollbar-hidden focus:ring-0 text-[#063b69] font-semibold text-3xl w-48 border-none rounded-xl"
                          placeholder="$0"
                          id=""
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg">
                      <Input
                        size="md"
                        label="Add a note"
                        className="rounded-lg focus:ring-0 text-center"
                      />
                    </div>
                    <div>
                      <Button
                        variant="gradient"
                        className="flex items-center gap-2"
                      >
                        pay
                        <ArrowRightLeft size={18} className="-rotate-90" />
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            {/* ------------------- */}
            <div className="h-[50vh] bg-gray-200 w-full overflow-hidden overflow-y-scroll">
              <TokenChatContent />
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:w-[55%] py-10 px-5 flex items-center">
          <ul className="space-y-5">
            <li className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-[#063b69]">01</span>
              <h2 className="text-2xl font-medium text-gray-800 capitalize">
                Search Nile Token user.
              </h2>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-[#063b69]">02</span>
              <h2 className="text-2xl font-medium text-gray-800 capitalize">
                Select the user.
              </h2>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-[#063b69]">03</span>
              <h2 className="text-2xl font-medium text-gray-800 capitalize">
                Token transaction pop Up will appear.
              </h2>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-4xl font-bold text-[#063b69]">04</span>
              <h2 className="text-2xl font-medium text-gray-800 capitalize">
                Enjoy Nile Token Sharing.
              </h2>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TokenTransferChat;
