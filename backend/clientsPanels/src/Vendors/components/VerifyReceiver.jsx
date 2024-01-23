import { Button, Checkbox, InputNumber, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { FaLongArrowAltRight, FaShippingFast, FaTruckMoving, FaTruckPickup } from 'react-icons/fa';
import { AdminUrl } from '../../Admin/constant';
import Swal from 'sweetalert2';

const VerifyReceiver = ({ vendorDatastate }) => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const vendorid = vendorDatastate?.[0]?.id;

    const handleAction = (action) => {
        setSelectedAction(action);
    }

    const handleSubmit = async () => {
        if (!selectedAction) return;
        setLoading(true);
        try {
            const response = await fetch(`${AdminUrl}/api/fetchOrderProducts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ vendorid, otp, selectedAction }),
            });

            if (response.ok) {
                const data = await response.json();
                setOrderData(data);
                setModalVisible(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Otp is not valid...'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong...'
            });
        } finally {
            setLoading(false);
        }
    }

    const handleModalClose = () => {
        setModalVisible(false);
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderid',
            key: 'orderid',
            width: 100
        },
        {
            title: 'Shipping tyoe',
            dataIndex: '_',
            key: '_',
            width: 100,
            render: (_, record) => (
                <p className='text-red-500 font-semibold text-sm'> {record.ispickup && 'Product will be pickup by Customer'}</p>
            )
        },
        {
            title: 'Sku',
            dataIndex: 'skuid_order',
            key: 'skuid_order',
            width: 100
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            width: 200
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100
        },
        {
            title: 'Total',
            dataIndex: 'total_amount',
            key: 'total_amount',
            width: 80
        },
        {
            title: 'Status',
            dataIndex: 'order_status',
            key: 'order_status',
            width: 100
        },
        // {
        //     title: 'Customer Name',
        //     dataIndex: '_',
        //     key: '_',
        //     render: (_, record) => (
        //         <p>{record.first_name}</p>
        //     )
        // },
        // Add other relevant columns
    ];


    const handleShipSelectedProducts = async () => {
        // Perform logic to ship selected products
        try {
            // Example: Ship selected products with a fetch request
            const response = await fetch(`${AdminUrl}/api/shipSelectedProducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vendorid, selectedAction, selectedOrderIds: selectedRowKeys }),
            });

            if (response.ok) {
                setOrderData(prevOrderData => {
                    return prevOrderData.map(order => {
                        if (selectedRowKeys.includes(order.order_id)) {
                            // Update the order status for the selected order ID
                            return { ...order, order_status: selectedAction };
                        }
                        return order;
                    });
                });

                Swal.fire({
                    icon: 'success',
                    title: `Selected products ${selectedAction} successfully!`,
                });
                setSelectedRowKeys([]); // Clear selected rows after successful action
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to ship selected products.',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong...',
            });
        }
    };
    return (
        <div className='flex flex-col justify-center bg-white p-4'>
            <h2 className="text-2xl font-bold mb-4">Verify Receiver</h2>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-10">
                <Button
                    type={selectedAction === 'Shipped' ? 'primary' : 'default'}
                    className={`flex justify-center items-center gap-3 border text-lg ${selectedAction === 'Shipped' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'
                        }`}
                    onClick={() => handleAction('Shipped')}
                >
                    <FaShippingFast /> Ship
                </Button>
                <Button
                    type={selectedAction === 'Delivered' ? 'primary' : 'default'}
                    className={`flex justify-center items-center gap-3 border text-lg ${selectedAction === 'Delivered' ? 'bg-green-500 text-white' : 'border-green-500 text-green-500'
                        }`}
                    onClick={() => handleAction('Delivered')}
                >
                    <FaTruckMoving /> Delivered
                </Button>
                <Button
                    type={selectedAction === 'Picked' ? 'primary' : 'default'}
                    className={`flex justify-center items-center gap-3 border text-lg ${selectedAction === 'Picked' ? 'bg-orange-500 text-white' : 'border-orange-500 text-orange-500'
                        }`}
                    onClick={() => handleAction('Picked')}
                >
                    <FaTruckPickup /> Picked
                </Button>
            </div>

            <div className="flex flex-col w-full space-y-1">
                <label htmlFor="Verify Receiver" className="text-sm text-gray-600"> Verify Receiver</label>
                <InputNumber
                    className="p-2 w-full"
                    placeholder="Enter 4 digit Verification Code"
                    maxLength={4}
                    onChange={(value) => setOtp(value)}
                />
            </div>

            <div className='w-full justify-center '>
                <Button
                    type="default"
                    className="mt-4 bg-green-400 text-white"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Verify
                </Button>
            </div>

            <Modal
                title="Order Summary"
                visible={modalVisible}
                footer={[
                    <Button key="shipSelected" type="default" onClick={handleShipSelectedProducts} disabled={selectedRowKeys.length === 0}>
                        {selectedAction} Selected Products <FaLongArrowAltRight />
                    </Button>,
                ]}
                onCancel={handleModalClose}
                width={800}
            >
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={orderData}
                    rowKey="order_id"
                    pagination={false}
                    scroll={{
                        x: 600,
                        y: 500

                    }}
                />
            </Modal>
        </div>
    )
}

export default VerifyReceiver;
