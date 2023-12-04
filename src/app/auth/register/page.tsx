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

const Register = () => {
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Heading title="Register" />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-md mb-20">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            scrollToFirstError
            initialValues={{
              countryCode: "", // Set your default country code here
            }}
            className="gap-3 flex flex-col"
          >
            <Form.Item
              name="firstname"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>

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
                <Input prefix={<FlagOutlined />} placeholder="+91" />
              </Form.Item>

              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                  { pattern: /^[0-9]{10}$/, message: "Invalid phone number!" },
                ]}
                style={{ width: "80%" }}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Mobile Number" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email address!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
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
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item className="flex justify-center w-full">
              <Button
                type="default"
                htmlType="submit"
                className={`w-full flex justify-center items-center bg-indigo-600 text-white py-2 rounded-md ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-500"
                }`}
                loading={loading}
              >
                {loading ? "Creating Account" : "Sign up"}
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/auth/signIn"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>

          <Divider orientation="center">Or</Divider>
          <div className="flex justify-center py-4">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center bg-white border border-gray-300 p-2 rounded-md hover:border-gray-400 focus:outline-none focus:ring gap-1 focus:border-blue-300"
            >
              {/* Google Logo SVG */}
              <GoogleOutlined color="red" />
              <p className="text-sm">Sign in with Google</p>
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="Enter 4-Digit OTP"
        visible={otpModalVisible}
        onOk={handleOtpSubmit}
        onCancel={handleOtpCancel}
        footer={null}
      >
        <Form form={form} name="otp" onFinish={handleOtpSubmit}>
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please enter the 4-digit OTP!" },
              { pattern: /^[0-9]{4}$/, message: "Invalid OTP format!" },
            ]}
          >
            <Input placeholder="Enter OTP" />
          </Form.Item>

          <Form.Item>
            <Button type="default" loading={otpLoading} htmlType="submit">
              Submit OTP
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
