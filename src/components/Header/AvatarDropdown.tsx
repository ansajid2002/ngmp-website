"use client";
import { Popover, Transition } from "@/app/headlessui";
import { avatarImgs } from "@/contains/fakeData";
import { Fragment, useEffect, useState } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode/SwitchDarkMode2";
import Link from "next/link";
import { AdminUrl, HomeUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BellDot,
  Container,
  Heart,
  History,
  Info,
  Lock,
  LogOut,
  MapPin,
  MousePointerSquare,
  MessageCircle,
  Star,
  Store,
  User,
  Wallet,
  StarIcon,
} from "lucide-react";
import { formatCurrency } from "../AvailableToken";
import { useTranslation } from "react-i18next";
import { Form, Input, Modal } from "antd";
import axios from "axios";
import Swal from "sweetalert2";


export default function AvatarDropdown() {
  const customerData = useAppSelector((state) => state.customerData);
  const [modalvisible, setModalVisible] = useState(false)
  const [loader, setLoader] = useState(false)
  const [profileImage, setImage] = useState('/avatarplaceholder.png');
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const {
    given_name = "",
    family_name = "",
    state = "",
    country = "",
    picture = "",
    google_id,
    customer_id,
    email
  } = customerData?.customerData || {};

  // heello 

  const { walletTotal } = useAppSelector((store) => store.wallet);



  useEffect(() => {

    if (picture) {
      if (google_id && google_id.trim() !== "" || !picture.startsWith("https")) {
        setImage(`${AdminUrl}/uploads/customerProfileImages/${picture}`);
      } else {
        setImage(picture);
      }
    } else {
      setImage("/avatarplaceholder.png");
    }
  }, [customerData, picture, google_id]);

  const redirectToLogin = (path: string) => {
    if (customerData?.customerData) {
      return path
    } else {
      return '/auth/signIn'
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Check if the values are numeric
      if (!/^\d+$/.test(values.previousPin) || !/^\d+$/.test(values.newPin)) {
        console.log('Please enter numeric values for the PIN.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter numeric values for the PIN.',
        });
        return; // Exit function if values are not numeric
      }

      setLoader(true)
      // Assuming you have an API endpoint to update the PIN
      const response = await axios.post(`/api/Customers/updateCustomerPin`, {
        previousPin: values.previousPin,
        newPin: values.newPin,
        customer_id
      });

      // console.log('Backend response:', response.data);

      // Show Swal message based on response
      if (response?.data?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
        });
        setModalVisible(false)
        form.resetFields()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.error || 'Something went wrong!',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoader(false)
    }
  }

  const validateConfirmPin = (_, value) => {
    if (value && value !== form.getFieldValue('newPin')) {
      return Promise.reject(new Error('The two pins that you entered do not match!'));
    }
    return Promise.resolve();
  };


  return (
    <div className="AvatarDropdown">

      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className=" bg-gray-100 rounded-full transition-all lg:px-4 lg:py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none flex  gap-2">
              <Image
                src={profileImage}
                alt={given_name}
                width={30}
                height={30}
                className="rounded-full"
              />

              <div className="right-2tCoT hidden lg:flex justify-start flex-col">
                <div className="">
                  <div className="text-xs textColor-3r-He line-clamp-1">
                    <p className="line-clamp-1 mb-0.5">
                      {given_name ? `${given_name}` : "Sign In "}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold">
                  <p className=" line-clamp-1">Account</p>
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 trangray-y-1"
              enterTo="opacity-100 trangray-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 trangray-y-0"
              leaveTo="opacity-0 trangray-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">

                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-5 bg-white dark:bg-neutral-800 py-7 px-6">
                    {
                      customerData?.customerData && <>
                        <div className="flex items-center space-x-3">
                          <Avatar imgUrl={profileImage} sizeClass="w-12 h-12" />

                          <div className="flex-grow">
                            <h4 className="font-semibold">{`${given_name} ${family_name}`}</h4>
                            <p className="text-xs mt-0.5">{`${state && state?.trim() !== "" ? state + "," : ""
                              } ${country && country?.trim() !== "" ? country : email
                              }`}</p>
                          </div>
                        </div>

                        <div className="w-full border-b gap-5 border-neutral-200 dark:border-neutral-700" />
                      </>
                    }


                    {/* ------------------ 1 --------------------- */}
                    <Link
                      href={redirectToLogin("/account")}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("My Account")}
                        </p>
                      </div>
                    </Link>

                    <Link
                      href={redirectToLogin("/wallet")}

                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Wallet size={20} className="text-green-700" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-bold text-green-700">{t("Wallet")} {formatCurrency(walletTotal)}</p>
                      </div>
                    </Link>

                    {
                      customerData?.customerData && <div
                        className="flex items-center cursor-pointer p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => {
                          setModalVisible(true)
                          close()
                        }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <Lock size={20} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">
                            {t("Update Nile Pin")}
                          </p>
                        </div>
                      </div>
                    }

                    <Link
                      href={redirectToLogin("/ChatwithSeller")}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        {/* <History size={20} /> */}
                        <MessageCircle size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("Inbox")}
                        </p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      href={redirectToLogin("/account-order")}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Container size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{t("My Order")}</p>
                      </div>
                    </Link>

                    {/* <Link
                      href={(redirectToLogin("/my-reviews"))}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Star size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("My Reviews")}
                        </p>
                      </div>
                    </Link> */}



                    <Link
                      href={"/select-district"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        {/* <History size={20} /> */}
                        <MousePointerSquare size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("Select District")}
                        </p>
                      </div>
                    </Link>

                    <Link
                      href={(redirectToLogin("/producthistory"))}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <StarIcon  size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("Recently Viewed")}
                        </p>
                      </div>
                    </Link>

                    {/* <Link
                      href={(redirectToLogin("/notifications"))}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <BellDot size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">
                          {t("Notifications")}
                        </p>
                      </div>
                    </Link> */}

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      href={(redirectToLogin("/account-savelists"))}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Heart size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{t("Wishlist")}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    <Link
                      href={"/SupportCenter?querys=BuyingOnNile"}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Info size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium ">{t("FAQs")}</p>
                      </div>
                    </Link>

                    {/* ------------------ 2 --------------------- */}
                    {
                      customerData?.customerData && <Link
                        href={"/api/auth/signout"}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => close()}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <LogOut size={20} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">
                            <Link href={"/api/auth/signout"}>
                              {t("Log out")}
                            </Link>
                          </p>
                        </div>
                      </Link>
                    }
                  </div>
                </div>

              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <Modal
        visible={modalvisible}
        title="Change PIN"
        okText="Change"
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{ style: { background: 'blue' } }}
        confirmLoading={loader}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="previousPin"
            label="Previous 4-digit PIN"
            rules={[
              { required: true, message: 'Please input your previous 4-digit PIN!' },
              { len: 4, message: 'Please input a 4-digit PIN!' },
            ]}
          >
            <Input.Password maxLength={4} type="number" />
          </Form.Item>
          <Form.Item
            name="newPin"
            label="New 4-digit PIN"
            rules={[
              { required: true, message: 'Please input your new 4-digit PIN!' },
              { len: 4, message: 'Please input a 4-digit PIN!' },
            ]}
          >
            <Input.Password maxLength={4} type="number" />
          </Form.Item>
          <Form.Item
            name="confirmPin"
            label="Confirm New PIN"
            dependencies={['newPin']}
            rules={[
              { required: true, message: 'Please confirm your new 4-digit PIN!' },
              { validator: validateConfirmPin },
            ]}
          >
            <Input.Password maxLength={4} type="number" />
          </Form.Item>
        </Form>
      </Modal>


      {/* <>
          <Link href={"/auth/signIn"}>
            <div className="rounded-full mr-1 lg:px-4 lg:py-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transform hover:scale-105 focus:outline-none flex items-center gap-2 cursor-pointer transition-transform duration-100">
              <svg
                className="iconSvg-8qsph iconFill-2q3yE"
                alt=""
                aria-label=""
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 1024 1024"
                width="30"
                height="30"
                role="img"
                fill="#222222"
              >
                <path d="M701.6 592.6c83.8 0 151.7 67.9 151.7 151.7l0 100.5c0 28.3-22.9 51.2-51.2 51.2l-580.2 0c-28.3 0-51.2-22.9-51.2-51.2l0-100.5c0-83.8 67.9-151.7 151.7-151.7l379.2 0z m0 76.8l-379.2 0c-41.4 0-74.9 33.5-74.9 74.9l0 74.9 529 0 0-74.9c0-39.3-30.3-71.5-68.7-74.7l-6.2-0.2z m-189.6-494.5c94.5 0 171.1 76.6 171.1 171.2 0 94.5-76.6 171.1-171.1 171.1-94.5 0-171.1-76.6-171.1-171.1 0-94.5 76.6-171.1 171.1-171.2z m0 76.8c-52.1 0-94.3 42.2-94.3 94.4 0 52.1 42.2 94.3 94.3 94.3 52.1 0 94.3-42.2 94.3-94.3 0-52.1-42.2-94.3-94.3-94.4z"></path>
              </svg>
              <div className="right-2tCoT rightCls-2Z7m_ rightClsUnlogin-3WvPu hidden lg:flex flex-col justify-start line-clamp-1">
                <div className="helloWrap-24eF8">
                  <div className="hello-7Ci9B textColor-3r-He ">
                    <p className="line-clamp-1">Sign in / Register</p>
                  </div>
                </div>
                <div className="title-1fzdZ textColor-3r-He titleCls-2B1Yu line-clamp-1">
                  <p className="line-clamp-1">Orders &amp; Account</p>
                </div>
              </div>
            </div>
          </Link>
        </>
      )} */}
    </div>
  );
}
