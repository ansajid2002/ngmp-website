"use client";

import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";
import Swal from "sweetalert2";
import Button from "@/shared/Button/Button";
import { Modal } from "antd";
import { AdminUrl } from "../layout";
import { useAppSelector } from "@/redux/store";
import Skeleton from "react-loading-skeleton";
import axios from 'axios'
import { Edit2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateSelectedAddress } from "@/redux/slices/address";

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
  onChangeAddress: () => void
}

const ShippingAddress: FC<Props> = ({
  isActive,
  onOpenActive,
  onChangeAddress
}) => {
  const [given_name_address, setFirstName] = useState(null);
  const [family_name_address, setLastName] = useState(null);
  const [phone_address, setMobileNumber] = useState(null);
  const [phone_code, setPhoneCode] = useState(null);
  const [email_address, setEmail] = useState(null);
  const [apt_address, setAddress] = useState(null);
  const [subregion_address, setAptSuite] = useState(null);
  const [city_address, setCity] = useState(null);
  const [country_address, setCountry] = useState("Somalia");
  const [region_address, setStateProvince] = useState(null);
  const [zip_address, setPostalCode] = useState(null);
  const [modalvisible, setModalVisible] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const customerData = useAppSelector((state) => state.customerData)
  const id = customerData?.customerData?.customer_id || null

  useEffect(() => {
    const fetchAddress = async () => {
      // Replace 'backendAddressUrl' with the actual endpoint to fetch customer addresses
      const backendAddressUrl = `${AdminUrl}/api/getCustomersAddress/${id}`;

      try {
        const response = await fetch(backendAddressUrl);

        if (response.ok) {
          const data = await response.json();
          // Filter addresses with non-empty 'address' before updating the state

          if (data) {
            // dispatch(loadAddress(data))
            setAddressData(data)
          }
        } else {
          // Handle non-2xx response
          console.error('Failed to fetch Address:', response.statusText);
          Swal.fire({
            icon: 'error',
            title: 'Fetch Error',
            text: 'Failed to fetch customer addresses.',
          });
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Failed to fetch Address:', error);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: 'Failed to fetch customer addresses.',
        });
      }
    };

    // Fetch addresses from the backend when the component mounts
    id && fetchAddress();
  }, [id, selectedAddress]);

  const isValidEmail = (email: string) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !given_name_address ||
      !family_name_address ||
      !phone_address ||
      !email_address ||
      !apt_address ||
      !subregion_address ||
      !city_address ||
      !country_address ||
      !region_address ||
      !zip_address
    ) {
      // Display an error message using SweetAlert for each missing field
      if (!given_name_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Given Name.',
        });
      }

      if (!family_name_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Family Name.',
        });
      }

      if (!phone_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Phone.',
        });
      }

      if (!email_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a valid Email.',
        });
      }

      if (!apt_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Apt.',
        });
      }

      if (!subregion_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Subregion.',
        });
      }

      if (!city_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for City.',
        });
      }

      if (!country_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Country.',
        });
      }

      if (!region_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Region.',
        });
      }

      if (!zip_address) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a value for Zip.',
        });
      }


      return;
    }

    if (!isValidEmail(email_address)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid Email Address',
      });
      return;
    }
    // Additional validation for specific fields
    if (phone_address.length > 10 || !/^\d+$/.test(phone_address)) {
      // Display an error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid 10-digit mobile number.',
      });
      return;
    }

    if (zip_address.length < 5 || !/^\d+$/.test(zip_address)) {
      // Display an error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid 5-digit postal code.',
      });
      return;
    }

    console.log(selectedKey);
    setLoading(true)
    if (selectedKey) {
      // update
      axios.post(`/api/Customers/addAddress`, { given_name_address, family_name_address, email_address, phone_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, customerId: id, address_id: selectedKey })
        .then(response => {
          console.log('Update:', response.data);
          // Handle success response as needed
          setAddressData((prevAddressData: any) => {
            // Use map to create a new array with the updated object
            return prevAddressData.map((address: any) => {
              if (address.address_id === selectedKey) {
                // If the address_id matches, update this object
                return response.data.data;
              }
              // Otherwise, keep the existing object unchanged
              return address;
            });
          });
          setModalVisible(false)
          setLoading(false)

        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error as needed\
          setLoading(false)
        });

    } else {
      // add new address
      axios.post(`/api/Customers/addAddress`, { given_name_address, family_name_address, email_address, phone_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, customerId: id, address_id: null })
        .then(response => {
          console.log('Add:', response.data);
          // Handle success response as needed
          const newAddress = response.data.data;

          // Update the addressData state by appending the new data
          setAddressData((prevAddressData): any => [...prevAddressData, newAddress]);
          setModalVisible(false)
          setLoading(false)

        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error as needed
          setLoading(false)
        });
    }
  };


  const handleEdit = (address: any) => {
    setSelectedKey(address.address_id)
    setModalVisible(true)
    const { given_name_address, family_name_address, email_address, phone_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, phone_code } = address
    setFirstName(given_name_address)
    setLastName(family_name_address)
    setEmail(email_address)
    setMobileNumber(phone_address)
    setPhoneCode(phone_code)
    setAddress(apt_address)
    setAptSuite(subregion_address)
    setCity(city_address)
    setCountry(country_address)
    setStateProvince(region_address)
    setPostalCode(zip_address)
  }

  const handleDelete = (address_id: any) => {
    try {
      const backendUrl = `${AdminUrl}/api/RemoveCustomerAddress/${address_id}`;
      setLoading(true);

      axios.get(backendUrl)
        .then((response) => {
          if (response.data) {
            // Filter out the deleted address from the state
            setAddressData((prevAddressData): any => prevAddressData && prevAddressData.filter((address: any) => address.address_id !== address_id));
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Failed to remove address:', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddressList = ({ addressData }: any) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {addressData &&
          addressData.map((address: any, index: number) => (
            <div key={index} className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all duration-150 ease-in-out border ${selectedAddress && selectedAddress?.address_id === address.address_id && 'border border-orange-300'}`} onClick={() => {
              axios.post(`/api/Customers/setDefaultAddress`, { address_id: address.address_id, customerId: id })
                .then(response => {
                  setSelectedAddress(address)
                  onChangeAddress(address)
                });


            }}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  {address.given_name_address} {address.family_name_address}
                </h2>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.address_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                {address.apt_address}, {address.city_address}, {address.region_address},{' '}
                {address.country_address}, {address.zip_address}
              </p>
              <p className="text-gray-600">{address.email_address}</p>
              <p className="text-gray-600">{address.phone_address}</p>
            </div>
          ))}
      </div>
    );
  };


  const renderShippingAddress = () => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-gray-700 dark:text-gray-300 flex ">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-gray-900 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">
                {selectedAddress && `${selectedAddress.apt_address},`}
                {selectedAddress && `${selectedAddress.city_address},`}
                {selectedAddress && `${selectedAddress.region_address},`}
                {selectedAddress && `${selectedAddress.country_address}`}
              </span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={onOpenActive}
          >
            Change
          </button>
        </div>

        <div
          className={`border-t border-gray-200 dark:border-gray-700 px-6 py-7 space-y-4 sm:space-y-6 ${isActive ? "block" : "hidden"
            }`}
        >
          <div className="flex justify-end">
            <Button className="bg-gray-900 text-white flex justify-center" sizeClass="px-4 py-2" onClick={() => {
              setFirstName(null)
              setLastName(null)
              setEmail(null)
              setMobileNumber(null)
              setPhoneCode(null)
              setAddress(null)
              setAptSuite(null)
              setCity(null)
              setCountry('Somalia')
              setStateProvince(null)
              setPostalCode(null)
              setModalVisible(true)
            }}>Add New Address</Button>
          </div>

          {
            !addressData ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4">
              <div className="h-[250px] w-full">
                <Skeleton className="w-1/2" />
                <Skeleton className="w-full h-full" />
              </div>
              <div className="h-[250px] w-full">
                <Skeleton className="w-1/2" />
                <Skeleton className="w-full h-full" />
              </div>
            </div> :
              addressData?.length === 0 ? 'No Address Found, Create one' : <AddressList addressData={addressData} />
          }

          <Modal
            title="Address"
            open={modalvisible}
            footer={null}
            onCancel={() => {
              setSelectedKey(null)
              setFirstName(null)
              setLastName(null)
              setEmail(null)
              setMobileNumber(null)
              setPhoneCode(null)
              setAddress(null)
              setAptSuite(null)
              setCity(null)
              setCountry('Somalia')
              setStateProvince(null)
              setPostalCode(null)
              setModalVisible(false)
            }}
            width={1000}
          >

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-3  gap-10 mb-4 sm:gap-3">
              <div>
                <Label className="text-sm">First name</Label>
                <Input className="mt-1.5" value={given_name_address || ''} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <Label className="text-sm">Last name</Label>
                <Input className="mt-1.5" value={family_name_address || ''} onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input className="mt-1.5" value={email_address || ''} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm">Country Code</Label>
                <Input
                  type="text"
                  className="mt-1.5"
                  placeholder="Country Code"
                  max={3}
                  title="Please enter a Country Code"
                  value={phone_code || ''}
                  onChange={(e) => setPhoneCode(e.target.value)}
                />

              </div>
              <div>
                <Label className="text-sm">Mobile Number</Label>
                <Input
                  type="text"
                  className="mt-1.5"
                  placeholder="Enter a 10-digit number"
                  pattern="[0-9]{10}"
                  max={10}
                  title="Please enter a 10-digit number"
                  value={phone_address || ''}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />

              </div>
            </div>

            {/* ============ */}
            <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3  mb-4">
              <div className="flex-1">
                <Label className="text-sm">Address</Label>
                <Input
                  className="mt-1.5"
                  placeholder=""
                  value={apt_address || ''}
                  type={"text"}
                  onChange={(e) => setAddress(e.target.value)}

                />
              </div>
              <div className="sm:w-1/3">
                <Label className="text-sm">Apt, Suite *</Label>
                <Input className="mt-1.5" value={subregion_address || ''}

                  onChange={(e) => setAptSuite(e.target.value)}
                />
              </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3  mb-4">
              <div>
                <Label className="text-sm">City</Label>
                <Input className="mt-1.5" value={city_address || ''}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm">Country</Label>
                <Select className="mt-1.5" value={country_address || 'Somalia'}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="United States">United States</option>
                  <option value="Somalia">Somalia</option>
                  <option value="India">India</option>
                </Select>
              </div>
            </div>

            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3  mb-4">
              <div>
                <Label className="text-sm">State/Province</Label>
                <Input className="mt-1.5" value={region_address || ''}
                  onChange={(e) => setStateProvince(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm">Postal code</Label>
                <Input className="mt-1.5" value={zip_address || ''}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>


            {/* ============ */}
            <div className="flex flex-col sm:flex-row pt-6">
              {!loading ? <ButtonPrimary
                className="sm:!px-7 shadow-none"
                type="submit"
                onClick={handleSubmit}
              >
                {selectedKey ? 'Update Address' : 'Save Address'}
              </ButtonPrimary> : <ButtonPrimary
                className="sm:!px-7 shadow-none"
                type="submit"
                disabled={true}
              >
                {selectedKey ? 'Updating....' : 'Save...'}
              </ButtonPrimary>}
              <ButtonSecondary
                className="mt-3 sm:mt-0 sm:ml-3"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </ButtonSecondary>
            </div>

          </Modal>

        </div>
      </div>
    );
  };

  return renderShippingAddress();
};

export default ShippingAddress;
