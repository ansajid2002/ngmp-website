import { Button, Image, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { AdminUrl } from '../../Admin/constant';
import { FiSend } from 'react-icons/fi';
import moment from 'moment';

const ChatScreen = ({ customerData, vendorDatastate, onSend }) => {
    const { picture = '', given_name = '', family_name = '', customer_id = null } = customerData || {}
    const [message, setMessage] = useState('');
    const [conversations, setConversationMessage] = useState([]);
    const [loader, setLoader] = useState(false);
    const flatListRef = useRef(null);
    const [inputRows, setInputRows] = useState(1);

    const vendorId = vendorDatastate?.[0]?.id || null

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        // Check if the pressed key is the "Enter" key (key code 13)
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
            onSend(message, customer_id)
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

    useEffect(() => {
        fetchConversations(true);
    }, [customer_id, vendorId]);

    const fetchConversations = async (addLoader) => {
        setLoader(addLoader)
        try {
            if (!vendorId && !customer_id) return
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

    const handleSendMessage = async () => {
        if (message.trim() === '') return;
        try {
            // Send message to backend
            const response = await fetch(`${AdminUrl}/api/sendInboxMessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
                body: JSON.stringify({
                    senderId: vendorId, // the sender ID,
                    recipientId: customer_id,// the recipient ID,
                    content: message,
                    timestamp: moment().format(),
                    userType: 'vendor'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Parse the response or handle success as needed
            const responseData = await response.json();
            console.log('Message sent successfully:', responseData);

            // Update the local state or trigger a reload of conversations if needed
            const updatedMessages = [...conversations, { text: message, sender: 'vendor', timestamp: moment().format() }];
            setConversationMessage(updatedMessages);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
            // Handle the error (show a notification, etc.)
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
    }, [message, conversations]);


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
        <div className='overflow-hidden'>
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
                                                <span className={`relative -bottom-2 flex justify-end items-end text-sm ${message.sender === 'vendor' ? 'text-gray-600' : 'text-gray-300'}`}>
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
                        onClick={handleSendMessage}
                        className=" absolute right-4 flex justify-center items-center text-gray-500 px-4 py-2 rounded-full ml-2"
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ChatScreen