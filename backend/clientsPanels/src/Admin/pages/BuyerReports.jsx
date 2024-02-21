import React, { useEffect, useState } from 'react';
import { Table, Pagination, Modal, Button, Space, Form, Input, message, notification, Switch } from 'antd';
import { AdminUrl } from '../constant';
import { FiEdit } from 'react-icons/fi';
import moment from 'moment';

const BuyerReports = () => {
    const [buyerReports, setBuyerReports] = useState([]);
    const [selectedData, setSelectedDATA] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [modalVisible, setModalVisible] = useState(false);
    const [viewAllResponseModal, setModalVisibleViewAll] = useState(false);
    const [loader, setLoader] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [adminResponse, setAdminResponse] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [viewAll, setViewAllResponse] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${AdminUrl}/api/getAllBuyerReports?page=${page}&pageSize=${pageSize}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch buyer reports');
                }
                const data = await response.json();
                setBuyerReports(data?.data);
                // Assuming you have a total count of items from the server response
                // Set the total count to implement pagination
                setTotalItems(data?.totalItems);
            } catch (error) {
                console.error('Error fetching buyer reports:', error);
                // Handle error
            }
        };

        fetchData();
    }, [page, pageSize]);

    const columns = [
        {
            title: "Action",
            key: "action",
            width: 100,
            render: (text, record, index) => (
                <Space size="middle">
                    <Button type="default" onClick={() => handleUpdateAdminResponse(index)}>
                        <FiEdit />
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
            width: 300,
            render: (vendor, record) => (
                <>
                    <p><strong>Id</strong>: {record?.vendor?.id}</p>
                    <p><strong>Name</strong>: {record?.vendor?.vendorname}</p>
                    <p><strong>Email</strong>: {record?.vendor?.email}</p>
                    <p><strong>Brand</strong>: {record?.vendor?.brand_name}</p>
                </>
            )
        },
        {
            title: 'Customer',
            dataIndex: 'Customer',
            key: 'Customer',
            width: 300,
            render: (Customer, record) => (
                <>
                    <p><strong>Id</strong>: {record?.customer?.customer_id}</p>
                    <p><strong>Name</strong>: {record?.customer?.given_name} {record?.customer?.family_name}</p>
                    <p><strong>Email</strong>: {record?.customer?.email}</p>
                </>
            )
        },
        {
            title: 'Reason for reporting',
            dataIndex: '_',
            key: '_',
            width: 200,
            render: (_, record) => {
                const reasons = [
                    { value: 'demanded_not_offered', label: 'Buyer demanded something that was not offered in my listing' },
                    { value: 'false_claim', label: 'Buyer made a false claim' },
                    { value: 'misused_returns', label: 'Buyer misused returns' },
                    { value: 'bid_retracted', label: 'Buyer messaged me or retracted their bid with no intention of buying my item' }
                ];
                const selectedReasonLabel = reasons.find(reason => reason.value === record.selected_reason)?.label;

                return <p>{selectedReasonLabel}</p>
            }
        },
        {
            title: 'Report Description',
            dataIndex: 'report_reason',
            key: 'report_reason',
            width: 150,
            render: (text) => {
                const shortenedDescription = text.length > 10 ? `${text.substring(0, 10)}...` : text;
                return (
                    <div>
                        <p>{shortenedDescription}</p>
                        {text.length > 10 && (
                            <Button type="link" onClick={() => handleReadMore(text)}>Read More</Button>
                        )}
                    </div>
                );
            }
        },
        {
            title: 'Status',
            dataIndex: 'report_approved_by_admin',
            key: 'report_approved_by_admin',
            width: 150,
            render: (report_approved_by_admin) => (
                <span style={{ color: report_approved_by_admin ? 'green' : 'red' }}>
                    {report_approved_by_admin ? 'Approved' : 'Not Approved'}
                </span>
            )
        },
        {
            title: 'Action Taken',
            dataIndex: 'showcountofactionbyadmin',
            key: 'showcountofactionbyadmin',
            width: 100,
            render: (showcountofactionbyadmin) => (
                <p>{showcountofactionbyadmin}</p>
            )
        },
        {
            title: 'Admin Response',
            dataIndex: 'adminresponse',
            key: 'adminresponse',
            width: 400,
            render: (adminResponse) => {
                if (!adminResponse || adminResponse.length === 0) {
                    return <span>No response yet</span>;
                }

                const lastTwo = adminResponse.slice(-2);
                const rest = adminResponse.slice(0, -2);


                return (
                    <>
                        {lastTwo.map((response, index) => (
                            <div key={index}>
                                <p className='text-base font-semibold text-gray-700'>{response.text} <span className='text-xs italic font-light'>{moment(response.date).format('LLL')}</span></p>
                            </div>
                        ))}
                        {rest.length > 0 && (
                            <Button type="link" onClick={() => handleViewAll(adminResponse)}>View All</Button>
                        )}
                    </>
                );
            }
        },
    ];

    const handleViewAll = (responses) => {
        setViewAllResponse(responses);
        setModalVisibleViewAll(true);
    };


    const handleReadMore = (description) => {
        setModalContent(description);
        setModalVisible(true);
    };


    const handleUpdateAdminResponse = (index) => {
        const selectedReport = buyerReports[index];
        setSelectedDATA(selectedReport);
        setModalVisible(true);
    };

    const handleOk = async () => {
        if (!adminResponse || adminResponse.trim() === '') {
            // Display an error message using alert or a modal dialog
            notification.error({ message: 'Please enter a valid admin response' });
        } else {
            setLoader(true)
            try {
                // Send a request to the backend with selected data and adminResponse
                const response = await fetch(`${AdminUrl}/api/updateAdminResponse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: selectedData?.id, // Replace selectedData with your actual selected data
                        adminResponse: adminResponse,
                        switchValue
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to update admin response');
                }

                // Display success message
                notification.success({ message: 'Admin response updated successfully' });
                setModalVisible(false);
                setSelectedDATA(null)
                setAdminResponse(null)
                setBuyerReports(buyerReports?.map(item => {
                    if (item.id === selectedData?.id) {
                        const newAdminResponse = {
                            text: adminResponse,
                            date: new Date()
                        };
                        const updatedAdminResponse = item.adminresponse ? [...item.adminresponse, newAdminResponse] : [newAdminResponse];
                        return {
                            ...item,
                            report_approved_by_admin: switchValue,
                            adminresponse: updatedAdminResponse
                        };
                    }
                    return item;
                }));

            } catch (error) {
                console.error('Error updating admin response:', error);
                // Handle error
                notification.error({ message: 'Failed to update admin response' });
            } finally {
                setLoader(false)

            }
        }
    };

    return (
        <div className="sm:ml-72">
            <h1 className='py-4 text-xl tracking-wide font-semibold text-gray-700'>Buyer Reports</h1>
            <Table
                dataSource={buyerReports}
                columns={columns}
                pagination={false} // Disable built-in pagination since we are using custom pagination
                scroll={{
                    x: 1200,
                    y: 600
                }}
                rowClassName={'w-24 h-32'}
            />
            {/* Pagination */}
            <div className='flex justify-end py-4'>
                <Pagination
                    hideOnSinglePage
                    showQuickJumper
                    current={page}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={(page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }}
                />
            </div>

            <Modal
                title="Full Report Description"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setModalVisible(false)}>
                        Close
                    </Button>
                ]}
            >
                <p>{modalContent}</p>
            </Modal>

            <Modal
                title="Update Admin Response"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button loading={loader} key="ok" type="" className='bg-blue-500 text-white' onClick={handleOk}>
                        Send Response
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Admin Response">
                        <Input.TextArea
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item label="Approved Report">
                        <Switch
                            checked={switchValue}
                            onChange={(checked) => setSwitchValue(checked)}
                        />
                    </Form.Item>
                </Form>
            </Modal>


            <Modal
                title="All Admin Responses"
                visible={viewAllResponseModal}
                onCancel={() => setModalVisibleViewAll(false)}
                footer={null}
            >
                {viewAll.map((response, index) => (
                    <div key={index} className='py-2'>
                        <p className='text-base font-semibold text-gray-700'>{response.text} <span className='text-xs italic font-light'>{moment(response.date).format('LLL')}</span></p>
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default BuyerReports;
