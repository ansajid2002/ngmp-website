"use client"
import React, { useEffect, useState } from 'react';
import { Select, Button } from 'antd';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { useAppSelector } from '@/redux/store';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


const { Option } = Select;

const SelectDistrict = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const { cartItems } = useAppSelector((store) => store.cart)
    const { customerData } = useAppSelector((store) => store.customerData)
    const [loading, setLoading] = useState(false)
    const customerId = customerData?.customer_id || null
const {t} = useTranslation()

    const handleDistrictChange = (value: any) => {
        setSelectedDistrict(value);
    };

    const storedDistrict = localStorage.getItem('selectedDistrict');

    useEffect(() => {
        setSelectedDistrict(storedDistrict)
    }, [])

    const handleContinueClick = async () => {
        // Implement your logic when the user clicks the "Continue" button
        // console.log('Selected District:', selectedDistrict);
        // Add more logic as needed
        if (cartItems?.length > 0) {
            alert(`You have ${cartItems?.length} items in your cart! Proceed to checkout or empty your cart.`);
            setSelectedDistrict(storedDistrict)
        } else {
            if (customerId) {
                try {
                    setLoading(true)
                    const response = await fetch(`/api/Customers/DistrictSelect`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            customer_id: customerId,
                            district: selectedDistrict,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const responseData = await response.json();
                    // Handle the response data as needed
                    console.log(responseData);
                    Swal.fire({
                        icon: 'success',
                        title: `District Updated to ${selectedDistrict} Successfully`
                    })
                    // Save selectedDistrict in local storage
                    localStorage.setItem('selectedDistrict', selectedDistrict);

                    // You may also want to redirect the user or perform other actions here

                } catch (error) {
                    console.error('Error:', error);
                    // Handle the error as needed
                } finally {
                    setLoading(false)

                }
            } else {
                // Handle the case where customerId is not available
                localStorage.setItem('selectedDistrict', selectedDistrict);
                Swal.fire({
                    icon: 'success',
                    title: `District Updated to ${selectedDistrict} Successfully`
                })
                // Save selectedDistrict in local storage

            }
        }
    };

    const cities = [
        "WARTA NABADA",
        "KAARAN",
        "WADAJIR",
        "YAAQSHID",
        "ABDIAZIZ",
        "KAXDA",
        "HELIWAA",
        "DAYNILE",
        "SHIBIS",
        "HOLWADAG",
        "BOONDHERE",
        "XAMAR WEYNE",
        "XAMAR JAJAB",
        "WAABERI",
        "DHARKENLEY",
        "SHANGANI",
        "AFGOOYE",
        "DARUSALAM",
        "GUBUDLEY",
        "HODAN",
    ];

    return (
        <div className="container mx-auto my-8 p-6 bg-white rounded shadow-md">
            <h1 className="text-3xl font-semibold mb-4">{t("Select Mogadishu District")}</h1>
            <p className="text-gray-600 mb-4">{t("Choose a district from the list below:")}</p>
            <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700">
                {t("District:")}
            </label>
            <Select
                id="districtSelect"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                className="w-full mt-1"
                showSearch
            >
                <Option value="">{t("Select a Mogadishu district")}</Option>
                {cities.map((city, index) => (
                    <Option key={index} value={city}>
                        {city}
                    </Option>
                ))}
            </Select>
            <ButtonPrimary
                onClick={handleContinueClick}
                disabled={!selectedDistrict}
                className="mt-4"
                loading={loading}
            >
                {t("Continue")}
            </ButtonPrimary>
        </div>
    );
};

export default SelectDistrict;
