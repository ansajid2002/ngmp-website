import React, { useEffect, useState } from 'react';
import { AdminUrl } from '../../Admin/constant';
import { Image } from 'antd';
import moment from 'moment';
import ChatScreen from './ChatScreen';
import { useLocation } from 'react-router-dom';

const ChatwithCustomers = ({ vendorDatastate }) => {
    const [error, setError] = useState('')
    const [conversations, setConversations] = useState(null)
    const [CustomerState, setCustomerState] = useState(null)
    const [lastMessages, setLastMessage] = useState('')
    const [updateCustomerId, setCustomerId] = useState(null)

    const params = new URLSearchParams(location.search);
    const customer = params.get("customer");


    const vendorId = vendorDatastate?.[0]?.id

    const fetchConversations = async () => {
        if (!vendorId) return
        try {
            const response = await fetch(`${AdminUrl}/api/conversationsListforVendors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
                body: JSON.stringify({ vendorId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }
            const data = await response.json();

            setTimeout(() => {
                setConversations(data)
            }, 1000)

            if (data?.error) {
                setError(data?.error)
            }
        } catch (error) {
            console.error('Error fetching conversations:', error.message);
        }
    };

    useEffect(() => {
        // Check if customer is not null
        if (customer) {
            // Send a request to the backend to fetch customer data by ID
            fetch(`${AdminUrl}/api/getCustomerbyId/${customer}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch customer data');
                    }
                })
                .then(data => {
                    // Update the CustomerState with the received customer data
                    setCustomerState(data);
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                    // Handle error, if needed
                });
        }
    }, [customer]);

    useEffect(() => {
        fetchConversations();
    }, [vendorId, lastMessages]);

    const renderSkeleton = (index) => {
        return <div key={index} style={{ display: 'flex', flexDirection: 'row' }} className="p-2">
            <div className="w-12 h-12 bg-gray-400 animate-pulse rounded-full"></div>
            <div style={{ flex: 1, padding: 10 }}>
                <div className="w-full h-2 bg-gray-400 animate-pulse rounded-full"></div>
                <div className="w-1/2 my-2 h-2 bg-gray-400 animate-pulse rounded-full"></div>
            </div>
        </div>
    }

    const handleCustomerChat = (customerData) => {
        setCustomerState(customerData)
        console.log(customerData?.customer_id);
    }

    const handleLastMessage = (lastMessages, customer_id) => {
        setLastMessage(lastMessages)
        setCustomerId(customer_id)
    }

    // Set up a timer to call the function every 5 seconds
    setTimeout(() => {
        fetchConversations();
    }, 5000);

    return (
        <div className="lg:flex h-[85vh] border">

            {/* User List (visible on larger screens) */}
            <div className={` h-[30vh] lg:h-[85vh] transition-all ease-in-out duration-200 lg:w-1/4 bg-white overflow-y-auto border`} >
                {/* Add your user list content here */}
                {
                    !conversations ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => renderSkeleton(index)) :
                        conversations?.length > 0
                            ? (
                                conversations && conversations.map((item, index) => {
                                    const { given_name = '', family_name = '', picture = '', customer_id = '' } = item?.CustomerDetails || {}
                                    const { content = '', timestamp = '' } = item?.lastMessages[index] || {}
                                    return <div key={index} onClick={() => handleCustomerChat(item?.CustomerDetails)} className={`flex gap-3 overflow-hidden  items-center cursor-pointer hover:bg-gray-300 px-2 py-2 transition-all duration-150 ease-in-out ${customer_id === CustomerState?.customer_id && 'bg-gray-200'}`}>
                                        <Image width={50} height={50} className='rounded-full' src={`${AdminUrl}/uploads/customerProfileImages/${picture}`} />
                                        <div className='flex-1 w-full'>
                                            <h1 className='font-semibold'>{given_name} {family_name}</h1>
                                            <div className='flex justify-between w-full overflow-hidden '>
                                                <p className='text-sm text-gray-500 w-1/2 line-clamp-1 overflow-hidden'>{lastMessages.trim() != '' && updateCustomerId === customer_id ? lastMessages : content}</p>
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

            {/* Chat Screen */}
            <div className="flex-grow flex-1 max-md:h-[50vh]">
                {/* Add your chat screen content here */}
                {
                    CustomerState && vendorDatastate ? <ChatScreen customerData={CustomerState} vendorDatastate={vendorDatastate} onSend={handleLastMessage} /> :
                        <div className='flex justify-center items-center h-screen'>
                            <p>Choose Customer to Start Conversation</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default ChatwithCustomers;
