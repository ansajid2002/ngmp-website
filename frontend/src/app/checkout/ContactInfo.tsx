"use client"
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { AdminUrl } from "../layout";
import Link from "next/link";
import SignIn from "../auth/signIn/page";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
  const { push } = useRouter()
  const customerData = useAppSelector((state) => state.customerData)

  const { given_name, family_name, email, picture, google_id }: any = customerData?.customerData || {}
  let profile_pic = ''
  if (picture) {
    if (google_id && google_id.trim() != "") {
      profile_pic = picture
    } else {
      profile_pic = `${AdminUrl}/uploads/customerProfileImages/${picture}`
    }
  } else {
    profile_pic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAMFBMVEWzs7P////MzMywsLCsrKz09PS5ubn5+fne3t7CwsLt7e3p6enb29vw8PC/v7/X19fgW9LbAAABlElEQVRoge2Y6Y6DMAyEcQw5OMr7v22BdlW14AnFjlbazfxGH8ZDfKRpqqqqqn5VzOXY3rlU6gXsaNE0+7YE39NDQ7KncxuedJputnhuU6SXomVu2AV6l1lu2E+009jasN0evRprEbvANqFzEtiLrXr6p5WGrvIss6lTmsogcKKbDn5DbBpVeYFZIep18AjhQcPOwakkvGjk/xY+QnhXFF7yECnhA4ZrKhd3kK1yVGxCL82XE5M7/KTpRpl/RRd5I/fPH/nL7Lyhk+J3yTqqatFtD9nK0cVDuAqdOf9OOxUBT3WVZYPLw4XBDiAe02gyRAtDlwVamnPVbj7pR4kxmf03+n5tCWYb10F1VBSsT/jO0sFm3WqOy5eRnUv1OtgULU7Qxj7uRxZrLntpunDK+xFuPejRU7p+BcDMDvcK6tbrl+8/gNnnyA+FYU7+ixcsj6aYa83vXxDdqQytIeMBUdCQcuHn04ziT/jc5kcsqB6VHLiLnxEolniOOCMwsFd4hf8ZeAAFwKkFaherJbOrqqqqjHQH7BMP7RUmI8IAAAAASUVORK5CYII='
  }

  const renderAccount = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <Image width={50} height={50} src={profile_pic} alt={`${given_name}`} className="rounded-full" />
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-gray-700 dark:text-gray-300 flex ">
              <span className="uppercase tracking-tight">You're Login with</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-green-500 dark:text-gray-100 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{given_name} {family_name}</span>,
              <span className="ml-3 tracking-tighter">{email}</span>
            </div>
          </div>

        </div>

      </div>
    );
  };

  const NoAccount = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 space-y-4 sm:space-y-0">
          <div className="sm:mr-8">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Access Your Account
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              To explore personalized features, please log in to your account.
            </p>
          </div>
        </div>
        <SignIn showImage={false} />
      </div>
    );
  };

  return (
    customerData?.customerData ?
      renderAccount() : NoAccount())
};

export default ContactInfo;
