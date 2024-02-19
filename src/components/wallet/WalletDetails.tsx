"use client"

import { ChevronRight, DollarSign, FileText, Wallet } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TransactionDetails from "./TransactionDetails";
import AvailableToken from "../AvailableToken";
import { AdminUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { getwalletTotal } from "@/redux/slices/walletSlice";
import { useDispatch } from "react-redux";

const WalletDetails = ({ showRecent = true }) => {
  const { customerData } = useAppSelector((state) => state.customerData);
  const [recentTransactions, setRecentTransactions] = useState(null);
  const [totalTransactions, setTotalTranasaction] = useState(0);
  const [page, setPage] = useState(1);
  const { walletTotal } = useAppSelector((store) => store.wallet)

  const dispatch = useDispatch()

  const customer_id = customerData?.customer_id

  const listData = [
    {
      id: 2,
      icon1: <Wallet size={16} />,
      text: "Add token to wallet",
      link: "/add-token-wallet",
    },
    {
      id: 1,
      icon1: <DollarSign size={16} />,
      text: "Send token to Nile user",
      link: "/token-transaction",
    },

    // {
    //   id: 3,
    //   icon1: <FileText size={16} />,
    //   text: "Download Report",
    //   link: "#",
    // },
  ];

  const fetchData = async (page: number, pageSize: number, search: any) => {
    try {
      const response = await fetch(`${AdminUrl}/api/fetchCustomerTransaction?customer_id=${customer_id}&page=${page}&pageSize=${pageSize}&search=${search}`); // Replace with your actual API endpoint
      const data = await response.json();
      console.log(data);

      setRecentTransactions(data?.transactions);
      setTotalTranasaction(data?.total);
      dispatch(getwalletTotal(data?.totalBalance));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    customer_id && fetchData(1, 10, '')
  }, [customer_id])
  return (
    <div className="m-3 bg-white px-4 py-5 md:p-10 rounded-t-3xl">
      <div className="flex gap-2 items-center justify-start mb-4">
        <Wallet size={30} color="#063b69" />
        <h2 className="text-2xl font-bold text-[#063b69]">Nile Wallet</h2>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-start gap-3 justify-between">
        {/* -------- */}
        <div>
          {
            showRecent && <div>
              {/* ----- */}
              <div className="text-[#063b69]">
                {listData?.map((item: any, index: any) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="flex font-medium items-center gap-1 py-1 group cursor-pointer"
                  >
                    <span className="flex items-center gap-1">
                      {item.icon1}
                      <h2>{item.text}</h2>
                    </span>
                    <ChevronRight
                      size={20}
                      className="mt-0.5 transition-all ease-in-out group-hover:-rotate-90"
                      color="#ed642b"
                    />
                  </Link>
                ))}
              </div>
            </div>
          }
        </div>
        {/* ------- */}
        <div className="md:border-l-2 md:px-10 border-gray-300">
          <AvailableToken walletTotal={walletTotal} />
        </div>
        {/* --------- */}
      </div>

      {/* Transaction Details */}
      {
        showRecent && <div className="pt-12 pb-5 overflow-hidden overflow-x-auto">
          <TransactionDetails customer_id={customer_id} transactions={recentTransactions} current={page} total={totalTransactions} onPageChange={(page: number, pageSize: number, search: any) => {
            setPage(page)
            fetchData(page, pageSize, search)
          }} />
        </div>
      }
    </div>
  );
};

export default WalletDetails;
