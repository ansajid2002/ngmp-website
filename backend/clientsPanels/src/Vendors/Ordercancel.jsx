import { Breadcrumb, Button, Image, Modal, Radio, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import React, { useEffect, useState } from 'react'
import { AdminUrl, ProductImageUrl, formatCurrency } from '../Admin/constant';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const Ordercancel = ({ vendorDatastate }) => {
    const [reason, setReason] = useState(null);
    const [confirmCancellation, setConfirmCancellation] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');
    const id = vendorDatastate?.[0]?.id
    const [details, setDetails] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        // Close the window if orderId is not a valid integer
        if (!/^\d+$/.test(orderId)) {
            window.close();
            return; // Exit useEffect
        }

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${AdminUrl}/api/getOrderByOrder_Id/${orderId}/${id}`);

                console.log(response)
                if (!response) {
                    window.close();
                    return null
                }

                setDetails(response?.data || [])
            } catch (error) {
                console.error('Error fetching order details:', error);
                window.close();
                return null
            }
        };

        id && fetchOrderDetails();
    }, [orderId, id]);

    if (!orderId || orderId.trim() === '') {
        window.close();
        return null;
    }

    const handleCancel = () => {
        try {
            if (!reason) return Swal.fire({
                icon: 'error',
                text: 'Select reason for cancelling..'
            })
            setModalVisible(true)

        } catch (error) {
            console.log(error);
        }
    }

    const shipping_fee = details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery'
        ? "We are deducting shipping fee as you're cancelling order after item shipment"
        : "Your product has not been shipped or is out for delivery yet, so shipping fee is not being deducted.";


    const handleOkCancel = async () => {
        try {
            const { customer_id, vendor_id, label, product_uniqueid, total_amount, quantity, shipping_fee, order_id } = details;
            const details_charge = {
                productPrice: total_amount,
                qty: quantity,
                total_amount: total_amount * quantity,
                shipping_fee: details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? `-${shipping_fee}` : shipping_fee,
                refundable_amount: details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? (parseFloat(details?.sell_price) * details?.quantity) - parseFloat(details?.shipping_fee) : (parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee)
            };
            const currentDateTime = new Date().toISOString();

            const response = await fetch(`${AdminUrl}/api/cancelOrderByVendor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reason,
                    confirmCancellation,
                    order_id,
                    customer_id,
                    vendor_id,
                    product_uniqueid,
                    label,
                    details_charge,
                    total_amount: (parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee),
                    refundable_amount: details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? (parseFloat(details?.sell_price) * details?.quantity) - parseFloat(details?.shipping_fee) : (parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee),
                    currentDateTime
                }),
            });

            // Check if request was successful
            if (response.ok) {
                // Reset all values after successful cancellation
                setReason(null);

                // Show success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Order Cancellation Successful',
                    text: 'Your cancellation request has been processed successfully.',
                });
            } else {
                // Parse response JSON and extract error message
                const responseData = await response.json();
                const errorMessage = responseData.message || 'An unknown error occurred';

                // Throw error to be caught by catch block below
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage || 'An error occurred while processing your cancellation request. Please try again later.',
                });
            }
        } catch (error) {
            console.error(error);

            // Show error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred while processing your cancellation request. Please try again later.',
            });
        } finally {
            // Hide modal if needed
            setModalVisible(false);
        }
    };


    return (
        <div className="md:px-10 px-4 py-4 bg-white">
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Orders</Breadcrumb.Item>
                <Breadcrumb.Item>Cancellation</Breadcrumb.Item>
            </Breadcrumb>

            <div className='md:flex'>
                <div className='py-5 flex-1'>
                    <h1 className='text-2xl tracking-wide'>Cancellation</h1>

                    <p className='text-lg text-gray-700 py-4'>What's your reason for cancelling ?</p>

                    <Select
                        defaultValue="Select a reason"
                        style={{ width: 400 }}
                        onChange={(value) => setReason(value)}
                    >
                        <Option value="out_of_stock_or_damaged">Item is out of stock or damaged</Option>
                        <Option value="buyer_asked_to_cancel">Buyer asked to cancel</Option>
                        <Option value="issue_with_buyers_shipping_address">Issue with buyer’s shipping address</Option>
                    </Select>
                    <hr className='my-4 ' />

                    <div className=' rounded-md'>
                        {/* <h1 className='tracking-wide py-2'>{details?.order_status}</h1> */}

                        <div className='py-2 md:flex gap-4 justify-between'>
                            <Image width={100} className='rounded-md' height={100} src={`${ProductImageUrl}/${details?.product_image}`} />
                            <div className='space-y-1 flex-1'>
                                <p className='text-lg text-gray-900 tracking-wide'>{details?.product_name}</p>
                                <p className='text-sm text-gray-900 tracking-wide'>{details?.label}</p>
                                <p className='text-sm text-gray-900 tracking-wide'>Qty: {details?.quantity}</p>

                                {
                                    reason && reason !== 'out_of_stock_or_damaged' && <div className='py-2 flex items-center gap-4'>
                                        <p className='text-base tracking-wide  '>Relist for free</p>

                                        <Radio.Group onChange={(e) => setConfirmCancellation(e.target.value)} value={confirmCancellation}>
                                            <Radio value={true}>Yes</Radio>
                                            <Radio value={false}>No</Radio>
                                        </Radio.Group>
                                    </div>
                                }

                            </div>

                        </div>
                        <Button
                            onClick={handleCancel}
                            className='bg-blue-600 text-white px-6 py-5 text-base font-semibold flex justify-center items-center rounded-full mt-5'
                            type="">
                            Review refund
                        </Button>
                    </div>
                </div>

                <div className='md:w-96 border-l pl-10 py-5'>
                    <h2 className='text-xl font-semibold tracking-wide mb-5 text-gray-800'>Summary</h2>

                    <div className='mb-4'>
                        <h1 className='text-gray-500 tracking-wide text-lg'>Order Number</h1>
                        <p className='text-sm leading-6 text-blue-600'>#{details?.order_id}</p>
                    </div>

                    <div className='mb-4'>
                        <h1 className='text-gray-500 tracking-wide text-lg'>Order Status</h1>
                        <p className='text-sm leading-6  tracking-wide'>{details?.order_status}</p>
                    </div>

                    <div className='mb-4'>
                        <h1 className='text-gray-500 tracking-wide text-lg'>Order total</h1>
                        <p className='text-sm leading-6'>{formatCurrency(details?.total_amount, 'USD')}</p>
                    </div>

                    <div className='mb-4'>
                        <h1 className='text-gray-500 tracking-wide text-lg'>Buyer</h1>
                        <p className='text-sm leading-6 tracking-wide'>Customer Id : {details?.customer_id}</p>
                        <p className='text-sm leading-6 tracking-wide'>{details?.customer?.given_name} {details?.customer?.family_name}</p>
                        <p className='text-sm leading-6 tracking-wide'>
                            <a href={`mailto:${details?.customer?.email}`}>
                                {details?.customer?.email}
                            </a>
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h1 className='text-gray-500 tracking-wide text-lg'>Date purchased</h1>
                        <p className='text-sm leading-6  tracking-wide'>{moment(details?.order_date).format('LL')}</p>
                    </div>

                </div>

                <Modal
                    title="Refund Summary"
                    okButtonProps={{ style: { background: 'red', display: details?.order_status.startsWith('Ret') && 'none' } }}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    okText={'Cancel Order'}
                    onOk={handleOkCancel}
                >
                    {
                        details?.order_status.startsWith('Ret') ? <div>
                            <p className='text-red-500'>Order is currently being processed for return or has already been returned, so cancellation cannot be processed.</p>
                        </div> :
                            <div className='py-2 space-y-3'>

                                <div className='flex justify-between'>
                                    <p className='text-sm tracking-wide'>Product price x Qty</p>
                                    <p className='text-sm tracking-wide text-gray-700'>{details?.sell_price} x {details?.quantity} = {formatCurrency(details?.sell_price * details?.quantity, 'USD')}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='w-3/4'>
                                        <p className='text-sm tracking-wide'>Shipping</p>
                                        <p className='text-xs text-gray-500 tracking-wide'>{shipping_fee}</p>
                                    </div>
                                    <p className={`text-sm tracking-wide text-gray-700 ${details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? 'text-red-500' : 'text-green-600'}`}>${details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? `-${details?.shipping_fee}` : details?.shipping_fee}</p>
                                </div>
                                <div className='flex justify-between border-t py-2'>
                                    <p className='text-sm tracking-wide font-semibold'>Refundable Amount:</p>
                                    <p className='text-sm tracking-wide text-gray-700'>${details?.order_status === 'Shipped' || details?.order_status === 'Out for Delivery' ? (parseFloat(details?.sell_price) * details?.quantity) - parseFloat(details?.shipping_fee) : (parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee)}</p>
                                </div>

                            </div>
                    }
                </Modal>
            </div>
        </div>
    )
}

export default Ordercancel