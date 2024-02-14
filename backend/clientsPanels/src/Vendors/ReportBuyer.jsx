import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Select, Input, Button, Table, Card, Descriptions } from 'antd';
import { FaCheckSquare } from 'react-icons/fa';
import { AdminUrl } from '../Admin/constant';
import Swal from 'sweetalert2';
import moment from 'moment';

const { Option } = Select;

const ReportBuyer = ({ vendorDatastate }) => {
    const id = vendorDatastate?.[0]?.id
    const location = useLocation();
    const [orderDATA, setOrderDATA] = useState(null)
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



    const onFinish = async (values) => {
        // Prepare data object with form values and other necessary information
        const data = {
            ...values,
            order_id: orderDATA?.order_id,
            customer_id: orderDATA?.customer?.customer_id,
            selected_reason: values.reason,
            report_reason: values.description,
            product_uniqueid: orderDATA?.skuid_order,
            vendor_id: id
        };

        try {
            // Send POST request to backend API endpoint
            const response = await fetch(`${AdminUrl}/api/insertVendorClaimBuyerIssue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse backend response
            const responseData = await response.json();

            console.log(responseData);
            // Display success message or error message using Swal
            if (responseData.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: responseData.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: responseData.message || 'An error occurred while processing your request.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while processing your request. Please try again later.',
            });
        }
    };

    const reasons = [
        { value: 'demanded_not_offered', label: 'Buyer demanded something that was not offered in my listing' },
        { value: 'false_claim', label: 'Buyer made a false claim' },
        { value: 'misused_returns', label: 'Buyer misused returns' },
        { value: 'bid_retracted', label: 'Buyer messaged me or retracted their bid with no intention of buying my item' }
    ];

    const ClaimIssueCard = ({ claimIssueData }) => {
        const selectedReasonLabel = reasons.find(reason => reason.value === claimIssueData.selected_reason)?.label;
        const { adminresponse = [] } = claimIssueData || {};
        const formattedAdminResponseDate = date => moment(date).format('LLL');

        return (
            <Card title="Claim Issue Data" >
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Reason for Reporting">{selectedReasonLabel}</Descriptions.Item>
                    <Descriptions.Item label="Report Description">{claimIssueData.report_reason}</Descriptions.Item>
                    <Descriptions.Item label="Report Approval Status by Admin">
                        <span className={claimIssueData.report_approved_by_admin ? 'text-green-600' : 'text-red-600'}>
                            {claimIssueData.report_approved_by_admin ? 'Approved' : 'Not Approved'}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Count of Actions Taken by Admin">
                        {claimIssueData.showcountofactionbyadmin}
                    </Descriptions.Item>
                    <Descriptions.Item label="Admin Response">
                        {adminresponse.length > 0 ? (
                            adminresponse.map((response, index) => (
                                <div key={index}>
                                    <p className='text-gray-800 text-base'>{response.text} <span className='text-xs italic text-gray-500'>{formattedAdminResponseDate(response.date)}</span></p>

                                </div>
                            ))
                        ) : (
                            <p>No response yet</p>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        );
    };


    return (
        <div className="min-h-screen flex w-full bg-white ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <div className="md:text-3xl font-semibold mb-4 text-gray-700">Report a Buyer</div>
                <hr />
                <p className='text-xs text-gray-800 py-2 mb-4'>If a buyer has violated Nile Policy, let us know, Buyers who violate policy may be warned, blocked from future return or blocked from future purchases.</p>
                <div className='space-y-2 mb-6'>
                    <h1 className='flex items-center gap-2'><FaCheckSquare className='text-green-400' />You've selected 1 item.</h1>
                    <h2 className='text-sm text-gray-600'><strong>Customer Id: </strong>{orderDATA?.customer?.customer_id}</h2>
                    <h2 className='text-sm text-gray-600'><strong>Customer name: </strong>{orderDATA?.customer?.given_name} {orderDATA?.customer?.family_name}</h2>
                    <h2 className='text-sm text-gray-600'><strong>Item: </strong>{orderDATA?.product_name}</h2>
                    <h2 className='text-sm text-gray-600'><strong>Sku: </strong>{orderDATA?.skuid_order}</h2>
                </div>
                {
                    !orderDATA?.claim_issue_data ? <Form name="reportBuyerForm" onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="reason"
                            label="Report Reason"
                            rules={[{ required: true, message: 'Please select a reason!' }]}
                        >
                            <Select placeholder="Select a reason" className='max-w-md'>
                                {reasons.map(reason => (
                                    <Option key={reason.value} value={reason.value}>{reason.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Please input description" />
                        </Form.Item>

                        <Form.Item className=' flex justify-end'>
                            <Button type="" className='bg-blue-600 text-white mt-4' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form> : <ClaimIssueCard claimIssueData={orderDATA?.claim_issue_data} />

                }
            </div>
        </div>
    );
};

export default ReportBuyer;
