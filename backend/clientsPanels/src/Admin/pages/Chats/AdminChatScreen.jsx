import { Button, Image, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi';
import moment from 'moment';
import { AdminUrl } from '../../constant';


const AdminChatScreen = ({ customerData, vendorDatastate, onSend }) => {
    const { picture, given_name, family_name, customer_id } = customerData || {}
    const [conversations, setConversationMessage] = useState([]);
    const [loader, setLoader] = useState(false);
    const flatListRef = useRef(null);

    const vendorId = vendorDatastate?.id

    useEffect(() => {
        fetchConversations(true);
    }, [customer_id]);

    const fetchConversations = async (addLoader) => {
        setLoader(addLoader)
        try {
            const response = await fetch(`${AdminUrl}/api/getConversationMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: customer_id,
                    vendorId,
                    type: 'vendor',

                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }

            const responseData = await response.json();

            // Update the state with the fetched conversations
            setConversationMessage(responseData.messages);

        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false)
        }
    };


    useEffect(() => {
        // Auto-scroll to the end when a new message is added
        if (flatListRef.current) {
            const scrollHeight = flatListRef.current.scrollHeight;
            const clientHeight = flatListRef.current.clientHeight;

            console.log(scrollHeight, clientHeight);
            flatListRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [conversations]);

    const renderLoader = () => {
        return <div className='h-screen flex justify-center items-center'>Loading Chats....</div>
    }

    const groupByDate = (messages) => {
        const groupedMessages = {};
        messages.forEach((message) => {
            const date = moment(message.timestamp).format('LL');
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            groupedMessages[date].push(message);
        });
        return groupedMessages;
    };

    const groupedConversations = groupByDate(conversations);

    return (
        <div className='overflow-hidden bg-gray-200 border'>
            <div className='flex gap-3 items-center p-5 bg-white'>
                <Image width={50} className='rounded-full' src={`${AdminUrl}/uploads/customerProfileImages/${picture}`} />
                <div className='flex-1'>
                    <h1 className='font-semibold'>{given_name} {family_name}</h1>
                </div>
                <div className='p-2 flex justify-center items-center gap-2 cursor-pointer text-sky-500' onClick={fetchConversations}>
                    <p className='text-sm tracking-wide'>Reload</p>
                </div>
            </div>

            <div className='overflow-y-auto relative h-[45vh] lg:h-[75vh] overflow-hidden transition-all duration-100 ease-in-out' ref={flatListRef}>
                {
                    loader ? renderLoader() :
                        <div className='mb-4 p-2 flex flex-col  transition-all duration-100 ease-in-out' >
                            {Object.entries(groupedConversations).map(([date, messages], index) => (
                                <div key={index}>
                                    <div className='flex justify-center sticky top-0 transition-all duration-100 ease-in-out'>
                                        <h2 className="text-center my-4 bg-gray-300 p-2 rounded-full text-sm px-4 font-semibold text-gray-600">{date}</h2>
                                    </div>
                                    {messages.map((message, index) => (
                                        <div key={index} className={`flex transition-all duration-100 ease-in-out ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`flex-row m-2 p-4 transition-all duration-100 ease-in-out ${message.sender === 'vendor' ? 'bg-green-300' : 'bg-white'} rounded-md`}
                                            >
                                                <span className="mr-2">{message.text}</span>
                                                <span className={`relative -bottom-2 items-end text-sm ${message.sender === 'vendor' ? 'text-gray-600' : 'text-gray-300'}`}>
                                                    {moment(message.timestamp.toLocaleString()).format('LT')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                }

            </div>
        </div >
    )
}

export default AdminChatScreen