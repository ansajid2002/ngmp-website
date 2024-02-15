import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Image } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AdminUrl, ProductImageUrl } from '../Admin/constant';
import moment from 'moment';

const OrderDetail = ({ vendorDatastate }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');
    const id = vendorDatastate?.[0]?.id
    const [details, setDetails] = useState(null)

    useEffect(() => {
        // Close the window if orderId is not a valid integer
        if (!/^\d+$/.test(orderId)) {
            window.close();
            return; // Exit useEffect
        }

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${AdminUrl}/api/getOrderByOrder_Id/${orderId}/${id}`);

                console.log(response);
                if (!response) {
                    window.close();
                    return null
                }

                setDetails(response?.data || [])
            } catch (error) {
                console.error('Error fetching order details:', error);
                window.close();
            }
        };

        id && fetchOrderDetails();
    }, [orderId, id]);

    if (!orderId || orderId.trim() === '') {
        window.close();
        return null;
    }

    const delivery_address = details?.delivery_address || null
    const vendorDetails = details?.vendor || null

    const buttonVisibility = () => {
        const orderStatus = details?.order_status;
        if (orderStatus === "Picked" || orderStatus === "Delivered" || orderStatus === "return true") {
            return true;
        } else {
            return false;
        }
    }

    const visibility_Buy = buttonVisibility()

    return (
        <div className="p-4 bg-white">
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Orders</Breadcrumb.Item>
                <Breadcrumb.Item>Order Details - {orderId}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-4">
                <h1 className='text-xl md:text-2xl tracking-wide'>Order Details</h1>
                <div className='flex justify-between'>
                    <div className='flex py-2'>
                        <p className='border-r-2 border-gray-200 pr-2 text-sm text-gray-900 tracking-wide'>Ordered on {moment(details?.order_date).format('LLL')}</p>
                        <p className=' px-3 text-sm text-gray-900 tracking-wide'> Order - #{orderId}</p>
                    </div>

                    <div>
                        <a href="#" className='text-base tracking-wide text-[#52B9E8]'>Download Invoice</a>
                    </div>
                </div>

                <div className='md:flex justify-between py-4 border p-4 rounded-md'>
                    <div className='flex-1'>
                        <h1 className='text-xl font-semibold tracking-wide text-gray-700'>{details?.ispickup ? 'Pickup' : 'Shipping'} Address</h1>
                        <div className='py-2 '>
                            {
                                details?.delivery_address && !details?.ispickup ?
                                    (
                                        <div>
                                            <p className='text-sm tracking-wide text-gray-800'>{delivery_address?.first_name} {delivery_address?.last_name}</p>
                                            <p className='text-sm tracking-wide text-gray-800'>{delivery_address?.street_address} </p>
                                            <p className='text-sm tracking-wide text-gray-800'>{delivery_address?.selected_city}, {delivery_address?.selected_state}</p>
                                            <p className='text-sm tracking-wide text-gray-800'>{delivery_address?.apartment}, {delivery_address?.selected_country} </p>
                                        </div>
                                    )
                                    : <div>
                                        <p className='text-sm tracking-wide text-gray-800'><b>Comapny Name</b>  - {vendorDetails?.company_name}</p>
                                        <p className='text-sm tracking-wide text-gray-800'><b>Brand - </b>{vendorDetails?.brand_name} </p>
                                        <p className='text-sm tracking-wide text-gray-800'><b>Vendor Name - </b>{vendorDetails?.vendorname} </p>
                                        <p className='text-sm tracking-wide text-gray-800'>{vendorDetails?.shipping_address} </p>
                                        <p className='text-sm tracking-wide text-gray-800'>{vendorDetails?.company_city}, {vendorDetails?.company_state}</p>
                                        <p className='text-sm tracking-wide text-gray-800'>{vendorDetails?.company_zip_code}, {vendorDetails?.company_country} </p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='md:w-[20%] py-2'>
                        <h1 className='text-xl font-semibold tracking-wide text-gray-700'>Payment Methods</h1>
                        <div className='py-2'>
                            <p className='text-sm tracking-wide text-gray-800'>{details?.payment_method}</p>
                        </div>
                    </div>

                    <div className='md:w-[30%] py-2'>
                        <h1 className='text-xl font-semibold tracking-wide text-gray-700'>Order Summary</h1>
                        <div className='py-2 space-y-1'>
                            <div className='flex justify-between'>
                                <p className='text-sm tracking-wide'>Item(s) Subtotal</p>
                                <p className='text-sm tracking-wide text-gray-700'>${details?.sell_price}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm tracking-wide'>Quantity</p>
                                <p className='text-sm tracking-wide text-gray-700'>{details?.quantity}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-sm tracking-wide'>Shipping</p>
                                <p className='text-sm tracking-wide text-gray-700'>${details?.shipping_fee}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm tracking-wide'>Total:</p>
                                <p className='text-sm tracking-wide text-gray-700'>${(parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee)}</p>
                            </div>
                            <div className='flex justify-between border-t py-2'>
                                <p className='text-sm tracking-wide font-bold'>Grand Total:</p>
                                <p className='text-sm tracking-wide font-bold'>${(parseFloat(details?.sell_price) * details?.quantity) + parseFloat(details?.shipping_fee)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' border p-4 rounded-md mt-5'>
                    <h1 className='tracking-wide py-2'>{details?.order_status} - {moment(details?.order_date).format('LLL')}</h1>

                    <div className='py-2 md:flex gap-4 justify-between'>
                        <Image width={100} className='rounded-md' height={100} src={`${ProductImageUrl}/${details?.product_image}`} />
                        <div className='space-y-1 flex-1'>
                            <p className='text-lg text-gray-900 tracking-wide'>{details?.product_name}</p>
                            <p className='text-sm text-gray-900 tracking-wide'>{details?.label}</p>
                            <p className='text-sm tracking-wide text-gray-500'>Sold by: {vendorDetails?.company_name}</p>
                            <p className='text-orange-700 text-sm tracking-wide'>${details?.sell_price}</p>
                            <p className='text-gray-700 text-sm tracking-wide'>{details?.product_type}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {!visibility_Buy && <Button type='link' className='w-[200px] tracking-wide' target='_blank' href={`/Vendors/Orders/Cancel?order_id=${orderId}`}> Cancel Item</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
