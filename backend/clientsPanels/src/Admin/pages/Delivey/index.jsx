import React, { useEffect, useState } from 'react';
import { Tabs, Table, Pagination, Button, Modal, Radio, Input } from 'antd';
import { AdminUrl } from '../../constant';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

const Delivery = ({ adminLoginData }) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [activeTab, setActiveTab] = useState('Processing'); // Define activeTab state

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [orderId, setOrderId] = useState('');

    const handleTabChange = (activeKey) => {
        // Make a request to the server endpoint based on the active tab label
        const fetchData = async (tabLabel, page, pageSize) => {
            try {
                const response = await fetch(`${AdminUrl}/api/getDeliverOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tabLabel, page, pageSize }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.orders);
                setTotalCount(result.totalCount);

                // Update pagination settings
                setPagination({ ...pagination, current: page, pageSize });
            } catch (error) {
                console.error(`Error fetching data for ${tabLabel} tab:`, error);
            }
        };

        setActiveTab(activeKey); // Set activeTab
        fetchData(activeKey, pagination.current, pagination.pageSize);
    };

    const handlePaginationChange = (page, pageSize) => {
        // Update the page and pageSize in the state
        setPagination({ ...pagination, current: page, pageSize });

        // Fetch data for the current tab and updated pagination
        handleTabChange(activeTab, page, pageSize);
    };

    useEffect(() => {
        // Fetch data for New Order default active tab
        handleTabChange('New Order', pagination.current, pagination.pageSize);
    }, []); // Run this effect only once on component mount

    const columns = [
        {
            title: 'Action',
            key: 'action',
            fixed: 'left',
            width: 200,
            render: (text, record) => (
                !record.ispickup && <Button onClick={() => handleUpdateStatus(record.order_id)}>Update Status</Button>
            ),
        },
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 80
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            key: 'order_status',
            width: 100,
            render: (text) => {
                let color = '';

                switch (text) {
                    case 'Confirmed':
                        color = 'blue';
                        break;
                    case 'Ordered':
                        color = 'green';
                        break;
                    case 'Shipped':
                        color = 'orange';
                        break;
                    case 'Out for Delivery':
                        color = 'purple';
                        break;
                    case 'Delivered':
                        color = 'darkgreen';
                        break;
                    case 'Picked':
                        color = 'darkgreen';
                        break;
                    default:
                        color = 'black';
                }

                return <span style={{ color }}>{text}</span>;
            },
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name', // Assuming the product_info is an object within your data
            key: 'product_name',
            width: 200,
            render: (_, record) => (
                <div>
                    <p className='font-semibold text-gray-700'>{record.product_name}</p>
                    <p>Id - {record.orderid}</p>
                    <p>OTP - {record.seller_otp}</p>
                    <p className='text-red-500 font-semibold text-xl'> {record.ispickup && 'Product will be pickup by Customer'}</p>
                </div>
            )
        },
        {
            title: 'Seller Info',
            key: 'seller_info',
            width: 200,
            render: (_, record) => (
                <div>
                    <p className='font-semibold text-gray-700'>{record.customer_info?.vendorname}</p>
                    <p>{record.vendor_info?.brand_name}</p>
                    <p>
                        <a href={`mailto:${record.vendor_info?.email}`}>{record.vendor_info?.email}</a>
                    </p>
                    <p>
                        <a href={`tel:${record.vendor_info?.mobile_number}`}>{record.vendor_info?.mobile_number}</a>
                    </p>
                </div>
            ),
        },
        {
            title: 'Customer Info',
            dataIndex: 'customer_info', // Assuming customer_info is a string, you might want to format it appropriately
            key: 'customer_info',
            width: 300,
            render: (_, record) => (
                <div>
                    <p className='font-semibold text-gray-700'>{record.customer_info?.given_name} {record.customer_info?.family_name}</p>
                    <p>
                        <a href={`mailto:${record.customer_info?.email}`}>{record.customer_info?.email}</a>
                    </p>
                    <p>
                        <a href={`tel:${record.customer_info?.phone_number}`}>{record.customer_info?.phone_number}</a>
                    </p>
                </div>
            ),
        },
        {
            title: 'Delivery Address',
            dataIndex: 'delivery_address',
            key: 'delivery_address',
            width: 200,
            render: (address, record) => {
                const fullAddress = `${record?.delivery_address?.street_address}, ${record?.delivery_address?.apartment}, ${record?.delivery_address?.selected_city}, ${record?.delivery_address?.selected_state}, ${record?.delivery_address?.zip_code}, ${record?.delivery_address?.selected_country}`;
                const mapLink = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`;

                // Render the address based on the ispickup flag
                if (record.ispickup) {
                    return 'Pickup';
                } else {
                    // Use Google Maps link for the map
                    return (
                        <div>
                            <p>Delivery Address: {fullAddress}</p>
                            <a href={mapLink} className='text-blue-500' target="_blank" rel="noopener noreferrer">
                                View on Map
                            </a>
                        </div>
                    );
                }
            },
        },

    ];

    const handleUpdateStatus = (orderId) => {
        setOrderId(orderId)
        // Set the modal to visible and reset the selected status and OTP input
        setModalVisible(true);
        setSelectedStatus('');
        setOtpInput('');
    };


    const handleModalOk = async () => {
        try {
            // Send a request to the backend to update the order status and verify OTP
            const response = await fetch(`${AdminUrl}/api/updateOrderStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId, // Assuming selectedOrder is the currently selected order
                    newStatus: selectedStatus,
                    otp: otpInput, // Make sure to get the entered OTP from your state or input field
                }),
            });

            // Handle the response
            const result = await response.json();
            console.log('Update status response:', result);

            // Display the response using Swal
            Swal.fire({
                icon: result.success ? 'success' : 'error',
                title: result.success ? 'Success' : 'Error',
                text: result.success ? result.message : `Error: ${result.error}`,
            });

            // Close the modal

            // If the update was successful, update the order status in your component state
            if (result.success) {
                // Find the updated order in the current state and update its status
                setData((prevData) => {
                    return prevData.map((order) =>
                        order.order_id === orderId ? { ...order, order_status: selectedStatus } : order
                    );
                });
                setModalVisible(false);

            }
        } catch (error) {
            console.error('Error updating order status:', error);
            // Handle errors as needed
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `An error occurred while updating the order status: ${error.message}`,
            });
        }
    };


    // Function to handle the modal cancel/close
    const handleModalCancel = () => {
        // Close the modal without performing any action
        setModalVisible(false);
    };

    return (
        adminLoginData || adminLoginData?.length > 0 ? (
            <div className="sm:p-4 sm:ml-72">
                <div className="table-responsive overflow-hidden overflow-x-auto mt-4 ">
                    <Tabs defaultActiveKey="New Order" onChange={handleTabChange}>
                        <TabPane tab="New Order" key="New Order">
                            <Table columns={columns} scroll={{ x: 1200, y: 600 }} dataSource={data} pagination={false} />
                            <div className='flex justify-end mt-10'>
                                <Pagination
                                    current={pagination.current}
                                    pageSize={pagination.pageSize}
                                    total={totalCount}
                                    onChange={handlePaginationChange}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Dispatched" key="Dispatched">
                            <Table columns={columns} scroll={{ x: 1200, y: 600 }} dataSource={data} pagination={false} />
                            <div className='flex justify-end mt-10'>
                                <Pagination
                                    current={pagination.current}
                                    pageSize={pagination.pageSize}
                                    total={totalCount}
                                    onChange={handlePaginationChange}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab="Completed" key="Completed">
                            <Table columns={columns} scroll={{ x: 1200, y: 600 }} dataSource={data} pagination={false} />
                            <div className='flex justify-end mt-10'>
                                <Pagination
                                    current={pagination.current}
                                    pageSize={pagination.pageSize}
                                    total={totalCount}
                                    onChange={handlePaginationChange}
                                />
                            </div>
                        </TabPane>
                        {/* Add TabPane for other tabs as needed */}
                    </Tabs>
                </div>

                <Modal
                    title="Update Order Status"
                    visible={modalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    okButtonProps={{ style: { background: 'blue' } }}
                    okText={"Update Status"}
                >
                    <div className='p-4 my-10'>
                        <Radio.Group
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            value={selectedStatus}
                        >
                            <Radio value="Confirmed">Confirmed</Radio>

                            <Radio value="Out for Delivery">Out for Delivery</Radio>
                            <Radio value="Delivered">Deliver</Radio>
                        </Radio.Group>

                        {selectedStatus === 'Delivered' && (
                            <div className='mt-5 space-y-3'>
                                <label>Verify OTP:</label>
                                <Input
                                    type="text"
                                    value={otpInput}
                                    onChange={(e) => setOtpInput(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        ) : ""
    );
};

export default Delivery;