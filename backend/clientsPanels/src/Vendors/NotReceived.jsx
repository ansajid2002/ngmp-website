import React, { useState, useEffect } from 'react';
import { Table, Spin, Modal, Button, Popconfirm } from 'antd';
import axios from 'axios';
import { AdminUrl } from '../Admin/constant';
import moment from 'moment';
import { websiteUrl } from '../App';

const NotReceived = ({ vendorDatastate }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoader, setLoaderButton] = useState(false);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [selected, setSelected] = useState(null);


    const id = vendorDatastate?.[0]?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${AdminUrl}/api/itemsNotReceived/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to clear the data when the component unmounts
        return () => {
            setData([]);
        };
    }, [id]); // Add id to the dependency array to fetch data when id changes

    const columns = [
        {
            title: 'Customer Detail',
            dataIndex: 'customer_id',
            key: 'customer_id',
            width: 250,
            render: (_, record) => (
                <div>
                    <p><b>Name</b>: {record?.customer?.given_name} {record?.customer?.family_name}</p>
                    <p><b>Email</b>: <a href={`mailto:${record?.customer?.email}`}>{record?.customer?.email}</a></p>
                    <p><b>Phone</b>: {record?.customer?.phone_number ? <a href={`tel:${record?.customer?.phone_number}`}>{record?.customer?.phone_number}</a> : 'N/A'}</p>
                </div>
            )
        },
        {
            title: 'OrderID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 100,
            render: (orderId, record) => (
                <a href={`/Vendors/Orders/OrderDetails?order_id=${orderId}`} className='text-blue-700 tracking-wide' target='_blank'>View Order</a>
            )
        },
        {
            title: 'Product  ID',
            dataIndex: 'product_uniqueid',
            key: 'product_uniqueid',
            width: 100,
            render: (product_uniqueid, record) => {
                return (
                    <a
                        href={`${websiteUrl}/product-detail?product=${record?.product?.prod_slug}&uniqueid=${record.product_uniqueid}`}
                        target="_blank"
                        className="line-clamp-2 min-w-[100px]"
                    >
                        {product_uniqueid}
                    </a>
                );

            },
        },
        {
            title: 'Selected Option',
            dataIndex: 'selected_option',
            key: 'selected_option',
            width: 100,
            sorter: (a, b) => a.selected_option.localeCompare(b.selected_option), // Sort alphabetically
            filters: [
                { text: "I'd still like the item", value: "I'd still like the item" },
                { text: "I'd like a refund", value: "I'd like a refund" },
            ],
            onFilter: (value, record) => record.selected_option.includes(value), // Filter by selected_option

        },
        {
            title: 'Request Text',
            dataIndex: 'request_text',
            key: 'request_text',
            width: 200,
            render: (text, record) => {
                const requestTextArray = JSON.parse(text) || [];

                // Display only the first five items
                const customerEntries = requestTextArray.slice(0, 5);

                return (
                    <div>
                        {text && <p><strong>Customer:</strong></p>}
                        {customerEntries.map((entry, index) => (
                            <div key={index}>
                                <p>{entry?.text}</p>
                                <p className="text-xs italic text-gray-400">{moment(entry?.created_at).format('LLL')}</p>
                            </div>
                        ))}
                        {requestTextArray.length > 5 && (
                            <Button type="link" onClick={() => {
                                setModalData(requestTextArray);
                                setModalVisible(true);
                            }}>View More</Button>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Seller Response',
            dataIndex: 'response_text_from_seller',
            key: 'response_text_from_seller',
            width: 200,
            render: (text, record) => {
                const requestTextArray = JSON.parse(text) || [];

                // Display only the first five items
                const sellerEntries = requestTextArray.slice(0, 5);

                return (
                    <div>
                        {text && <p><strong>Seller:</strong></p>}
                        {sellerEntries.map((entry, index) => (
                            <div key={index}>
                                <p>{entry?.text}</p>
                                <p className="text-xs italic text-gray-400">{moment(entry?.created_at).format('LLL')}</p>
                            </div>
                        ))}
                        {requestTextArray.length > 5 && (
                            <Button type="link" onClick={() => {
                                setModalData(requestTextArray);
                                setModalVisible(true);
                            }}>View More</Button>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Created At',
            dataIndex: 'created_at_request',
            key: 'created_at_request',
            width: 150,
            render: (_, record) => (
                <p>{moment(_).format('LLL')}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Are you sure you want to delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { background: 'red' } }}
                        loading={buttonLoader}
                    >
                        <Button type="link">Delete</Button>
                    </Popconfirm>
                    <Button type="link" onClick={() => {
                        setSelected(record?.id)
                        setReplyModalVisible(true)
                    }}>Reply</Button>
                </div>
            ),
        },
    ];

    const handleDelete = async (record) => {
        setLoaderButton(true)
        try {
            const id = record?.id;
            if (!id) return;

            // Send request to backend to delete data based on ID
            const response = await axios.delete(`${AdminUrl}/api/itemsNotReceived_Delete/${id}`);

            // Check if deletion was successful
            if (response.status === 200) {
                // Handle success, such as updating UI or showing a notification
                console.log('Data deleted successfully.');
                setData(prevData => prevData.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            // Handle error, such as showing an error message to the user
        }
    };

    const handleReply = async () => {
        try {
            // Prepare data object to send to the backend
            const requestData = {
                id: selected,
                replyText: replyText,
            };

            // Send request to backend to reply
            const response = await axios.post(`${AdminUrl}/api/replyToItemNotReceived`, requestData);

            // Update the data with the new seller response
            const updatedData = data.map(item => {
                if (item.id === selected) {
                    // Append the new response to the existing response_text_from_seller array
                    const updatedResponseArray = item.response_text_from_seller ? JSON.parse(item.response_text_from_seller) : [];
                    updatedResponseArray.push({ text: replyText, created_at: new Date().toISOString() });
                    return {
                        ...item,
                        response_text_from_seller: JSON.stringify(updatedResponseArray)
                    };
                }
                return item;
            });

            // Update the state with the modified data
            setData(updatedData);
            setReplyModalVisible(false)
            setReplyText('')
            setSelected(null)
        } catch (error) {
            console.error('Error replying to item not received:', error);
            // Handle error, such as showing an error message to the user
        }
    };

    return (
        <Spin spinning={loading}>
            <div style={{ overflowX: 'auto' }}> {/* Add horizontal scrolling */}
                <h2 className='py-4 text-xl font-semibold tracking-wide text-gray-700'>Items Not Received</h2> {/* Add a heading */}
                <Table dataSource={data} columns={columns} scroll={{ x: true }} /> {/* Enable horizontal scrolling */}
            </div>

            <Modal
                title="Request Text"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {modalData.map((entry, index) => (
                    <div key={index}>
                        <p>{entry?.text}</p>
                        <p className="text-xs italic text-gray-400">{moment(entry?.created_at).format('LLL')}</p>
                    </div>
                ))}
            </Modal>

            <Modal
                title="Reply to Seller"
                visible={replyModalVisible}
                onOk={() => {
                    handleReply();
                }}
                onCancel={() => {
                    setReplyModalVisible(false)
                    setSelected(null)
                }}
                okButtonProps={{ style: { background: 'blue' } }}
            >
                <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your reply..."
                />
            </Modal>
        </Spin>
    );
};

export default NotReceived;
