import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import moment from 'moment';
import { AdminUrl } from '../../constant';
import AdminChatScreen from './AdminChatScreen';
import { BiSearch } from 'react-icons/bi';

const AdminChatwithCustomers = () => {
    const [error, setError] = useState('')
    const [conversations, setConversations] = useState(0)
    const [allVendors, setAllVendors] = useState(null)
    const [CustomerState, setCustomerState] = useState(null)
    const [lastMessages, setLastMessage] = useState('')
    const [updateCustomerId, setCustomerId] = useState(null)
    const [vendor, setVendor] = useState(null)
    const [FilteredVendors, setFilteredVendors] = useState(null)
    const [searchValueVendor, setSearchValueVendor] = useState('');

    const fetchConversations = async () => {
        try {
            const response = await fetch(`${AdminUrl}/api/conversationsListforVendors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
                body: JSON.stringify({ vendorId: vendor?.id })
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

    const fetchVendors = async () => {
        try {
            const response = await fetch(`${AdminUrl}/api/allVendors`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers as needed, such as authorization token
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }
            const vendors = await response.json();
            setAllVendors(vendors?.vendors)
            setFilteredVendors(vendors?.vendors)

            if (vendors?.error) {
                setError(vendors?.error)
            }
        } catch (error) {
            console.error('Error fetching conversations:', error.message);
        }
    };

    useEffect(() => {
        fetchVendors()
    }, [])

    useEffect(() => {
        fetchConversations();
    }, [vendor]);

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
    }

    const handleVendors = (vendor) => {
        setVendor(vendor)
        setConversations(null)
        setCustomerState(null)
    }

    const handleLastMessage = (lastMessages, customer_id) => {
        setLastMessage(lastMessages)
        setCustomerId(customer_id)
    }

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.trim().toLowerCase(); // Trim and convert to lowercase

        // If searchValue is empty or not provided, return the full list of vendors
        if (!searchValue) {
            setSearchValueVendor('');
            setFilteredVendors(allVendors); // Assuming you have a state variable for filtered vendors
            return;
        }

        // Filter vendors based on vendorname or brand_name containing the search value
        const filteredVendors = allVendors.filter(
            (vendor) =>
                vendor.vendorname.toLowerCase().includes(searchValue) ||
                vendor.brand_name.toLowerCase().includes(searchValue)
        );

        setSearchValueVendor(event.target.value);
        setFilteredVendors(filteredVendors); // Assuming you have a state variable for filtered vendors
    };


    return (
        <div className="lg:flex h-[85vh] sm:ml-72">

            {/* User List (visible on larger screens) */}
            <div className={` h-[30vh] lg:h-[85vh] transition-all ease-in-out duration-200 lg:w-1/4 bg-white overflow-y-auto border`} >
                {/* Add your user list content here */}
                <div className='flex items-center border-b'>
                    <BiSearch className='ml-2 text-xl text-gray-400' />
                    <input
                        type="text"
                        value={searchValueVendor}
                        onChange={handleSearchChange}
                        placeholder="Search vendors..."
                        className="py-2 border-b w-full border-none focus:ring-0"
                    />
                </div>
                {
                    !FilteredVendors ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => renderSkeleton(index)) :
                        FilteredVendors?.length > 0
                            ? (
                                FilteredVendors.map((item, index) => {
                                    const { brand_name, brand_logo, vendorname, id } = item
                                    return <div key={index} onClick={() => handleVendors(item)} className={`${vendor?.id === id && 'bg-gray-200'} flex gap-3  items-center cursor-pointer hover:bg-gray-300 p-4 transition-all duration-150 ease-in-out `}>
                                        <Image width={50} height={50} className='rounded-full object-contain' src={`${AdminUrl}/uploads/vendorBrandLogo/${brand_logo?.images[0]}`} />
                                        <div className='flex-1'>
                                            <h1 className='font-semibold'>{brand_name} </h1>
                                            <p>{vendorname}</p>
                                        </div>
                                    </div>
                                }
                                )
                            )
                            : <div className='p-2 flex justify-center items-center mt-10'>
                                <p className='font-semibold'>No Vendor's Found</p>
                            </div>
                }
            </div>

            <div className={` h-[30vh] lg:h-[85vh] transition-all ease-in-out duration-200 lg:w-1/4 bg-white overflow-y-auto border`} >
                {/* Add your user list content here */}
                <h1 className='p-2 flex justify-center text-base font-semibold border-b'>Customer's List</h1>

                {
                    conversations === 0 ? '' :
                        !conversations ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => renderSkeleton(index)) :
                            conversations?.length > 0
                                ? (
                                    conversations.map((item, index) => {
                                        const { given_name, family_name, picture, customer_id } = item?.CustomerDetails
                                        const { content, timestamp } = item?.lastMessages[index]
                                        return <div key={index} onClick={() => handleCustomerChat(item?.CustomerDetails)} className={`flex gap-3  items-center cursor-pointer hover:bg-gray-300 p-4 transition-all duration-150 ease-in-out ${customer_id === CustomerState?.customer_id && 'bg-gray-200'}`}>
                                            <Image width={50} className='rounded-full' src={`${AdminUrl}/uploads/customerProfileImages/${picture}`} />
                                            <div className='flex-1'>
                                                <h1 className='font-semibold'>{given_name} {family_name}</h1>
                                                <div className='flex justify-between w-full'>
                                                    <p className='text-sm text-gray-500 w-1/3 line-clamp-1'>{lastMessages.trim() != '' && updateCustomerId === customer_id ? lastMessages : content}</p>
                                                    <p className='text-sm text-gray-500'>{moment(timestamp).calendar()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    )
                                )
                                : <div className='p-2 flex justify-center items-center mt-10'>
                                    <p className='font-semibold'>No Conversations Found</p>
                                </div>
                }
            </div>

            {/* Chat Screen */}
            <div className="flex-grow flex-1 max-md:h-[50vh]">
                {/* Add your chat screen content here */}
                {
                    CustomerState ? <AdminChatScreen customerData={CustomerState} vendorDatastate={vendor} onSend={handleLastMessage} /> :
                        <div className='flex justify-center items-center h-screen'>
                            <p>Choose Customer to Read Conversation</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default AdminChatwithCustomers;
