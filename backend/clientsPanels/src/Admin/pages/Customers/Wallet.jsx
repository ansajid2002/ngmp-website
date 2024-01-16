import React, { useState, useEffect } from 'react';
import { Table, Spin, Pagination, Input, Typography } from 'antd';
import { Card, Metric, Text } from "@tremor/react";

import { AdminUrl } from "../../constant";
import moment from 'moment'
import { FaFilePdf } from 'react-icons/fa';
import { jsPDF } from "jspdf";

const Wallet = () => {
    const [walletData, setWalletData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalTransaction, setTotalTransactions] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const fetchData = async (page, pageSize) => {
        setLoading(true)
        try {
            const response = await fetch(`${AdminUrl}/api/AllfetchCustomerTransaction?page=${page}&pageSize=${pageSize}&search=${searchValue}`);
            const data = await response.json();
            setWalletData(data);
            setTotalTransactions(data.total);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1, 10, searchValue);
    }, [searchValue]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            width: 130
        },
        {
            title: 'Datetime',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 250,
            render: (datetime) => (
                <p>{moment(datetime).format("LLL")}</p>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'Wallet Transaction Id',
            dataIndex: 'wallet_txn_id',
            key: 'wallet_txn_id',
            width: 250,
        },
        {
            title: 'Debit',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            render: (text, record) => <p className='text-red-500 font-semibold text-xl'>{(record.amount < 0 ? formatCurrency(record.amount) : '-')}</p>,
        },
        {
            title: 'Credit',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            render: (text, record) => <p className='text-green-500 font-semibold text-xl'>{(record.amount > 0 ? formatCurrency(record.amount) : '-')}</p>,
        },
    ];

    const handleSearch = (value) => {
        setSearchValue(value)
    };

    const handleDownload = async (type) => {
        const pdf = new jsPDF();

        if (type === 'All') {
            const response = await fetch(`${AdminUrl}/api/AllfetchCustomerTransaction?search=${searchValue}`);
            const data = await response.json();

            const pdf = new jsPDF();

            // Add content to the PDF, you can customize this based on your needs
            pdf.text("Customer's Wallet Transactions", 10, 10);
            pdf.autoTable({
                head: [
                    ["Transaction ID", "Datetime", "Description", "Wallet Transaction Id", "Debit", "Credit"],
                ],
                body: data?.transactions.map(transaction => [
                    transaction.transaction_id,
                    moment(transaction.datetime).format("LLL"),
                    transaction.description,
                    transaction.wallet_txn_id,
                    transaction.amount < 0 ? formatCurrency(transaction.amount) : '-',
                    transaction.amount > 0 ? formatCurrency(transaction.amount) : '-',
                ]),
            });

            // Save the PDF
            pdf.save("wallet_transactions.pdf");
        } else {
            // Add content to the PDF, you can customize this based on your needs
            pdf.text("Customer's Wallet Transactions", 10, 10);
            pdf.autoTable({
                head: [
                    ["Transaction ID", "Datetime", "Description", "Wallet Transaction Id", "Debit", "Credit"],
                ],
                body: walletData?.transactions.map(transaction => [
                    transaction.transaction_id,
                    moment(transaction.datetime).format("LLL"),
                    transaction.description,
                    transaction.wallet_txn_id,
                    transaction.amount < 0 ? formatCurrency(transaction.amount) : '-',
                    transaction.amount > 0 ? formatCurrency(transaction.amount) : '-',
                ]),
            });

            // Save the PDF
            pdf.save("wallet_transactions.pdf");
        }

    };

    return (
        <div className="sm:p-4 sm:ml-64">
            <h1 className='text-4xl font-semibold'>Customer's Wallet</h1>

            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 py-10'>
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="pink">
                    <Text>Total Debit Count</Text>
                    <Metric>{walletData?.debitCount}</Metric>
                </Card>
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="purple">
                    <Text>Total Debit Count</Text>
                    <Metric>{walletData?.creditCount}</Metric>
                </Card>
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="green">
                    <Text>Total Amount Transferred</Text>
                    <Metric>{formatCurrency(walletData?.totalAmountTransferred)}</Metric>
                </Card>
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="red">
                    <Text>Total Debit Amount</Text>
                    <Metric className='text-red-500'>{formatCurrency(walletData?.totalDebitAmount)}</Metric>
                </Card>
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="green">
                    <Text>Total Credit Amount</Text>
                    <Metric className='text-green-500'>{formatCurrency(walletData?.totalCreditAmount)}</Metric>
                </Card>
            </div>

            <div className='flex justify-between'>
                <div className='w-2/3'>
                    <Input.Search
                        placeholder="Search transactions with Name, Email, wallet tranaction id...."
                        onSearch={handleSearch}
                        defaultValue={searchValue}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className='flex justify-end gap-4'>
                    <div onClick={() => handleDownload('')} className='flex justify-center items-center gap-2'>
                        <FaFilePdf className='text-rose-500 text-2xl cursor-pointer' />
                        <p className='cursor-pointer'>Download Only ({walletData?.transactions?.length})</p>
                    </div>
                    <div onClick={() => handleDownload('All')} className='flex justify-center items-center gap-2'>
                        <FaFilePdf className='text-rose-500 text-2xl cursor-pointer' />
                        <p className='cursor-pointer'>Download All</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table
                        dataSource={walletData?.transactions}
                        columns={columns}
                        pagination={false}
                        scroll={{
                            x: 1200,
                            y: 600
                        }}
                    // Add other props as needed
                    />
                    <div className='flex justify-end py-4'>
                        <Pagination
                            total={totalTransaction}
                            defaultCurrent={1}
                            onChange={(page, pageSize) => fetchData(page, pageSize, searchValue)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Wallet;
