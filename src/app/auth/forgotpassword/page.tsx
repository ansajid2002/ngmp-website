"use client";
import { HomeUrl } from "@/app/layout";
import logo from "@/images/mainlogo.svg";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Form, Input, Modal, message } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassword = ({ showImage = true }) => {
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const [form] = Form.useForm();
  const router = useRouter()
  
  const onFinish = async () => {
    setLoader(true)
    try {
      // Send a request to the backend with only email and new password
      const response = await axios.post('/api/Customers/sendOtptoUpdatePassword', {
        email, // assuming email is present in customerData
      });

      // Handle the backend response
      console.log('Backend Response:', response.data);

      // Show the OTP modal
      setIsModalVisible(true);
      setLoader(false)

      message.success('Otp sended... Kindly verify its you');
    } catch (error: any) {
      console.error('Error updating password:', error.response?.data || error.message);
      message.error('Failed to update password. Please try again.');
    }
  };

  const handleOk = async () => {
    // Place your OTP validation logic here
    // If OTP is valid, close the modal
    form.submit()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOtpSubmit = async (values: any) => {
    console.log(values);
    if (/^\d{4}$/.test(values.otp)) {
      // OTP is valid, proceed with sending it to the backend
      setLoader(true)

      try {
        const response = await fetch(`/api/Customers/ForgotPasswordOtpVerify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: values.otp, // Send the OTP to the backend
            email: email
          }),
        });

        if (response.ok) {
          const dataBackend = await response.json()
          message.success("Otp Verfied, Now Updating your Password, Hold tight.")
          const requestBody = {
            password: values.newPassword,
            customer_id: dataBackend?.customer_id
          };
          // navigation.navigate('ChangePassword', data?.customer_id)
          const responseUpdate = await fetch(`/api/Customers/UpdateCustomerPassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (responseUpdate.status === 200) {
            // Password reset request was successful, show a popup to input OTP
            message.success("Password Updated Successfully...")
            router.push("/auth/signIn")
            setLoader(false)
            setIsModalVisible(false);
          } else {
            const data = await response.json();
            alert(data.message);
          }
        } else {
          // Request failed, handle the error
          throw new Error('Failed to verify OTP. Please try again.');
        }
      } catch (error) {
        // Handle any exceptions or network errors
        alert(error.message);
      }
    } else {
      // OTP is not a 4-digit number, show an error message
      alert('Please enter a 4-digit OTP code.');
    }


  }

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="w-1/2 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <Link href={`${HomeUrl}`}>
          <Image
            src={logo}
            alt="website main logo"
            className="mx-auto w-44 mb-2"
          />
        </Link>
        <h2 className="text-3xl mt-5 font-bold leading-tight text-[#063b69]">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Remembered? Go back to
          <Link
            href={"/auth/signIn"}
            title=""
            className="ml-1 font-semibold text-black transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            Registered Email address
          </label>
          <div className="mt-2 mb-3">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Registered Email id"
              value={email}
            ></input>
          </div>
          <div>
            <ButtonPrimary
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              onClick={onFinish}
              loading={!isModalVisible && loader}

            >
              Reset <ArrowRight className="ml-2" size={16} />
            </ButtonPrimary>
          </div>
        </div>
      </div>
      {showImage && (
        <div className="h-full w-1/2">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.pexels.com/photos/5632407/pexels-photo-5632407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      )}

      <Modal
        title="Enter OTP and New Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: loader, style: { background: 'blue' } }}
      >
        {/* OTP input field */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOtpSubmit}
        >
          <Form.Item
            label="Enter OTP"
            name="otp"
            rules={[
              { required: true, message: 'Please enter the OTP' },
              { len: 4, message: 'OTP must be 4 characters long' },
              { pattern: /^\d+$/, message: 'OTP must contain only numbers' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* New Password input field */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please enter a new password',
              },
              {
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  'New password must contain at least 1 digit, 1 special character, and be at least 8 characters long',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Confirm Password input field */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default ForgotPassword;
