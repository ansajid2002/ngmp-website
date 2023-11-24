"use client"
import { HomeUrl } from "@/app/layout";
import {
  ChevronRight,
  LockKeyhole,
  ShieldCheck,
  ShieldEllipsis,
  Truck,
} from "lucide-react";
import React from "react";

const Safety = () => {
  return (
    <>
      <a href={`${HomeUrl}/commitments`} target="_blank">
        <div className="bg-gray-200 cursor-pointer text-[0.8rem] md:text-[0.9rem] font-medium hover:bg-gray-300 px-2 py-3 flex items-center justify-between">
          <div>
            <ul className="flex flex-wrap gap-3 md:gap-4 ">
              <li className="flex items-center gap-1">
                <ShieldCheck size={20} className="hidden md:block" />
                <span>Safe payments</span>
              </li>
              <li className="flex items-center gap-1">
                <Truck size={20} className="hidden md:block" />
                <span>Secure logistics</span>
              </li>
              <li className="flex items-center gap-1">
                <LockKeyhole size={20} className="hidden md:block" />
                <span>Secure privacy</span>
              </li>
              <li className="flex items-center gap-1">
                <ShieldEllipsis size={20} className="hidden md:block" />
                <span className="hidden md:block">Purchase protection</span>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-1">
                <span className="hidden md:block">Nile keeps you safe</span>
                <ChevronRight size={20} className="mt-1" />
              </li>
            </ul>
          </div>
        </div>
      </a>

    </>
  );
};

export default Safety;
