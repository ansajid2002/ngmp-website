"use client";
import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { InputNumber, Modal } from "antd";
import Swal from "sweetalert2";
import { updateCustomerData } from "@/redux/slices/customerData";
import { useDispatch } from "react-redux";

const AccountPage = () => {
  const customerData = useAppSelector((state) => state.customerData);
  const {
    given_name = "",
    family_name = "",
    email = "",
    address_line_1 = '',
    address_line_2 = '',
    city = '',
    state = "",
    zip_code = "",
    country = "",
    picture = "",
    phone_number = "",
    google_id = "",
    bio = '',
    customer_id
  } = customerData?.customerData || {};

  const [loader, setloader] = useState(false);
  const [loading, setOkButtonLoader] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setImage] = useState('/avatarplaceholder.png');

  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    given_name,
    family_name,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
    country,
    picture,
    phone_number,
    bio
  });

  useEffect(() => {
    setUserData({
      given_name,
      family_name,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      country,
      picture,
      phone_number,
      bio
    })
  }, [customerData])

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

  const handleInputChange = (fieldName: any, value: any) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOTPInputChange = (value) => {
    setOtp(value)
  };


  const handleSubmit = async () => {
    setOtp('')
    setloader(true)
    // Validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(userData.email)) {
      setloader(false)

      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(`/api/Customers/Update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          family_name: userData.family_name,
          given_name: userData.given_name,
          customer_id,
        }),
      });

      if (response.ok) {
        // Request was successful
        // Show a success message
        // Open the OTP modal here
        console.log(response);
        setOTPModalVisible(true)
      } else {
        // Request failed
        // Handle the error based on the response status code
        if (response.status === 400) {
          // Handle specific error, such as duplicate email
          alert('Email already registered');
        } else {
          // Handle other errors
          throw new Error('Failed to send OTP. Please try again.');
        }
      }
      setloader(false)

    } catch (error: any) {
      // Handle any exceptions or network errors
      alert(error.message);
    } finally {
      setloader(false)
    }

  }

  const handleVeifyOTP = async () => {
    setOkButtonLoader(true)
    if (/^\d{4}$/.test(otp)) {
      // OTP is valid, proceed with sending it to the backend
      try {
        const response = await fetch(`/api/Customers/VerifyOtp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: otp, // Send the OTP to the backend
            customer_id,
            userProfile: userData, // Send the userProfile data
          }),
        });

        if (response.ok) {
          // Request was successful, handle success response
          // For example, you can show a success message
          const data = await response.json()
          if (data && data.updatedProfile) {
            setOTPModalVisible(false)
            dispatch(updateCustomerData(data.updatedProfile))
            Swal.fire({
              title: "Profile Updated....",
              text: data?.message,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Updated!",
              text: data?.message,
              icon: "error",
            });
          }

        } else {
          // Request failed, handle the error
          throw new Error('Failed to verify OTP. Please try again.');
        }
      } catch (error: any) {
        // Handle any exceptions or network errors
        alert(error.message);
      }
    } else {
      // OTP is not a 4-digit number, show an error message
      alert('Please enter a 4-digit OTP code.');
    }
    setOkButtonLoader(false)

  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      // Do something with the file, for example, set it to state
      setSelectedFile(file);

      console.log(file);

      // You can also access other file information like name, size, type, etc.
      handleFormSubmit(file);

    }
  };

  const handleFormSubmit = async (file: any) => {
    // Create a FormData object
    const formData = new FormData();

    // Append file to FormData
    if (file) {
      formData.append('picture', file);
    }

    console.log(file, 'sele');

    // Append other data to FormData
    formData.append('key', customer_id);

    // Send formData to the server using fetch or axios
    try {
      const response = await fetch(`/api/Customers/addProfilePhoto`, {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      if (response.ok) {
        // Image upload was successful
        const data = await response.json();
        setImage(`${AdminUrl}/uploads/customerProfileImages/${data?.picture}`)
        dispatch(updateCustomerData(data?.updatedRows[0]))
      } else {
        // Handle upload failure
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Account information
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            {/* AVATAR */}
            <div className="relative rounded-full overflow-hidden flex">
              {
                <Image
                  src={profileImage}
                  alt="avatar"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover z-0"
                />
              }
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}

              />
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div className="grid grid-cols-2 w-full gap-2">
              <div className="flex-1">
                <Label>First name</Label>
                <Input
                  className="mt-1.5"
                  value={`${userData?.given_name}`}
                  onChange={(e) => handleInputChange("given_name", e.target.value)}

                />
              </div>
              <div className="flex-1">
                <Label>Last name</Label>
                <Input
                  className="mt-1.5"
                  value={`${userData?.family_name}`}
                  onChange={(e) => handleInputChange("family_name", e.target.value)}

                />
              </div>

              <div>
                <Label>Email</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder={"example@email.com"}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    value={userData.email}
                  />
                </div>
              </div>

              {/* ---- */}
              <div>
                <Label>Phone number</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-phone-volume"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder="91xxxxxxx"
                    value={userData?.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}

                  />
                </div>
              </div>
            </div>

            {/* ---- */}


            <div>
              <Label>Address Line 1</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-address-book"></i>
                </span>
                <Textarea
                  className="!rounded-l-none"
                  rows={1}
                  placeholder="Sayeed Road, 104 xyz"
                  value={userData?.address_line_1}
                  onChange={(e) => handleInputChange("address_line_1", e.target.value)}

                />
              </div>
            </div>
            <div>
              <Label>Address Line 2</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-address-book"></i>
                </span>
                <Textarea
                  className="!rounded-l-none"
                  rows={1}

                  placeholder="Mumbai, Kausa"
                  value={userData?.address_line_2}
                  onChange={(e) => handleInputChange("address_line_2", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>City</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-city"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder="Thane"
                  value={userData?.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}

                />
              </div>
            </div>
            <div>
              <Label>State</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-city"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder="Maharashtra"
                  value={userData?.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}

                />
              </div>
            </div>
            <div>
              <Label>Country</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-city"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder="India"
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  value={userData?.country}
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>About you</Label>
              <Textarea className="mt-1.5"
                placeholder="Tell something about your self..."
                onChange={(e) => handleInputChange("bio", e.target.value)}
                value={userData?.bio}
              />
            </div>
            <div className="pt-2" onClick={handleSubmit}>
              <ButtonPrimary className="transition-all duration-150 ease-in-out">
                {loader ? <Loader2 className="animate-spin" /> : 'Update account'}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Verify Account"
        open={isOTPModalVisible}
        onCancel={() => setOTPModalVisible(false)}
        onOk={handleVeifyOTP}
        okButtonProps={{ loading, style: { background: "blue", color: '#fff' } }}
      >
        <div className="col-span-2 md:col-span-4 text-center">
          <p className="text-lg font-semibold mb-4">
            To complete the account update, please enter the OTP sent to your registered email address.
          </p>
        </div>
        <div className="flex justify-center w-full">
          <Input
            className="w-full justify-center flex"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => handleOTPInputChange(e.target.value)}
          />
        </div>
        <div className="col-span-2 md:col-span-4 text-center mt-4">
          <p className="text-sm text-neutral-500">
            Can't find the OTP? Make sure to check your spam folder or request a new one.
          </p>
        </div>
      </Modal>

    </div>
  );
};

export default AccountPage;
