import React from "react";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};


const AvailableToken = ({ walletTotal }: any) => {
  return (
    <div>
      <h2 className=" font-medium text-[#063b69]">Available Nile Token</h2>
      <h2 className="text-green-700 text-3xl font-bold mt-1">
        {formatCurrency(walletTotal)}
      </h2>
    </div>
  );
};

export default AvailableToken;
