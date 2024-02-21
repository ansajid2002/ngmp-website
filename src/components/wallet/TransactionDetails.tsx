import React, { useState, useEffect } from 'react';
import { Table, Spin, Pagination, Image, Input } from 'antd';
import { AdminUrl } from '@/app/layout';
import moment from 'moment';
import { Download, LucideArrowDown, LucideArrowUp, Pause } from 'lucide-react';
import { formatCurrency } from '../AvailableToken';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const TransactionDetails = ({ customer_id, transactions, total, current, onPageChange }: any) => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, []);


  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const checkPaidStatus = async (invoiceId: any) => {
    try {
      setLoading(true)
      // Make an API request to check the paid status based on invoiceId
      const response = await fetch(`/api/Issue-Invoice/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceId }),
      });

      // Dismiss the loading message after a short delay
      const data = await response.json();

      console.log(data);

      // Check if the response indicates a successful status
      if (data?.eDahabData?.StatusCode === 0 && data?.eDahabData?.InvoiceStatus === 'Paid') {
        onPageChange(1, 10, '');
        // Show an alert indicating that the payment has been received
        alert('The payment has been received. Your transaction is now paid.');
      } else {
        // Handle cases where the payment is not successful or other errors
        alert(data?.error);
      }
    } catch (error) {
      // Handle errors
      console.error('Error checking paid status:', error);
      alert('An error occurred while checking the paid status. Please try again later.');
    } finally {
      setLoading(false)
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      width: 80
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_: any, record: any) => (
        record.status === 'paid' ? (
          record.amount < 0 ? (
            <LucideArrowDown color='red' />
          ) : (
            <LucideArrowUp color="green" />
          )
        ) : (
          <div className='flex flex-col justify-center items-center' onClick={() => checkPaidStatus(record.invoiceid)}>
            <Pause color='orange' />
            <p className='text-sm text-blue-600 cursor-pointer text-center'>Check Paid Status</p>
          </div>
        )
      )
    },
    {
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
      width: 200,
      render: (datetime: any) => (
        <p>{moment(datetime).format("LLL")}</p>
      )
    },
    {
      title: 'Sender',
      dataIndex: '_',
      key: '_',
      width: 200,
      render: (text: string, record: any) => {
        const imageUrl = record.picture
          ? (record.picture.startsWith('https') ? record.picture : `${AdminUrl}/uploads/customerProfileImages/${record.picture}`)
          : '/noimage.jpg';

        console.log(record);

        return (
          <div className='flex justify-center items-center'>
            <div className='flex justify-center'>
              <Image src={imageUrl} width={50} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-start p-2'>
              <p className='text-sm font-semibold text-gray-700'>Id-  {record.customer_id}</p>
              <p className='text-sm font-semibold text-gray-700'>{record.given_name} {record.family_name}</p>
            </div>
          </div >
        );
      },
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
      render: (text: string, record: any) => <p className='text-red-500 font-semibold text-xl'>{(record.amount < 0 ? formatCurrency(record.amount) : '-')}</p>,
    },
    {
      title: 'Credit',
      dataIndex: 'amount',
      key: 'amount',
      width: 200,
      render: (text: string, record: any) => <p className={`${record.status === 'paid' ? 'text-green-500' : 'text-orange-500'} font-semibold text-xl`}>{(record.amount > 0 ? formatCurrency(record.amount) : '-')}</p>,
    },
    {
      title: 'Closing Balance',
      dataIndex: 'closing_balance',
      key: 'closing_balance',
      width: 200,
      render: (text: string, record: any) => <p className='text-green-500 font-semibold text-xl'>{(record.closing_balance > 0 ? formatCurrency(record.closing_balance) : '-')}</p>,
    },

  ];

  const handleSearch = (value: any) => {
    onPageChange(1, 10, value)
    setSearchValue(value)
  };

  const handleDownload = async (type: any) => {
    const pdf = new jsPDF();

    if (type === 'All') {
      const response = await fetch(`${AdminUrl}/api/AllfetchCustomerTransaction_Customer_ID?customer_id=${customer_id}&search=${searchValue}`);
      const data = await response.json();

      // Add content to the PDF, you can customize this based on your needs
      pdf.text(`Customer Id- ${customer_id}`, 10, 10);
      pdf.autoTable({
        head: [
          ["ID", "Datetime", "Description", "Wallet Txn Id", "Debit", "Credit"],
        ],
        body: data?.transactions.map((transaction: any) => [
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
      pdf.text(`Customer Id- ${customer_id}`, 10, 10);
      pdf.autoTable({
        head: [
          ["Transaction ID", "Datetime", "Description", "Wallet Transaction Id", "Debit", "Credit"],
        ],
        body: transactions.map((transaction: any) => [
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
    <div className='border-t border-gray-300'>
      <div className='flex justify-between items-center  mt-10'>
        <div>
          <h1 className='text-xl font-semibold py-4'>{total > 1 ? 'Recents' : 'Recent'} ({total})</h1>
        </div>
        <div className='w-2/3'>
          <Input.Search
            placeholder="Search transactions with Name, Email, wallet tranaction id...."
            onSearch={handleSearch}
            defaultValue={searchValue}
          />
        </div>
        <div className='relative inline-block text-left'>
          <div className='relative inline-block text-left'>
            <button onClick={handleDropdownToggle} className='flex justify-center items-center gap-2'>
              <Download className='text-rose-500 text-2xl cursor-pointer' />
              <p className='cursor-pointer'>Download</p>
            </button>

            {isOpen && (
              <div className='z-[9999] origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <div onClick={() => handleDownload('')} className='group flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-100'>
                    <Download className='text-rose-500 text-xl group-hover:text-rose-600' />
                    <p className='group-hover:text-rose-600'>Download Only 10</p>
                  </div>
                  <div onClick={() => handleDownload('All')} className='group flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-100'>
                    <Download className='text-rose-500 text-xl group-hover:text-rose-600' />
                    <p className='group-hover:text-rose-600'>Download All</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={transactions}
          columns={columns}
          rowKey="transaction_id"
          pagination={false}
          scroll={{
            x: 1200,
            y: 600
          }}
        />

        <div className='flex justify-end py-4'>
          <Pagination
            current={current}
            total={total}
            onChange={(page, pageSize) => onPageChange(page, pageSize, searchValue)}
          />
        </div>
      </Spin>
    </div>
  );
};

export default TransactionDetails;
