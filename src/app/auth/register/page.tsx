"use client";
import React, { useState } from "react";
import { Input, Button, Form, Modal, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { GoogleOutlined } from "@ant-design/icons";
import { ArrowRight, LockKeyhole } from "lucide-react";
import logo from "@/images/mainlogo.svg";
import Image from "next/image";
import { HomeUrl } from "@/app/layout";

const Register = ({ showImage = true }) => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setisLoadingOtp] = useState(false);
  const [CustomerId, setCustomerId] = useState(null);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [form] = Form.useForm(); // Create a form instance
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    setLoading(true);

    const userData = {
      given_name: values.firstname,
      family_name: values.lastname,
      email: values.email,
      countryCode: values.countryCode,
      phone_number: `${values.countryCode} ${values.mobile}`,
      password: values.password,
    };

    try {
      const response = await fetch(`/api/Customers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!data.success) {
        Swal.fire({
          title: "Error!",
          text: data?.message,
          icon: "error",
        });
      } else {
        // Show OTP modal on success

        setCustomerId(data?.insertedId);
        setisLoadingOtp(false);
        setOtpModalVisible(true);
      }
    } catch (error) {
      console.error("Error Registering up:", error);
      // Handle the error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values: any) => {
    // Once OTP is verified, you can close the modal
    setisLoadingOtp(true);
    try {
      const response = await fetch(`/api/Customers/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CustomerId, verificationCode: values?.otp }),
      });

      const data = await response.json();

      if (data?.status === 200) {
        Swal.fire({
          title: "Sucess!",
          text: data?.message,
          icon: "success",
        });
        setCustomerId(null);
        setOtpModalVisible(false);
        router.push("/auth/signIn");
        form.resetFields();
      } else {
        Swal.fire({
          title: "Error!",
          text: data?.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoadingOtp(false);
    }
    // setOtpModalVisible(false);
  };

  const handleOtpCancel = () => {
    // Handle canceling OTP entry (e.g., user closes the modal)
    setOtpModalVisible(false);
  };

  return (
    <>
      <section className="">
        <div className={`grid grid-cols-1 ${showImage && "lg:grid-cols-2"}`}>
          <div className="flex items-center justify-center overflow-y-auto py-10">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <Link href={`${HomeUrl}`}>
                <Image
                  src={logo}
                  alt="website main logo"
                  className="mx-auto w-44"
                />
              </Link>
              <h2 className="text-3xl font-bold leading-tight text-[#063b69] ">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  href={"/auth/signIn"}
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <Form
                form={form}
                name="register"
                onFinish={handleSubmit}
                scrollToFirstError
                initialValues={{
                  countryCode: "", // Set your default country code here
                }}
                className=" flex flex-col mt-5"
              >
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  First Name
                </label>
                <Form.Item
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="First Name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Item>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Last Name
                </label>
                <Form.Item
                  name="lastname"
                  rules={[
                    { required: true, message: "Please enter your last name!" },
                  ]}
                >
                  <Input
                    placeholder="Last Name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Item>

                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Contact Number
                </label>
                <div className="flex gap-2">
                  <Form.Item
                    name="countryCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your country code!",
                      },
                      {
                        pattern: /^\+\d{1,}$/,
                        message: "Invalid country code",
                      },
                    ]}
                    style={{ width: "20%" }}
                  >
                    <Input
                      placeholder="+91"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </Form.Item>

                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number!",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Invalid phone number!",
                      },
                    ]}
                    style={{ width: "80%" }}
                  >
                    <Input
                      placeholder="Mobile Number"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </Form.Item>
                </div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Invalid email address!" },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Item>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Item>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Passwords do not match!");
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </Form.Item>
                <h2 className="text-sm -mt-3">
                  By Signing up, you agree to our{" "}
                  <Link
                    className="text-[#ed642b]"
                    href={"/company/terms-conditions"}
                  >
                    Terms of Use
                  </Link>
                  .
                </h2>
                <Form.Item className=" w-full">
                  <Button
                    type="default"
                    htmlType="submit"
                    className={`inline-flex w-full items-center justify-center rounded-md bg-[#063b69] mt-3 px-3.5 py-5 font-semibold leading-7 text-white hover:bg-black/80 ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-500"
                    }`}
                    loading={loading}
                  >
                    {loading ? "Creating Account" : "Create Account"}
                  </Button>
                </Form.Item>
              </Form>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-[#2563EB]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </span>
                  Sign up with Facebook
                </button>
              </div>
              <Modal
                title="Enter 4-Digit OTP"
                open={otpModalVisible}
                onOk={handleOtpSubmit}
                onCancel={handleOtpCancel}
                footer={null}
              >
                <Form form={form} name="otp" onFinish={handleOtpSubmit}>
                  <Form.Item
                    name="otp"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the 4-digit OTP!",
                      },
                      { pattern: /^[0-9]{4}$/, message: "Invalid OTP format!" },
                    ]}
                  >
                    <Input placeholder="Enter OTP" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="default"
                      loading={otpLoading}
                      htmlType="submit"
                    >
                      Submit OTP
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
          <div>
            {showImage && (
              <div className="h-[100vh] top-0 w-full sticky">
                <img
                  className="mx-auto h-full w-full object-cover"
                  src="https://images.pexels.com/photos/5632407/pexels-photo-5632407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
