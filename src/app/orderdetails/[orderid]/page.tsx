"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { ArrowDownToLine, FileText, HelpCircle, Loader2, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Steps, Modal, Input } from "antd";
import { AdminUrl, ProductImageUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { Select } from 'antd';
import { Radio, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, List } from 'antd';
import Swal from "sweetalert2";
// import "antd/dist/antd.css";

const reasons = [
  { id: 1, reason: 'Ordered by mistake', photosRequired: false },
  { id: 2, reason: 'Arrived damaged', photosRequired: true },
  { id: 3, reason: 'Don’t like it', photosRequired: false },
  { id: 4, reason: 'Missing parts or pieces', photosRequired: true },
  { id: 5, reason: 'Changed my mind', photosRequired: false },
  { id: 6, reason: 'Item is defective', photosRequired: true },
  { id: 7, reason: 'Received the wrong item', photosRequired: true },
  { id: 8, reason: 'Doesn’t fit', photosRequired: false },
  { id: 9, reason: 'Found a better price', photosRequired: false },
  { id: 10, reason: 'Doesn’t match description or photos', photosRequired: true },
];

const { Step } = Steps;

const OrderDetails = () => {
  const params = useParams();
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id
  const [orderData, setOrderData] = useState(null)
  const { orderid } = params
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);

  
  

  const handleUpload = async() => {
    


        // Check if photos are required for the selected reason
      //   if (selectedReason.photosRequired && selectedImages.length === 0) {
      //     console.log("Please provide photos.");
         
      //     return;
      // }

        // Check if details are provided
        if (!additionalDetails.trim()) {
            console.log("Please provide details.");
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Please provide additional details',
          }); 
            return;
        }

        // Create a new FormData object
        const formData = new FormData();
        // Append reason to the form data
        formData.append('reason',reasons.filter((s) => s.id === selectedReason).map((s) => s.reason) );
        formData.append('order_id', orderid);
        // Append details to the form data
        formData.append('details', additionalDetails);
        // Append images to the form data
        fileList.forEach((image, index) => {
            formData.append(`images`, {
                uri: image,
                type: 'image/jpeg', // Adjust the type if necessary
                name: `image${index + 1}.jpg`
            });
        });

 

        
        try {
          
            // Send data to the backend
            const response = await fetch(`${AdminUrl}/api/updateReturn`, {
                method: 'POST',
                body: formData,
               
            });

            // Check if the request was successful
            if (response.ok) {
                const responseData = await response.json();
                // Process the response data
                console.log("Response from backend:", responseData);
                setSelectedReason(null)
                setAdditionalDetails('')
                setModalVisible(false)
                router.push(`/account-order`)
                Swal.fire({
                  icon: 'success',
                  title: 'Return Procedure Initiated',
                  text: 'Your return request has been successfully submitted. We will process it shortly.',
              });
           
            } else {
                console.log("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        } 
  };

  const handlePreview = (file) => {
  

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };


  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const props = {
    onRemove: (file) => {
      setFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const Tab = ({ label, isActive, onClick }) => (
    <div
      style={{
        padding: '8px 16px',

        cursor: 'pointer',

      }}
      className=" hover:text-gray-500 font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
 

  const handleClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
    if (index === 0) {
      setModalVisible(true);
    }
    // if (index == 2) {
    //   router.replace(`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`)
    
    // }
  };

  const handleChange = (value) => {
    setSelectedReason(value);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const data = [
    {
      title: "Ordered",
      descriptions: [

      ],
    },
    {
      title: "Shipped",
      descriptions: [

      ],
    },
    {
      title: "Out for Delivery",
      descriptions: [

      ],
    },
    {
      title: "Delivered",
      descriptions: [

      ],
    },
  ];
  const items = [
    {
      id: 1,
      label: "Return"
    },
    {
      id: 2,
      label: "Contact Seller"
    },
    {
      id: 3,
      label: "Buy Again"
    }
  ]


  const onStepHover = (index: number) => {
    setCurrent(index);
  };


  const fetchOrderDetails = async () => {
    try {

      const response = await fetch(`${AdminUrl}/api/getOrderDetails?orderId=${orderid}&customer_id=${customerId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderData(data)

      } else {
        console.error('Failed to fetch ratings:', response.status);
      }

    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };


  useEffect(() => {
    // Fetch ratings when the component mounts
    customerId && orderid && fetchOrderDetails();
  }, [customerId, orderid])

  const {
    first_name = '',
    last_name = '',
    street_address = '',
    apartment = '',
    selected_city = '',
    selected_country = '',
    selected_state = '',
    zip_code = '',
    phone_number = '',
  } = orderData?.shipping_address || {};
console.log(orderData,"odd");


  const {
    product_name = '',
    total_amount = '',
    order_status = '',
    product_image = '',
    created_at = '',
    label = '',
    tentative_delivery_date = '',
    ispickup,
    seller_otp,
    customer_otp
  } = orderData || {};


  console.log(order_status,"status------------------------------------------------------");
  
  const filteredProgressData = ispickup
    ? data
      .filter(step => step.title !== 'Shipped' && step.title !== 'Out for Delivery')
      .map(step => (step.title === 'Delivered' ? { ...step, title: 'Picked' } : step))
    : data;

  const currentProgressIndex = filteredProgressData.findIndex((step) => step.title === order_status?.trim());


  const { vendorname = '', company_name, company_city, company_state, company_country, company_zip_code, shipping_address } = orderData?.vendor || {};

  const formattedTotalAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total_amount);

  const orderTimeline = ['Ordered', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

  // Use useEffect to update the current step when order_status changes
  const currentStep = orderTimeline.indexOf(order_status);

  // Set the initial current step based on the order_status
  const initialCurrentStep = orderTimeline.indexOf(order_status);
  const [current, setCurrent] = useState(initialCurrentStep);
  const desc = data[current];

  useEffect(() => {
    // Convert tentative_delivery_date to a Date object
    const deliveryDate = new Date(tentative_delivery_date);

    // Get the current date
    const currentDate = new Date();

    // Check if deliveryDate is in the past
    if (deliveryDate < currentDate) {
      setDeliveryStatus('Product delivery is overdue. Please contact customer support.');
    } else {
      // Calculate the difference in days
      const timeDifference = deliveryDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Check if deliveryDate is today
      if (daysDifference === 0) {
        setDeliveryStatus('Product will be delivered today!');
      } else if (daysDifference === 1) {
        setDeliveryStatus('Product will be delivered tomorrow.');
      } else if (daysDifference <= 7) {
        setDeliveryStatus(`Product will be delivered this week on ${deliveryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`);
      } else {
        // Handle other cases as needed
        setDeliveryStatus(`Product will be delivered on ${deliveryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`);
      }
    }
  }, [tentative_delivery_date]);


  const dateParts = tentative_delivery_date && tentative_delivery_date?.split(" ");
  // Extract the month and day values
  const month = dateParts[1];
  const day = dateParts[2];

  // Format the date as "Mon DD"
  const formattedDate = `${month} ${day}`;


  return (
    !orderData ?
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
      : <>
        <BreadCrumb label1={"Home"} label2={"Order Details"} />

        <div className="md:flex items-start justify-between bg-white mx-3 md:mx-10 border shadow-xl my-3 p-3 md:p-6">
          {/* 1 */}
          <div className=" md:w-[50%] space-y-1 md:pr-10 md:border-r-2 border-b-2 md:border-b-0 pb-5 md:pb-0 border-gray-300">
            {
              tentative_delivery_date &&
                order_status.trim() != 'Ordered' || order_status.trim() != 'Shipped' ? <h1 className="text-sm font-semibold text-green-600 md:text-xl">{`${'Arriving on ' + formattedDate}`}</h1> : order_status.trim()
            }
            <div className={`border-t-4 border-b-4 p-4 border-gray-200 space-y-1 ${(order_status.trim() === 'Delivered' || order_status.trim() === 'Picked') && 'bg-green-700'}`}>
              {
                order_status.trim() === 'Delivered' || order_status.trim() === 'Picked' ?
                  <>
                    <h1 className="text-lg text-green-100 font-semibold tracking-widest">Order {order_status.trim()} successfully...</h1>

                  </> : <>
                    <h1 className="text-base font-semibold">
                      OTP for {ispickup ? 'pickup' : 'delivery'}:
                      <h1 className="text-lg font-semibold">{ispickup ? seller_otp : customer_otp}</h1>
                    </h1>
                    <h1>
                      {ispickup
                        ? 'Tell this PIN to the shop owner to confirm pickup'
                        : 'Tell this PIN to the delivery agent to get the delivery'}
                    </h1>
                  </>
              }
            </div>
            {
              !ispickup ? <>
                <h2 className="font-medium">Delivery Address</h2>
                <h2 className="font-medium">{first_name} {last_name}</h2>
                <p className="">
                  {street_address} {apartment} {selected_city},
                  {selected_state} {zip_code} {selected_country}
                </p>
                <h3 className="font-medium">
                  Phone number <span className="font-normal">{phone_number} </span>
                </h3>
              </> : <>
                <h2 className="font-medium">Pickup Address</h2>
                <h2 className="font-medium">{company_name}</h2>
                <p className="">
                  {shipping_address} {company_city},
                  {company_state}, {company_zip_code}, {company_country}
                </p>
              </>
            }
          </div>
          {/* 2 */}
          <div className="md:w-[50%] md:space-y-5 md:pl-10 pt-5 md:pt-0">
            <h2 className="font-semibold">More Actions</h2>
            <div className="flex items-center justify-between">
              <span className="flex gap-1 items-center ">
                <FileText color="#ed642b" size={25} />
                Download Invoice
              </span>
              <h2 className="flex gap-1 cursor-pointer items-center py-1 px-4 md:px-6 border border-gray-600 rounded-lg">
                Download
                <ArrowDownToLine size={17} />
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white mx-3 md:mx-10 border shadow-xl my-3 p-3 md:p-6">
          <div className="md:flex items-start justify-center">
            {/* 1 */}
            <div className="w-full md:w-[50%]  py-2 border-b-2 md:border-b-0">
              <div className="flex gap-2 items-center justify-start">
                <img
                  src={`${ProductImageUrl}/${product_image}` || '/placeholder.png'}
                  className="h-20 md:h-24 w-20 md:w-24 object-contain"
                  alt="Product Image"
                />
                <div>
                  <h2 className="line-clamp-1">{product_name}</h2>
                  <p className="text-sm text-gray-700">
                    {label && label}
                  </p>
                  <p className="text-sm text-gray-700">
                    Seller: <span>{vendorname}</span>
                  </p>
                  <div className="flex gap-3 items-center ">
                    <p className="font-medium">{formattedTotalAmount}</p>
                    {/* <p
                      className="flex gap-1 items-center text-sm font-medium text-[#ed642b] cursor-pointer"
                      onClick={showModal}
                    >
                      Price Details
                      <HelpCircle size={15} />
                    </p> */}
                    {/* <Modal
                      title="Price details"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <div className="border-t-2 py-2">
                        {priceDetailsData?.map((item: any, index: any) => (
                          <div
                            className="flex items-center justify-between py-1"
                            key={index}
                          >
                            <h2>{item.title}</h2>
                            <h2 className="font-medium">{item.amount}</h2>
                          </div>
                        ))}
                        <div className="text-lg font-medium flex items-center justify-between mt-2 py-2 border-t-2">
                          <h2>Price</h2>
                          <h2>$999</h2>
                        </div>
                      </div>
                    </Modal> */}
                  </div>
                </div>
              </div>
              {
                order_status !== "Returned" &&
              <h2 className="text-sm text-gray-700 mt-2">
                {deliveryStatus}
              </h2>
              }
              {
                order_status === "Returned" &&
                <h3 className="mt-2 text-[#fb7701] font-semibold">Your Item is under Review for RETURNS</h3>
              }
            </div>
            {/* 2 */}
            <div className="w-full md:w-[50%] py-2 text-[#ed642b] space-y-2 text-sm font-medium">
              <h2 className="flex items-center gap-1">
                <Star size={20} />
                Rate & Review Produt
              </h2>
              <h2 className="flex items-center gap-1">
                <HelpCircle size={20} />
                Need help ?
              </h2>
            </div>
          </div>
          <div className={`w-full ${order_status !== "Returned" ? 'pt-14' : ''}`}>
            <div>
              {
                order_status !== "Returned" &&
              <Steps current={currentProgressIndex}>
                {filteredProgressData.map((item, index) => (
                  <Step
                  key={index}
                  title={item.title?.trim()}
                  description={''}
                  onMouseEnter={() => onStepHover(index)}
                  onMouseLeave={() => setCurrent(currentStep)}
                  />
                  ))}
              </Steps>
                }
              <div className="p-5 text-center">
                <p className="text-[#ed642b] text-lg">{desc?.content}</p>
              </div>
              {/* ////////////////RETURNS////////////////////// */}

              <div>
                {
                  (ispickup && currentProgressIndex === 1 || !ispickup && currentProgressIndex === 3) &&
                  <div className="flex justify-center">
                    {items.map((item, index) => (
                      <Tab
                        key={item.key}
                        label={item.label}
                        isActive={index === activeIndex}
                        onClick={() => handleClick(index)}
                      />


                    ))}
                    <Modal
                      title="Return Item"
                      visible={modalVisible && activeIndex === 0}
                      onCancel={handleCloseModal}
                      footer={null}
                    >
                      <div className="flex gap-2 items-center justify-start">
                        <img
                          src={`${ProductImageUrl}/${product_image}` || '/placeholder.png'}
                          className="h-20 md:h-24 w-20 md:w-24 object-contain"
                          alt="Product Image"
                        />
                        <div>
                          <h2 className="line-clamp-1">{product_name}</h2>
                          <p className="text-sm text-gray-700">
                            {label && label}
                          </p>
                          <p className="text-sm text-gray-700">
                            Seller: <span>{vendorname}</span>
                          </p>
                          <div className="flex gap-3 items-center ">
                            <p className="font-medium">{formattedTotalAmount}</p>

                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="mt-4 text-base mb-2">Why are you returning this item?</h3>
                        <Select style={{ width: 200 }} onChange={handleChange} defaultValue={reasons[0].id}>
                          {reasons.map((reason) => (
                            <Option key={reason.id} value={reason.id}>
                              {reason.reason}
                            </Option>
                          ))}
                        </Select>
                        {selectedReason && reasons.find((r) => r.id === selectedReason).photosRequired && (
                          <div className=" p-2 mt-4 bg-gray-50">
                            <h4 className="mb-1">Upload photos of the issue</h4>
                            <>
                              <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                              </Upload>
                              <List
                                style={{ marginTop: 16 }}
                                bordered
                                dataSource={fileList}
                                renderItem={(file) => (
                                  <List.Item>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      style={{ maxWidth: 100, maxHeight: 100, cursor: 'pointer' }}
                                      onClick={() => handlePreview(file)}
                                    />
                                    <p>{file.name}</p>
                                  </List.Item>
                                )}
                              />




                              <Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
                                <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                              </Modal>

                            </>
                          </div>
                        )}
                        <h3 className="mt-4 text-base mb-1">Additional Details</h3>
                        <Input
                          style={{ marginTop: 2 }}
                          className="rounded-md h-8 "
                          placeholder="Give us a little more info"
                          value={additionalDetails}
                          onChange={(e) => setAdditionalDetails(e.target.value)}
                        />
                        <Button

                          onClick={handleUpload}

                          loading={uploading}
                          style={{
                            marginTop: 16,
                          }}
                        >
                          {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                      </div>
                    </Modal>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default OrderDetails;
