import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Space, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProductsListCart } from '@/redux/slices/cartSlice';
import FetchCartPrice from '../FetchCartPrice';
import { AdminUrl, ProductImageUrl } from '@/app/layout';

export const ShippingModal = ({ visible, onCancel, cartItems }) => {
    const dispatch = useDispatch();

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleSelect = (itemId, selectedOption) => {
        // Retrieve existing selectedOptions from localStorage
        const existingSelectedOptionsString = localStorage.getItem('selectedOptions');
        const existingSelectedOptions = existingSelectedOptionsString ? JSON.parse(existingSelectedOptionsString) : {};

        // Update the selectedOption for the current item in the local storage
        existingSelectedOptions[itemId] = selectedOption;
        localStorage.setItem('selectedOptions', JSON.stringify(existingSelectedOptions));

        // Update the state to reflect the selected option for the item
        setSelectedOptions(existingSelectedOptions);

        const updatedCartItems = cartItems.map((item) => {
            console.log(item.uniquepid, itemId);
            if (item.uniquepid === itemId) {
                return {
                    ...item,
                    selectedOption,
                };
            }
            return item;
        });

        console.log(selectedOption, 'selectedOption');
        // Use the updatedCartItems as needed (e.g., dispatch to update the global state)
        dispatch(updateProductsListCart(updatedCartItems));
    };



    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            width: 100,
            render: (images) => (
                <Image width={80} height={80} className='rounded-md object-contain' src={`${ProductImageUrl}/${images?.[0]}`} />
            )
        },
        {
            title: 'Product Name',
            dataIndex: 'ad_title',
            key: 'ad_title',
            width: 150,
        },

        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (text, record) => (
                record.mogadishudistrict_ship_from ? <Space size="middle">
                    <Button
                        type={''}
                        className={`${selectedOptions[record.uniquepid] === 'shipping' ? 'bg-blue-500 text-white' : 'bg-transparent border border-gray-500 rounded-lg'}`}
                        onClick={() => handleSelect(record.uniquepid, 'shipping')}
                    >
                        Ship
                    </Button>
                    <Button
                        type={''}
                        className={`${selectedOptions[record.uniquepid] === 'pickup' ? 'bg-blue-500 text-white' : 'bg-transparent border border-gray-500 rounded-lg'}`}
                        onClick={() => handleSelect(record.uniquepid, 'pickup')}
                    >
                        Pickup
                    </Button>
                </Space> : <p className='text-red-500 text-lg text-center font-semibold'>Only Pickup</p>
            ),
        },
    ];

    return (
        <Modal
            title="Choose Delivery Method.."
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={1200}
        >
            <Table
                dataSource={cartItems}
                columns={columns}
                rowKey="id"
                scroll={{ x: 600, y: 400 }}
                pagination={false}
                showHeader

            />

            <div className='mt-10 '>
                <FetchCartPrice />
            </div>
        </Modal>
    );
};
