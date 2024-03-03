"use client"

import { AdminUrl } from '@/app/layout';
import { Image, Input } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'

const ChatScreen = ({ vendorData, customerData, onSend, predefinedText = "" }) => {
    const { brand_logo, brand_name, id } = vendorData || {}
    const customerId = customerData?.customer_id
    const [message, setMessage] = useState(atob(predefinedText));
    const [conversations, setConversationMessage] = useState([]);
    const [loader, setLoader] = useState(false);
    const flatListRef = useRef(null);
    const [inputRows, setInputRows] = useState(1);

    console.log(atob(predefinedText), "SAHGIASFDFC ");

    const fetchConversations = async () => {
        setLoader(true)
        try {
            const response = await fetch(`/api/Customers/getConversationMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId,
                    vendorId: id,
                    type: 'customer',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const responseData = await response.json();

            // Update the state with the fetched messages
            setConversationMessage(responseData.messages);

        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false)
        }
    };

    useEffect(() => {
        // Define your function

        // Set up a timer to call the function every 3 seconds
        fetchConversations()

        // Cleanup the interval when the component is unmounted
    }, [id]); // The empty dependency array ensures that this effect runs only once on mount


    useEffect(() => {
        // Auto-scroll to the end when a new message is added
        if (flatListRef.current) {
            const scrollHeight = flatListRef.current.scrollHeight;
            const clientHeight = flatListRef.current.clientHeight;

            console.log(scrollHeight, clientHeight);
            flatListRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [message, conversations]);

    const renderLoader = () => {
        return <div className='h-screen flex justify-center items-center'>Loading Chats....</div>
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        // Check if the pressed key is the "Enter" key (key code 13)
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
            onSend(message, id)
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            // If Shift + Enter is pressed, add a newline character
            setMessage((prevMessage) => prevMessage + '\n');
            setInputRows((prevRows) => prevRows + 1);
            e.preventDefault(); // Prevent the default behavior of the Enter key
        }
    };


    const handleSendMessage = async () => {
        if (message.trim() === '') return;
        try {
            // Send message to backend
            const response = await fetch(`/api/Customers/sendInboxMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
                body: JSON.stringify({
                    senderId: customerId, // the sender ID,
                    recipientId: id,// the recipient ID,
                    content: message,
                    timestamp: moment().format(),
                    userType: 'customer'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Parse the response or handle success as needed
            const responseData = await response.json();
            console.log('Message sent successfully:', responseData);

            // Update the local state or trigger a reload of conversations if needed
            const updatedMessages = [...conversations, { text: message, sender: 'customer', timestamp: moment().format() }];
            setConversationMessage(updatedMessages);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
            // Handle the error (show a notification, etc.)
        }
    };

    const groupByDate = (messages: any) => {
        const groupedMessages = {};
        messages.forEach((message: any) => {
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
        <div className='overflow-hidden'>
            <div className='flex gap-3 items-center p-5 bg-white'>
                <Image width={50} className='rounded-full' src={`${AdminUrl}/uploads/vendorBrandLogo/${brand_logo?.images?.[0]}`} />
                <div className='flex-1'>
                    <h1 className='font-semibold'>{brand_name}</h1>
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
                                    {messages && messages.map((message, index) => (
                                        <div key={index} className={`flex transition-all duration-100 ease-in-out ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`flex-row m-2 p-4 transition-all duration-100 ease-in-out ${message.sender === 'customer' ? 'bg-green-300' : 'bg-gray-100'} rounded-md`}
                                            >
                                                <span className="mr-2">{message.text}</span>
                                                <span className={`relative -bottom-2 flex justify-end items-end text-sm ${message.sender === 'customer' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {moment(message.timestamp.toLocaleString()).format('LT')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                }
                <div className="sticky bottom-0 min-w-full flex items-center bg-gray-200 p-2">
                    <Input.TextArea
                        rows={inputRows}
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-2 rounded-full border-none focus:outline-none"
                    />
                    <button
                        type="submit"
                        // onClick={handleSendMessage}
                        className=" absolute right-4 flex justify-center items-center text-gray-500 px-4 py-2 rounded-full ml-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ChatScreen