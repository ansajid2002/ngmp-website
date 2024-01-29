"use client"
import { HomeUrl } from "@/app/layout";
import { t } from "i18next";
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
        <div className="bg-[#0A8800] hover:bg-[#0A8800]/90 text-white text-sm md:text-base lg:text-lg font-semibold cursor-pointer px-2 py-3 flex items-center justify-between rounded-lg">
          <div>
            <ul className="flex flex-wrap gap-3 md:gap-4 ">
              <li className="flex items-center gap-1">
                <ShieldCheck size={20} className="hidden md:block" />
                <span>{t("Safe payments")}</span>
              </li>
              <li className="flex items-center gap-1">
                <Truck size={20} className="hidden md:block" />
                <span>{t("Secure logistics")}</span>
              </li>
              <li className="flex items-center gap-1">
                <LockKeyhole size={20} className="hidden md:block" />
                <span>{t("Secure privacy")}</span>
              </li>
              <li className="flex items-center gap-1">
                <ShieldEllipsis size={20} className="hidden md:block" />
                <span className="hidden md:block">{t("Purchase protection")}</span>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-1">
                <span className="hidden md:block">{t("Nile keeps you safe")}</span>
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
