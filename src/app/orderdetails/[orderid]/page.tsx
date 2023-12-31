"use client";

import BreadCrumb from "@/components/BreadCrumb";
import { ArrowDownToLine, FileText, HelpCircle, Loader2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Steps, Modal } from "antd";
import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
// import "antd/dist/antd.css";

const { Step } = Steps;



const OrderDetails = () => {
  const params = useParams();
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id
  const [orderData, setOrderData] = useState(null)
  const { orderid } = params
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');


  const data = [
    {
      title: "Order Confirmed",
      subtitle: "Thu, 3rd Nov",
      content: "Your order has been placed",
    },
    {
      title: "Shipped",
      subtitle: "Thu, 4th Nov",
      content: "Your order has been shipped",
    },
    {
      title: "Out For Delivery",
      subtitle: "Thu, 5th Nov",
      content: "Your order is out for delivery",
    },
    {
      title: "Delivered",
      subtitle: "Thu, 6th Nov",
      content: "Your order has been delivered",
    },
  ];

  const onStepHover = (index: number) => {
    console.log("onHover:", index);
    setCurrent(index);
  };


  const priceDetailsData = [
    {
      id: 1,
      title: "Price(1 item)",
      amount: "$2,400",
    },
    {
      id: 6,
      title: "Shipping fee",
      amount: "0",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const {
    product_name = '',
    total_amount = '',
    order_status = '',
    product_image = '',
    created_at = '',
    label = '',
    tentative_delivery_date = '',
  } = orderData || {};

  const { vendorname = '' } = orderData?.vendor || {};

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
            <h2 className="font-medium">Delivery Address</h2>
            <h2 className="font-medium">{first_name} {last_name}</h2>
            <p className="">
              {street_address} {apartment} {selected_city},
              {selected_state} {zip_code} {selected_country}
            </p>
            <h3 className="font-medium">
              Phone number <span className="font-normal">{phone_number} </span>
            </h3>
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
                  src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${product_image}` || '/placeholder.png'}
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
              <h2 className="text-sm text-gray-700 mt-2">
                {deliveryStatus}
              </h2>
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
          <div className="w-full pt-14">
            <div>
              <Steps current={currentStep}>
                {data.map((item, index) => (
                  <Step
                    key={index}
                    title={item.title}
                    description={item.subtitle}
                    onMouseEnter={() => onStepHover(index)}
                    onMouseLeave={() => setCurrent(currentStep)}
                  />
                ))}
              </Steps>
              <div className="p-5 text-center">
                <p className="text-[#ed642b] text-lg">{desc?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default OrderDetails;
