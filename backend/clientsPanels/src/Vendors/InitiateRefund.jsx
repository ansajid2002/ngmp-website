import React, { useEffect, useState } from 'react';
import { Form, Select, Input, Table, Image, Descriptions, Button } from 'antd';
import { FaCheckSquare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { AdminUrl, ProductImageUrl, formatCurrency } from '../Admin/constant';
import Swal from 'sweetalert2';

const { Option } = Select;

const InitiateRefund = ({ vendorDatastate }) => {
    const id = vendorDatastate?.[0]?.id
    const location = useLocation();
    const [orderDATA, setOrderDATA] = useState(null)
    const [loader, setLoader] = useState(false)
    const [showOtherReasonInput, setShowOtherReasonInput] = useState(false);
    const [otherReason, setOtherReason] = useState('');
    const [noteToBuyer, setNoteToBuyer] = useState('');
    const [refundAmount, setRefundAmount] = useState(0);

    const [form] = Form.useForm()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const order_id = searchParams.get('order');
        const customer_id = searchParams.get('customer');

        // Check if order_id and customer_id are present and are alphanumeric
        if (
            !order_id ||
            !customer_id ||
            !/^[a-zA-Z0-9]+$/.test(order_id) ||
            !/^[a-zA-Z0-9]+$/.test(customer_id) ||
            /[a-zA-Z]/.test(order_id) ||
            /[a-zA-Z]/.test(customer_id)
        ) {
            window.close(); // Close window if any parameter is missing or not alphanumeric or contains alphabet(s)
        }

        const fetchdata = async () => {
            try {
                const res = await fetch(`${AdminUrl}/api/getOrderDetails?orderId=${order_id}&customer_id=${customer_id}`)
                if (res.ok) {
                    const data = await res.json()
                    console.log(data);
                    setOrderDATA(data)
                } else {
                    window.close()
                }
            } catch (error) {
                console.error('Error:', error);
                window.close()
            }
        }
        fetchdata()
    }, [location.search]);



    const handleReasonChange = (value) => {
        if (value === 'Other') {
            setShowOtherReasonInput(true);
        } else {
            setShowOtherReasonInput(false);
            setOtherReason(value);
        }
    };

    const columns = [
        {
            title: 'Items',
            dataIndex: 'image',
            key: 'image',
            render: () => (
                <Image src={`${ProductImageUrl}/${orderDATA?.product_image}`} />
            ), // Replace 'Image' with actual image rendering logic
            colSpan: 2, // Span 2 columns
            width: 150
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: () => (
                <>
                    <h2 className='text-base font-semibold mb-2 text-gray-600'>{orderDATA?.product_name}</h2>
                    <p>Qty: {orderDATA?.quantity}</p>
                    <p>Sku: {orderDATA?.skuid_order}</p>
                    <p>Nile Uniqueid: {orderDATA?.product_uniqueid}</p>
                </>
            ), // Replace 'Title' with actual title rendering logic
            colSpan: 0, // Span 2 columns
            width: 600
        },
        {
            title: 'PAID',
            dataIndex: 'paid',
            key: 'paid',
            render: () => (
                <h2 className='text-xl font-semibold'>{formatCurrency(orderDATA?.total_amount * orderDATA?.quantity, 'USD')}</h2>
            ), // Replace 'PAID' with actual PAID rendering logic
            width: 400

        },
        {
            title: 'REFUND',
            dataIndex: 'refund',
            key: 'refund',
            width: 400,
            render: (_, record) => (
                <Input
                    placeholder="0.00"
                    value={refundAmount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const maxRefundAmount = orderDATA?.total_amount * orderDATA?.quantity;

                        if (parseFloat(inputValue) <= maxRefundAmount) {
                            setRefundAmount(inputValue);
                        } else {
                            // Clear the refund amount input field
                            setRefundAmount('');
                            // Show an alert to inform the user
                            alert(`Refund amount cannot exceed the total paid amount (${formatCurrency(maxRefundAmount, 'USD')})`);
                        }
                    }}
                />

            ),
        },
    ];

    const data = [
        {
            key: '1',
            paid: 'PAID',
            refund: 'REFUND'
        }
    ];

    const onFinish = () => {
        form
            .validateFields()
            .then((values) => {
                console.log('Form values:', values);
                // Perform further actions with the form values here
                const calulateofrefund = {
                    paid: orderDATA?.total_amount * orderDATA?.quantity,
                    refunded: parseFloat(refundAmount),
                    amountDeducted: ((orderDATA?.total_amount * orderDATA?.quantity) - refundAmount)
                }

                setLoader(true)
                const productdata = {
                    product_name: orderDATA?.product_name,
                    product_uniqueid: orderDATA?.product_uniqueid,
                    category: orderDATA?.category,
                    subcategory: orderDATA?.subcategory,
                    label: orderDATA?.label
                }
                const requestBody = {
                    ...values,
                    refunded_amount: parseFloat(refundAmount), // Convert refunded amount to float if necessary
                    vendorid: id,
                    customer_id: orderDATA?.customer_id,
                    order_id: orderDATA?.order_id,
                    group_order_id: orderDATA?.orderid,
                    calulateofrefund,
                    productdata,
                    email: orderDATA?.customer?.email
                };

                fetch(`${AdminUrl}/api/refund_customer_order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Response from backend:', data);
                        // Handle the response from the backend here
                        setLoader(false);
                        // Display Swal based on the response
                        if (data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Refund request processed successfully.',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: data.error,
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error during fetch operation:', error);
                        // Handle any errors that occur during the fetch operation
                        setLoader(false);
                        // Display Swal for fetch errors
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to communicate with the server. Please try again later.',
                        });
                    });
            })
            .catch((errorInfo) => {
                console.error('Validation failed:', errorInfo);
                setLoader(false);
            });
    };

    return (
        <div className="min-h-screen flex w-full bg-white ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <div className="md:text-3xl font-semibold mb-4 text-gray-700">Refund the buyer</div>
                <hr className='py-4' />
                <Form form={form} name="reportBuyerForm" layout="vertical">
                    <Form.Item
                        name="reason"
                        label="Reason for refund"
                        rules={[{ required: true, message: 'Please select Reason for refund!' }]}
                    >
                        <Select
                            placeholder="Select a reason"
                            className='max-w-md'
                            onChange={handleReasonChange}
                        >
                            <Option value="Item damaged during shipping">Item damaged during shipping</Option>
                            <Option value="Wrong item shipped">Wrong item shipped</Option>
                            <Option value="Item lost during shipping">Item lost during shipping</Option>
                            <Option value="Quality issue with the product">Quality issue with the product</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                    {showOtherReasonInput && (
                        <Form.Item
                            name="otherReason"
                            label="Other Reason"
                            rules={[{ required: true, message: 'Please specify the reason!' }]}
                        >
                            <Input
                                placeholder="Enter other reason"
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="noteToBuyer"
                        label="Note to Buyer"
                        rules={[{ required: true, message: 'Please specify valid reason!' }]}

                    >
                        <Input.TextArea
                            placeholder="Add a note to the buyer"
                            value={noteToBuyer}
                            onChange={(e) => setNoteToBuyer(e.target.value)}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                </Form>
                <div>
                    <h1 className="text-xl font-semibold mb-4">Calculate the refund</h1>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={false}
                        scroll={{
                            x: true
                        }}
                    />

                    <div className='my-4'>
                        <Descriptions title={"Total"} column={1} bordered>
                            {/* Other Description.Item components */}
                            <Descriptions.Item label="Paid" className='py-4'>
                                {formatCurrency(orderDATA?.total_amount * orderDATA?.quantity, 'USD')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Refund" className='py-4'>
                                {formatCurrency(refundAmount, 'USD')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Amount Deducted" className='py-4'>
                                {formatCurrency(((orderDATA?.total_amount * orderDATA?.quantity) - refundAmount), 'USD')}
                            </Descriptions.Item>
                        </Descriptions>

                        <Button type="" loading={loader} onClick={onFinish} className={`h-12 px-6 ${'bg-gray-200'} mt-4 flex justify-center items-center`}>Refund Amount</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitiateRefund;
