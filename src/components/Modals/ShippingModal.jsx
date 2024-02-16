import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Space, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProductsListCart } from '@/redux/slices/cartSlice';
import FetchCartPrice from '../FetchCartPrice';
import { ProductImageUrl } from '@/app/layout';
import FetchCheckoutPrice from '../FetchCheckoutPrice';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { useRouter } from 'next/navigation';

export const ShippingModal = ({ visible, onCancel, cartItems }) => {
    const { t } = useTranslation()
    const navigation = useRouter()
    const localPickupItems = localStorage.getItem('pickupitems');
    console.log(localPickupItems, "lp.;.;.;;;..;;;.;.;");
    const [pickupItems, setPickupItems] = useState(localPickupItems ? JSON.parse(localPickupItems) : cartItems?.filter(product => product.vendorInfo?.company_district === null)
        .map(product => product?.uniquepid))


    const handleSelect = (itemId, selectedOption) => {
        if (selectedOption === 'pickup') {
            if (!pickupItems.includes(itemId)) {
                setPickupItems([...pickupItems, itemId]);
            }
        } else if (selectedOption === 'shipping') {
            setPickupItems(pickupItems.filter(item => item !== itemId));
        }
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
                record?.vendorInfo?.company_district ? <Space size="middle">
                    <Button
                        type={''}
                        className={`${!pickupItems.includes(record.uniquepid)
                            ? 'bg-blue-500 text-white'
                            : 'bg-transparent border border-gray-500 rounded-lg'
                            }`}
                        onClick={() => handleSelect(record.uniquepid, 'shipping')}
                    >
                        Shipping
                    </Button>
                    <Button
                        type={''}
                        className={`${pickupItems.includes(record.uniquepid)
                            ? 'bg-blue-500 text-white'
                            : 'bg-transparent border border-gray-500 rounded-lg'
                            }`}
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
                <>
                    <ButtonPrimary onClick={() => {
                        localStorage.setItem("pickupitems", JSON.stringify(pickupItems))
                        navigation.push('/checkout')
                    }} className="mt-8 w-full">
                        {"Proceed To Checkout"}
                    </ButtonPrimary>
                    <div className="mt-5 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                        <p className="block relative pl-5">
                            <svg
                                className="w-4 h-4 absolute -left-1 top-0.5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 8V13"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.9945 16H12.0035"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {t("Learn more")}{` `}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="##"
                                className="text-gray-900 dark:text-gray-200 underline font-medium"
                            >
                                {t("Taxes")}
                            </a>
                            <span>
                                {` `}{t("and")}{` `}
                            </span>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="##"
                                className="text-gray-900 dark:text-gray-200 underline font-medium"
                            >
                                {t("Shipping")}
                            </a>
                            {` `} {t("infomation")}
                        </p>
                    </div>
                </>
            </div>
        </Modal>
    );
};
