import { AddTokenToWalletForm } from "@/components/AddTokenToWalletForm";
import HowItWorksInfoGraphic from "@/components/wallet/HowItWorksInfoGraphic";
import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  // const features = [
  //   {
  //     id: 1,
  //     title: "Instant Transaction:",
  //     list: [
  //       "Enjoy lightning-fast transactions for quick and efficient payments.",
  //       "Instantly transfer funds to other Nile Wallet users.",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Security Measures:",
  //     list: [
  //       "State-of-the-art encryption ensures the security of your financial data.",
  //       "Two-factor authentication (2FA) adds an extra layer of protection to your account.",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Multi-Currency Support:",
  //     list: [
  //       "Nile Wallet supports multiple currencies, allowing you to manage funds in your preferred currency.",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Transaction History:",
  //     list: [
  //       "Access a detailed transaction history to track your spending and monitor your financial activities.",
  //     ],
  //   },
  // ];
  return (
    <div className="md:px-10 pt-5 bg-gradient-to-b from-[#063B69]">
      <div className="flex flex-col-reverse md:flex-row m-3 bg-white px-4 py-5 md:p-10 rounded-t-3xl">
        <div className="md:w-1/2 md:pr-20 space-y-5">
          {/* <div className="flex gap-2 items-center justify-start mb-3">
            <Wallet size={30} color="#063b69" />
            <h2 className="text-2xl font-bold text-[#063b69]">
              How Nile Wallet System Works!
            </h2>
          </div> */}
          {/* <div>
            {features?.map((item: any, index: any) => (
              <div key={index} className="py-2 space-y-1">
                <h3 className="text-xl font-semibold text-[#ed642b]">
                  {item.title}
                </h3>
                <ul className="list-disc px-5 text-[0.9rem] text-gray-800 leading-snug">
                  {item.list?.map((item: any, index: any) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
          <div className="space-y-5">
            <HowItWorksInfoGraphic />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-[#063b69]">
                Support and Assistance
              </h3>
              <p className="text-[0.9rem] text-gray-800 leading-snug">
                If you have any questions or encounter issues while using Nile
                Wallet, our dedicated support team is here to help. Visit the '
                <Link
                  href={"/SupportCenter?querys=BuyingOnNile"}
                  target="blank"
                >
                  <span className="text-[#ed642b] font-medium">Support</span>
                </Link>
                ' section for FAQs, tutorials, and{" "}
                <Link href={"/contact-us"} target="blank">
                  <span className="text-[#ed642b] font-medium">contact</span>
                </Link>{" "}
                information.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-[#063b69]">
                Terms and Conditions
              </h3>
              <p className="text-[0.9rem] text-gray-800 leading-snug">
                Before using Nile Wallet, make sure to review the{" "}
                <Link href={"/company/terms-conditions"} target="blank">
                  <span className="text-[#ed642b] font-medium">
                    terms and conditions
                  </span>
                </Link>{" "}
                to understand your rights and responsibilities. By using Nile
                Wallet, you agree to abide by these terms.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-[#063b69]">
                Stay Connected
              </h3>
              <p className="text-[0.9rem] text-gray-800 leading-snug">
                Follow us on social media to stay updated on new features,
                promotions, and security tips.{" "}
                <Link href={"/wallet"} target="blank">
                  <span className="text-[#ed642b] font-medium">
                    Nile Wallet
                  </span>
                </Link>{" "}
                is committed to providing a secure and user-friendly experience
                for all our users.
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mb-5">
          <AddTokenToWalletForm />
        </div>
      </div>
    </div>
  );
};

export default page;
