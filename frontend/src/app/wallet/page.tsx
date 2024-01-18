import WalletDetails from "@/components/wallet/WalletDetails";
import { ChevronRight } from "lucide-react";
import React from "react";

const Wallet = () => {
  return (
    <div className="md:px-10 pt-5 bg-gradient-to-b from-[#063B69] md:space-y-8">
      <div>
        <ul className="flex items-center justify-center gap-1 text-white">
          <li className=" text-gray-300">Home</li>
          <ChevronRight size={20} />
          <li>Wallet</li>
        </ul>
      </div>

      {/* Wallet Details */}
      <WalletDetails />
    </div>
  );
};

export default Wallet;
