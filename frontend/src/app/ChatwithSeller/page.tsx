"use client"

import { useAppSelector } from '@/redux/store';
import { Avatar, Image, Input } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AdminUrl } from '../layout';
import ChatScreen from './ChatScreen/[vendorId]/page';
import axios from 'axios';

const ChatwithSeller = () => {
    const { customerData } = useAppSelector((store) => store.customerData)
    const [conversations, setConversations] = useState(null);
    const [error, setError] = useState('');
    const [vendorData, setVendorData] = useState(null);
    const [lastMessages, setLastMessage] = useState('')
    const [updateCVendoriId, setVendorId] = useState(null)
    const [vendorList, setVendorList] = useState(null)


    const customerId = customerData?.customer_id || null


    // Fetch conversations from the backend
    const fetchConversations = async () => {
        try {
            const response = await fetch(`/api/Customers/getConversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
                body: JSON.stringify({ customerId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }
            const data = await response.json();
            setConversations(data)

            if (data?.error) {
                setError(data?.error)
            }
        } catch (error) {

            console.error('Error fetching conversations:', error.message);
        }
    };

    useEffect(() => {
        customerId && fetchConversations();
    }, [customerId]);

    const handleVendorDATA = (vendor: any) => {
        setVendorData(vendor)
    }

    const renderSkeleton = (index) => {
        return <div key={index} style={{ display: 'flex', flexDirection: 'row' }} className="p-2">
            <div className="w-12 h-12 bg-gray-400 animate-pulse rounded-full"></div>
            <div style={{ flex: 1, padding: 10 }}>
                <div className="w-full h-2 bg-gray-400 animate-pulse rounded-full"></div>
                <div className="w-1/2 my-2 h-2 bg-gray-400 animate-pulse rounded-full"></div>
            </div>
        </div>
    }

    const handleLastMessage = (lastMessages, updateCVendoriId) => {
        console.log(updateCVendoriId, 'updateCVendoriId');
        setLastMessage(lastMessages)
        setVendorId(updateCVendoriId)
    }

    const handleSearchVendor = async (e: any) => {
        const searchValue = e.target.value.trim(); // Assuming the search value is coming from an input field
        if (searchValue.length === 0) {
            setVendorList(null)
            return
        }
        // Check if the search value has at least 3 characters
        if (searchValue.length >= 3) {
            try {
                // Send the search value to the backend
                const response = await axios.post('/api/Customers/SearchVendorsforChat', { searchValue });
                setVendorList(response.data)
                // Handle the response from the backend if needed
                console.log('Response from backend:', response.data);
            } catch (error) {
                // Handle any errors
                console.error('Error:', error);
            }
        }
    }



    return (
        <div className='px-2 md:px-10 py-5'>
            <div className='py-4'>
                <h1 className='text-sm md:text-2xl font-semibold'>Chat with Vendor's</h1>
            </div>
            <div className='flex flex-wrap border border-gray-400'>
                <div className='w-[30%] border-r border-gray-400'>
                    <div className='border-b border-gray-300'>
                        <Input
                            type="text"
                            placeholder="Search Vendor's"
                            className="p-2 border border-gray-300 rounded-md w-full"
                            style={{ outline: 'none', borderColor: 'transparent', boxShadow: 'none' }}
                            onChange={handleSearchVendor}
                        />
                    </div>

                    <div>
                        {/* Conversation Vendor List  */}
                        <h2 className='p-2 text-sm tracking-wider text-gray-400'>Vendor's</h2>

                        {
                            !conversations ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => renderSkeleton(index)) :
                                vendorList && vendorList?.length > 0
                                    ? (
                                        vendorList && vendorList.map((item, index) => {
                                            const { brand_logo, brand_name, id } = item
                                            return <div key={index} onClick={() => handleVendorDATA(item)} className={`flex gap-3 overflow-hidden  items-center cursor-pointer hover:bg-gray-300 px-2 py-2 transition-all duration-150 ease-in-out ${id === vendorData?.id && 'bg-gray-200'}`}>
                                                <Image width={50} height={50} className='rounded-full' src={`${AdminUrl}/uploads/vendorBrandLogo/${brand_logo?.images?.[0]}`} />
                                                <div className='flex-1 w-full'>
                                                    <h1 className='font-semibold'>{brand_name}</h1>
                                                    <div className='flex justify-between w-full overflow-hidden '>
                                                        <p className='text-sm text-gray-500 w-1/2 line-clamp-1 overflow-hidden'>{lastMessages.trim() != '' && (updateCVendoriId === customerId) ? lastMessages : ''}</p>
                                                        {/* <p className='text-sm text-gray-500  justify-end'>{moment(timestamp).calendar()}</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        )
                                    )
                                    :
                                    vendorList && vendorList?.length === 0
                                        ? (
                                            <div className='p-2'>
                                                <p className='font-semibold'>No Vendor Found</p>
                                            </div>
                                        )
                                        :
                                        conversations?.length > 0
                                            ? (
                                                conversations && conversations.map((item, index) => {
                                                    const { brand_logo, brand_name, id } = item?.vendorDetails || {}
                                                    const { content = '', timestamp = '' } = item?.lastMessage || {}

                                                    return <div key={index} onClick={() => handleVendorDATA(item?.vendorDetails)} className={`flex gap-3 overflow-hidden  items-center cursor-pointer hover:bg-gray-300 px-2 py-2 transition-all duration-150 ease-in-out ${id === vendorData?.id && 'bg-gray-200'}`}>
                                                        <Image width={50} height={50} className='rounded-full' src={`${AdminUrl}/uploads/vendorBrandLogo/${brand_logo?.images?.[0]}`} />
                                                        <div className='flex-1 w-full'>
                                                            <h1 className='font-semibold'>{brand_name}</h1>
                                                            <div className='flex justify-between w-full overflow-hidden '>
                                                                <p className='text-sm text-gray-500 w-1/2 line-clamp-1 overflow-hidden'>{lastMessages.trim() != '' && (updateCVendoriId === id) ? lastMessages : content}</p>
                                                                <p className='text-sm text-gray-500  justify-end'>{moment(timestamp).calendar()}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                )
                                            )
                                            : <div className='p-2'>
                                                <p className='font-semibold'>No Conversations Found</p>
                                            </div>
                        }
                    </div>
                </div>
                <div className='flex-1 '>
                    {
                        vendorData && customerId ? <ChatScreen vendorData={vendorData} customerData={customerData} onSend={handleLastMessage} /> :
                            <div className='flex justify-center items-center h-screen'>
                                <p>Choose Vendor to Start Conversation</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatwithSeller