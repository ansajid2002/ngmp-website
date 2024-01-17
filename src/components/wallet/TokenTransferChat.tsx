import Image from "next/image";
import React, { useState } from "react";
// import { Button, Input } from "@material-tailwind/react";
import {
  ArrowRight,
  ArrowRightLeft,
} from "lucide-react";
import { Button, Modal } from "antd";
import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getwalletTotal } from "@/redux/slices/walletSlice";
import { useRouter } from 'next/navigation'

const TokenTransferChat = ({ singleUser, walletTotal }: any) => {
  const { customerData } = useAppSelector((state) => state.customerData);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(null);
  const [error, setError] = React.useState('');
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const router = useRouter()

  const dispatch = useDispatch()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAmountChange = (text: any) => {
    const textValue = text.target.value

    // Remove leading zeros
    const sanitizedText = textValue.replace(/^0+/, '');

    const enteredAmount = parseFloat(sanitizedText);

    if (isNaN(enteredAmount) || enteredAmount > walletTotal || enteredAmount <= 0) {
      setError(`Amount exceeds wallet total or is not valid. Your Wallet Balance: ${walletTotal}`);
    } else {
      setError('');
    }

    console.log(error);

    setAmount(sanitizedText);
  };

  const handleSend = async () => {
    if (amount && amount === 0) {
      Swal.fire({
        text: 'Send at least 1 token...',
        icon: 'error'
      })
      return
    }
    if (error.trim() !== '') {

      Swal.fire({
        text: error,
        icon: 'error'
      })
      return
    }
    // Handle sending logic here
    setButtonLoader(true)
    const currentDatetime = new Date().toISOString();

    try {
      const response = await fetch(`/api/Issue-Invoice/transfertofriend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerData: customerData, selectedUser: singleUser, totalAmount: amount, datetime: currentDatetime, // Include the generated datetime
        }),
      });

      if (response.ok) {
        const data = await response.json()
        const { status, message, remaining_balance } = data

        if (status === 200) {
          setIsModalOpen(false)

          router.push('/wallet', { scroll: false })

          Swal.fire({
            icon: 'success',
            title: 'Transaction Successful!',
            text: 'Thank you for your payment. Your transaction was successful.',
          });
          dispatch(getwalletTotal(remaining_balance))
        } else if (status === 401) {
          alert(message);
        }
      }
    } catch (error) {
      console.log(error);
      alert('Something wen wrong, try again in few minutes...');

    } finally {
      setButtonLoader(false)
      setAmount(null)
      setError('')
    }

  };


  return (
    <>
      {singleUser ? (
        <div className="w-full lg:w-[55%] transition-all ease-in-out border rounded-t-xl p-10 ">
          <div className="md:flex justify-between">
            <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
              <h1>Sender</h1>
              <div className="flex justify-center items-center gap-4">
                <div className="h-7 lg:h-9 w-7 lg:w-9 overflow-hidden rounded-full">
                  <Image
                    className="h-full w-full object-cover"
                    src={
                      customerData && customerData?.picture
                        ? customerData?.picture.startsWith('https')
                          ? customerData?.picture // Display direct image
                          : `${AdminUrl}/uploads/customerProfileImages/${customerData?.picture}` // Display image with AdminUrl
                        : "/avatarplaceholder.png"
                    }
                    width={100}
                    height={100}
                    alt="User Profile image"
                  />
                </div>
                <div className="">
                  <p className="text-sm lg:text-base line-clamp-1 font-medium">
                    {customerData?.given_name} {customerData?.family_name}
                  </p>
                  <p className="text-sm lg:text-base line-clamp-1 font-light">
                    {customerData?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center md:rotate-0 rotate-90 p-4">
              <ArrowRight />
            </div>

            <div className="flex flex-col justify-center items-center gap-2 lg:gap-4">
              <h1>Receiver</h1>
              <div className="flex justify-center items-center gap-4">
                <div className="h-7 lg:h-9 w-7 lg:w-9 overflow-hidden rounded-full">
                  <Image
                    className="h-full w-full object-cover"
                    src={
                      singleUser && singleUser.picture
                        ? singleUser.picture.startsWith('https')
                          ? singleUser.picture // Display direct image
                          : `${AdminUrl}/uploads/customerProfileImages/${singleUser.picture}` // Display image with AdminUrl
                        : "/avatarplaceholder.png"
                    }
                    width={100}
                    height={100}
                    alt="User Profile image"
                  />
                </div>
                <div>
                  <p className="text-sm lg:text-base line-clamp-1 font-medium">
                    {singleUser?.given_name} {singleUser?.family_name}
                  </p>
                  <p className="text-sm lg:text-base line-clamp-1 font-light">
                    {singleUser?.email}
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className="flex justify-center items-center mt-10">
            <Button
              type="default"
              className="flex items-center gap-2 border border-blue-600 text-blue-500"
              onClick={showModal}
            >
              PAY
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
                      singleUser && singleUser.picture
                        ? singleUser.picture.startsWith('https')
                          ? singleUser.picture // Display direct image
                          : `${AdminUrl}/uploads/customerProfileImages/${singleUser.picture}` // Display image with AdminUrl
                        : "/avatarplaceholder.png"
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
                      {singleUser?.family_name} {singleUser?.given_name}
                    </span>
                  </h2>
                  <h2 className="text-gray-800">{singleUser?.email}</h2>
                </div>
                <div className="flex items-center gap-1">
                  {/* <div className="text-2xl">$</div> */}
                  <div className=" flex items-center justify-center">
                    <input
                      type="number"
                      name="number"
                      className=" text-center scrollbar-hidden focus:ring-0 text-[#063b69] font-semibold text-3xl w-48 border-none rounded-xl"
                      placeholder="$0"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => handleSend()}
                    loading={buttonLoader}
                  >
                    Send Money
                    <ArrowRightLeft size={18} className="-rotate-90" />
                  </Button>
                </div>
              </div>
            </Modal>
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
