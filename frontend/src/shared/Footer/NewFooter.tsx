"use client";
import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import Applestore from "@/shared/applestore.png";
import { CustomLink } from "@/data/types";
import React from "react";
import Image from "next/image";
import { AdminUrl, HomeUrl } from "@/app/layout";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import { HandRaisedIcon } from "@heroicons/react/24/solid";



export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const Footer: React.FC = () => {
  const footerPathname = usePathname();

  const widgetMenus: WidgetFooterMenu[] = [
    {
      id: "5",
      title: "Company info",
      menus: [
        { href: `${HomeUrl}/company/about-us`, label: "About Nile" },
        { href: `${HomeUrl}/company/contact-us`, label: "Contact us" },
      ],
    },
    {
      id: "1",
      title: "Customer service",
      menus: [
        {
          href: `${HomeUrl}/company/return-refund-policy`,
          label: "Return and refund policy",
        },
        {
          href: `${HomeUrl}/company/terms-conditions`,
          label: "Terms & conditions",
        },
        {
          href: `${HomeUrl}/company/privacy-policy`,
          label: "Privacy & policy",
        },
        { href: `${HomeUrl}/company/shipping-info`, label: "Shipping info" },
      ],
    },
    {
      id: "2",
      title: "Help",
      menus: [
        {
          href: `${HomeUrl}/SupportCenter?querys=BuyingOnNile`,
          label: "Support center & FAQ",
        },
        { href: `${HomeUrl}/company/how-to-order`, label: "How to order" },
        { href: `${HomeUrl}/company/how-to-track`, label: "How to track" },
        { href: `${process.env.SELLERURL}/seller`, label: "Sell on Nile" },
      ],
    },
  ];

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-base text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="blank"
              // rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {footerPathname !== "/auth/signIn" &&
        footerPathname !== "/auth/register" &&
        footerPathname !== "/auth/forgotpassword" && (
          <div className="nc-Footer  top-32 relative px-2 py-10 lg:pt-20 mt-20 lg:pb-5 border-t border-neutral-200 dark:border-neutral-700">
            <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
              {widgetMenus.map(renderWidgetMenuItem)}
              <div className="">
                <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-5">
                  Download Our App
                </h2>
                <a
                  className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  href={"/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/store.png"
                    width={150}
                    height={200}
                    alt="Picture of the author"
                  />
                </a>
              </div>
              {/* <div className="grid grid-cols-1 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <h2 className="font-semibold text-center text-neutral-700 dark:text-neutral-200">
            Our Social Media
          </h2>
          <div className="col-span-1 flex items-center justify-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div> */}
            </div>


            {
              footerPathname !== "/RaiseTicket" && <div className="fixed right-0 bottom-24 bg-white shadow-xl rounded-md border border-gray-300">
                <Link href={'/RaiseTicket'}>
                  <div className="hover:bg-gray-200 p-2 cursor-pointer flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                    </svg>
                    <p className="text-sm">Raise Ticket</p>
                  </div>
                </Link>
              </div>
            }


          </div>
        )}
    </>
  );
};

export default Footer;
