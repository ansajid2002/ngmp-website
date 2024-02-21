import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Popconfirm, message } from 'antd';
import { AdminUrl } from '../../constant';
import axios from 'axios';

const CustomerAddress = () => {
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        const fetchAddress = () => {
            // Replace 'backendBannersUrl' with the actual endpoint to fetch banners
            const backendurl = `${AdminUrl}/api/getAddressForAdminBackend`;

            axios.get(backendurl)
                .then((response) => {
                    // Filter banners with non-empty 'banner_url' before updating the state
                    if (response.data) {
                        setCustomers(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch Address:', error);
                });
        };

        // Fetch banners from the backend when the component mounts
        fetchAddress();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => `${record.given_name} ${record.family_name}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => showModal(record)}>
                    View Addresses ({record.addresses?.length})
                </Button>
            ),
        },
    ];

    const showModal = (customer) => {
        setSelectedCustomer(customer);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleRemove = async (addressId) => {
        try {
            // Send a request to remove the address
            const response = await fetch(`${AdminUrl}/api/RemoveCustomerAddress/${addressId}`, {
                method: 'GET',
            });

            if (response.status === 200) {
                message.success('Address deleted successfully');

                // Update the table by removing the deleted address
                const updatedCustomers = customers.map((customer) => {
                    const updatedAddresses = customer.addresses.filter(
                        (address) => address.address_id !== addressId
                    );

                    return {
                        ...customer,
                        addresses: updatedAddresses,
                    };
                });

                setCustomers(updatedCustomers);
                // If you have an external callback to update the parent component or Redux store, call it here
                // Update the selectedCustomers array by removing the deleted address
                const updatedSelectedCustomers = selectedCustomer.map((selectedCustomer) => {
                    const updatedSelectedAddresses = selectedCustomer.addresses.filter(
                        (address) => address.address_id !== addressId
                    );

                    return {
                        ...selectedCustomer,
                        addresses: updatedSelectedAddresses,
                    };
                });

                setSelectedCustomer(updatedSelectedCustomers);

            } else {
                message.error('Failed to delete address');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            message.error('An error occurred while deleting the address');
        }
    };

    const addressColumns = [
        {
            title: 'Apartment',
            dataIndex: 'apt_address',
            key: 'apt_address',
        },
        {
            title: 'Subregion',
            dataIndex: 'subregion_address',
            key: 'subregion_address',
        },
        {
            title: 'City',
            dataIndex: 'city_address',
            key: 'city_address',
        },
        {
            title: 'Country',
            dataIndex: 'country_address',
            key: 'country_address',
        },
        {
            title: 'Region',
            dataIndex: 'region_address',
            key: 'region_address',
        },
        {
            title: 'ZIP',
            dataIndex: 'zip_address',
            key: 'zip_address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_address',
            key: 'phone_address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => handleRemove(record.address_id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className='sm:ml-72'>
            <h2 className='mt-4 font-bold text-3xl mb-4'> Customer's Address</h2>
            <Table dataSource={customers} columns={columns} pagination={false} />
            <Modal
                title={`${selectedCustomer?.given_name} ${selectedCustomer?.family_name}'s Addresses`}
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <Table
                    dataSource={selectedCustomer?.addresses || []}
                    columns={addressColumns}
                    pagination={false}
                />
            </Modal>
        </div>
    );
};

export default CustomerAddress;
