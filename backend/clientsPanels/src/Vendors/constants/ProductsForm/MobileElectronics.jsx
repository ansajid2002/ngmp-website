import React, { useState } from 'react';
import { Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const phoneBrands = [
    "Apple",
    "Asus",
    "BlackBerry",
    "Gionee",
    "Google (Pixel)",
    "HTC",
    "Huawei",
    "Infinix",
    "Itel",
    "Lenovo",
    "LG",
    "Meizu",
    "Motorola",
    "Nokia",
    "OnePlus",
    "Oppo",
    "QMobile",
    "Realme",
    "Samsung",
    "Sony",
    "Tecno",
    "Vivo",
    "Wiko",
    "Xiaomi",
    "ZTE",
    // Add more brands here...
    "Other Mobiles",
];

const specifications = [
    {
        label: "Brand",
        name: "brand",
        type: "select",
        options: phoneBrands, // Replace with your actual brand options
    },
    { label: "Model Name/Number", name: "modelname", type: "select", options: ["Galaxy S21", "iPhone 13", 'Others'] },
    { label: "Operating System", name: "operatingsystem", type: "select", options: ['Android', 'iOS', 'Others'] },
    {
        label: "Product Condition",
        name: "condition",
        type: "select",
        options: ["New", "Used", "Refurbished"],
    },
    { label: "Storage Capacity", name: "storagecapacity", type: "select", options: ['32GB', '64GB', '256GB'] },
    { label: "RAM", name: "ram", type: "select", options: ['4GB', '8GB', '16GB', '32GB'] },
    { label: "Display Size", name: "displaysize", type: "select", options: ['5.8-inch', '6.7-inch'] },

    { label: "Sim Card Type", name: "simcard", type: "select", options: ['Nano', 'eSim', 'Other'] },
    { label: "Unlock Status", name: "unlockstatus", type: "select", options: ['Unlocked', 'Carrier-Specific', '3840x2160'] },
    { label: "Camera Resolution", name: "cameraresolution", type: "text" },

    {
        label: "Connectivity",
        name: "connectivityports",
        type: "select",
        options: ['4G', '5G', 'Wi-Fi', 'Bluetooth'],
    },
    {
        label: "Battery Life",
        name: "batterylife",
        type: "text"
    },
    {
        label: "Warranty Information",
        name: "warrantyinformation",
        type: "text"
    },
];

const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'ETB', label: 'ETB' },
    { value: 'SOS', label: 'SOS' },
    { value: 'KES', label: 'KES' },
];

export const formMobileFields = [
    {
        label: 'Product Name',
        name: 'ad_title',
        rules: [{ required: true, message: 'Please input the Product Name!' }],
        component: <Input />,
    },
    {
        label: 'Currency_Symbol',
        name: 'currency_symbol',
        rules: [{ required: true, message: 'Please select the currency Symbol' }],
        component: (
            <Select>
                {currencyOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                        {option.label}
                    </Select.Option>
                ))}
            </Select>
        ),
    },



    {
        label: 'Manufacturer Details',
        name: 'manufacturerDetails',
        children: [
            {
                label: 'Country of Origin',
                name: 'countryoforigin',
                rules: [
                    { required: true, message: 'Please input the Country of Origin!' },
                ],
                component: <Input disabled />,
            },
            {
                label: 'Manufacturer Name',
                name: 'manufacturername',
                rules: [
                    { required: true, message: 'Please input the Manufacturer Name!' },
                ],
                component: <Input />,
            },
            {
                label: 'Packer Details',
                name: 'packerdetails',
                rules: [
                    { required: true, message: 'Please input the Packer Details!' },
                ],
                component: <Input />,
            },
        ],
    },
    {
        label: 'Product Specification',
        name: 'productSpecification',
        children: specifications.map((specification, index) => ({
            label: specification.label,
            name: specification.name,
            component: specification.type === 'select' ? (
                <Select style={{ width: '200px' }}>
                    {specification.options.map((item) => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
            ) : specification.type === 'number' ? (
                <InputNumber name={specification.name} placeholder={`Enter ${specification.label}`} />
            ) : (
                <Input name={specification.name} placeholder={`Enter ${specification.label}`} />
            ),
        })),
    },
    {
        label: 'Additional Description',
        name: 'additionaldescription',
        component: <Input.TextArea rows={4} />,
    },
    {
        label: 'Search Keywords',
        name: 'searchkeywords',
        component: <Input placeholder="Separate by comma" />,
    },
    {
        label: 'Key features',
        name: 'keyfeatures',
        component: <Input placeholder="Separate by comma" />,
    },
    {
        label: 'Video URL',
        name: 'videourl',
        component: <Input />,
    },
    {
        label: 'In the Box',
        name: 'salespackage',
        rules: [{ required: true, message: 'Please input the Sales Package!' }],
        component: <Input />,
    },

];

