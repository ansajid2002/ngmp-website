import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, notification, Row, Col } from 'antd';
import { AdminUrl } from '../../constant';
import moment from 'moment';
import { BellAlertIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { CgSandClock } from "react-icons/cg";
import { ClockIcon } from '@heroicons/react/20/solid';


const Wallets = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [customerModalVisible, setCustomerModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Simulate fetching transactions from the server
    useEffect(() => {
        // Replace this with your actual API call to fetch transactions
        const fetchTransactions = async () => {
            try {
                // Example: Fetch transactions from your backend API
                const response = await fetch(`${AdminUrl}/api/wallet_transactions_get`);
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleCustomerClick = (record) => {
        setSelectedCustomer(record);
        setCustomerModalVisible(true);
    };

    const handleVerify = (record) => {
        // Simulate an API call to update the verification status
        // Replace this with your actual API endpoint
        // For demonstration purposes, we'll just update the local state
        setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
                transaction.transaction_id === record.transaction_id
                    ? { ...transaction, is_verified: true, verification_date: new Date().toISOString() }
                    : transaction
            )
        );

        setSelectedTransaction(record);
        setModalVisible(true);

        notification.success({
            message: 'Transaction Verified',
            description: `Transaction ${record.transaction_id} has been successfully verified.`,
        });
    };

    return (
        <div className="md:ml-72 py-8">
            <h1 className="text-2xl font-bold mb-4">Wallets - Transaction Verification</h1>

            {/* Grid or Card Layout */}
            <div className='grid grid-cols-3 gap-4'>
                {transactions.map((transaction) => (
                    <div key={transaction.transaction_id} className='shadow-sm hover:shadow-lg h-[350px]'>
                        <Card
                            title={`#${transaction.transaction_id}`}
                            extra={<a onClick={() => handleCustomerClick(transaction)}>View Customer</a>}
                            className="h-full"
                        >
                            <p>
                                <strong>Customer ID:</strong> {transaction.customer_id}
                            </p>
                            <p>
                                <strong>Amount:</strong> {transaction.amount}
                            </p>
                            <p>
                                <strong>Currency Code:</strong> {transaction.currency_code}
                            </p>
                            <p>
                                <strong>Transaction Date:</strong> {moment(transaction.transaction_date).format('LLL')}
                            </p>
                            <div className='flex justify-end w-full'>
                                {transaction.is_verified ? <div className='w-full flex items-center justify-end'>
                                    <CheckBadgeIcon className='w-1/4 text-green-500' />
                                    <p className='text-green-500'>Verified</p>
                                </div>
                                    : <div className='w-full items-center flex justify-end'>
                                        <ClockIcon className='w-1/4 text-red-600' />
                                        <p className='text-red-500'>Pending</p>

                                    </div>

                                }
                            </div>

                            <Button type="default" onClick={() => handleVerify(transaction)}>
                                Verify
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Verification Modal */}
            <Modal
                title={`Verify Transaction ${selectedTransaction?.transaction_id}`}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setModalVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                {/* You can customize the content of the modal based on your needs */}
                <p>Verification details for Transaction {selectedTransaction?.transaction_id}:</p>
                <p>Status: Verified</p>
                <p>Verification Date: {selectedTransaction?.verification_date}</p>
                {/* Add more details or components as needed */}
            </Modal>

            {/* Customer Details Modal */}
            <Modal
                title={`Customer Details - ID: ${selectedCustomer?.customer_id}`}
                visible={customerModalVisible}
                onCancel={() => setCustomerModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setCustomerModalVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                {/* Display customer details here */}
                <p>
                    <strong>Given Name:</strong> {selectedCustomer?.given_name}
                </p>
                <p>
                    <strong>Family Name:</strong> {selectedCustomer?.family_name}
                </p>
                <p>
                    <strong>Email:</strong> {selectedCustomer?.email}
                </p>
                <p>
                    <strong>Picture:</strong> {selectedCustomer?.picture}
                </p>
                {/* Add more details as needed */}
            </Modal>
        </div>
    );
};

export default Wallets
