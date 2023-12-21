import { Wallet } from "lucide-react";
import React from "react";

const HowItWorksInfoGraphic = () => {
  const steps = [
    "Transfer money to Nile bank account",
    "Fill out details in the form",
    "Admin will verify the details",
    "Nile token will be added to your wallet",
    "Enjoy shopping on Nile!",
  ];
  return (
    <div className="w-ful mb-5">
      <div className="flex gap-2 items-center justify-start mb-3">
        {/* <Wallet size={30} color="#063b69" /> */}
        <h2 className="text-2xl font-bold text-[#063b69]">How It Works ?</h2>
      </div>
      <div>
        {steps?.map((item: any, index: any) => (
          <div
            key={index}
            className="flex gap-3 items-center text-white rounded-r-full px-3 py-2 mb-1 bg-[#063b69]"
          >
            <h2 className="text-4xl font-bold">0{index + 1}</h2>
            <h2 className="md:text-lg tracking-wider">{item}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksInfoGraphic;
