"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Modal } from 'antd';
import axios from 'axios';
import { useAppSelector } from '@/redux/store';
import { updateCustomerData } from '@/redux/slices/customerData';
import { useDispatch } from 'react-redux';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';

const AccountPass = () => {
  const { customerData } = useAppSelector((state) => state.customerData);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otpValue, setOtpValue] = useState(''); // State to store OTP value
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  // Check if google_id or facebook_id exists
  const isSocialMediaLogin = customerData?.google_id || customerData?.facebook_id;

  if (isSocialMediaLogin) {
    return (
      <div className="space-y-6">
        <p className="text-lg text-gray-600">
          You have logged in using social media. Password update is not required.
        </p>
      </div>
    );
  }

  const onFinish = async (values: any) => {
    setLoader(true)
    if (customerData) {
      try {
        // Send a request to the backend with only email and new password
        const response = await axios.post('/api/Customers/sendOtptoUpdatePassword', {
          email: customerData?.email, // assuming email is present in customerData
        });

        // Handle the backend response
        console.log('Backend Response:', response.data);

        setPassword(values.password)
        // Show the OTP modal
        setIsModalVisible(true);
        setLoader(false)

        message.success('Otp sended... Kindly verify its you');
      } catch (error: any) {
        console.error('Error updating password:', error.response?.data || error.message);
        message.error('Failed to update password. Please try again.');
      }
    }
  };

  const handleOk = async () => {
    // Place your OTP validation logic here
    // If OTP is valid, close the modal
    if (/^\d{4}$/.test(otpValue)) {
      // OTP is valid, proceed with sending it to the backend
      setLoader(true)

      try {
        const response = await fetch(`/api/Customers/ForgotPasswordOtpVerify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: otpValue, // Send the OTP to the backend
            email: customerData?.email
          }),
        });

        if (response.ok) {
          message.success("Otp Verfied, Now Updating your Password, Hold tight.")
          const requestBody = {
            password,
            customer_id: customerData?.customer_id
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
            form.resetFields()
            message.success("Password Updated Successfully...")
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
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOtpChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric values and limit length to 4 characters
    const sanitizedInput = inputValue.replace(/[^0-9]/g, '').slice(0, 4);

    setOtpValue(sanitizedInput);
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Update your password</h2>
      <div className="max-w-xl space-y-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          {/* Remove the "Current Password" field */}
          <Form.Item
            label="New password"
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
            <Input.Password disabled={loader} />
          </Form.Item>
          <Form.Item
            label="Confirm password"
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
            <Input.Password disabled={loader} />
          </Form.Item>
          <Form.Item>
            <ButtonPrimary htmlType="submit" className="mt-4" loading={!isModalVisible && loader}>
              Update Password
            </ButtonPrimary>
          </Form.Item>
        </Form>

        {/* OTP Modal */}
        <Modal
          title="Enter OTP"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ loading: loader, style: { background: 'blue' } }}
        >
          {/* Add your OTP input field and validation logic here */}
          <Input placeholder="Enter OTP" onChange={handleOtpChange}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AccountPass;