'use client'

import { Button, Input } from 'antd';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AdminUrl } from '../layout';
import { useAppSelector } from '@/redux/store';

const AddMoney = () => {
  const [edahabNumber, setEdahabNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const { customerData } = useAppSelector((state) => state.customerData);
  const customer_id = customerData?.customer_id

  const handleAmountOptionClick = (selectedAmount: any) => {
    setAmount(selectedAmount);
  };

  const handleAddMoney = async () => {
    setLoadingButton(true)

    try {
      if (edahabNumber.trim() === '') return alert('eDahab Number is Required..')
      if (amount.trim() === '') return alert('Amount is Required..')
      // Call your API to add money and get the payment link
      const response = await fetch(`/api/Issue-Invoice/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount), customerId: customer_id, edahabNumber, returnUrl: 'https://www.stg.nilegmp.com/ThankYou' }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // Check StatusCode and show a simple alert or validation errors
        if (data.StatusCode === 0) {
          // Show a simple alert with a link to pay
          console.log(data);
          if (data.StatusCode === 0) {
            window.location.href = `https://edahab.net/API/Payment?invoiceId=${data.InvoiceId}`;
          }


        } else {
          // Show validation errors in an alert
          const validationErrors = data.ValidationErrors.map((error: any) => error.ErrorMessage).join('\n');
        }
      } else {
        // Show a simple alert with an error message
        alert('Failed to issue invoice. Please try again later.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error adding money:', error);

      // Show a simple alert with an error message
      alert('An error occurred. Please try again later.');
    } finally {
      setLoadingButton(false)
    }
  };

  return (
    <div className="md:px-10 pt-5 bg-gradient-to-b from-[#063B69] md:space-y-8">
      <div>
        <ul className="flex items-center justify-center gap-1 text-white">
          <Link href="/" className=" text-gray-300">
            Home
          </Link>
          <ChevronRight size={20} />
          <Link href="/wallet">Wallet</Link>
          <ChevronRight size={20} />
          <li>Add Token to Wallet</li>
        </ul>
      </div>

      {/* Wallet Details */}

      <div className="bg-white h-full p-4 rounded-md">
        <h1 className="text-xl font-semibold tracking-wide md:text-2xl">Add Money to Nile Wallet</h1>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Input for eDAHAB Number */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">eDAHAB Number</label>
            <Input
              type="number"
              value={edahabNumber}
              onChange={(e) => setEdahabNumber(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Input for Amount */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <div className="flex items-center gap-2">
              {[500, 1000, 2000, 5000].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAmountOptionClick(option)}
                  className="px-3 py-2 my-4 mx-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500"
                >
                  ${option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center my-10'>
          <Button loading={loadingButton} onClick={handleAddMoney} className='bg-blue-500 text-white !hover:text-white ' > Add Money</Button>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
