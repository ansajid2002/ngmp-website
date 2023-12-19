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

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const Footer: React.FC = () => {
  const footerPathname = usePathname();
  console.log(footerPathname, "FOOTERRRRRRRRR");

  const widgetMenus: WidgetFooterMenu[] = [
    {
      id: "5",
      title: "Company info",
      menus: [
        { href: `${HomeUrl}/company/about-us`, label: "About Nile" },
        // {
        //   href: `${HomeUrl}/company/price-down`,
        //   label: "Nile Market-place - Team Up, Price Down!",
        // },
        {
          href: `${HomeUrl}/company/affiliate-influencer-program`,
          label: "Affiliate & influencer Program",
        },
        {
          href: `${HomeUrl}/company/campus-ambassador`,
          label: "Campus ambassador",
        },
        { href: `${HomeUrl}/company/contact-us`, label: "Contact us" },
        { href: `${HomeUrl}/company/careers`, label: "Careers" },
        { href: `${HomeUrl}/company/press`, label: "Press" },
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
        {
          href: `${HomeUrl}/company/student-discount`,
          label: "Student discount",
        },
        {
          href: `${HomeUrl}/company/recalls-product-safety-alerts`,
          label: "Your Recalls and Product Safety Alerts",
        },
      ],
    },
    {
      id: "2",
      title: "Help",
      menus: [
        {
          href: `${HomeUrl}/SupportCenter?query=BuyingOnNile`,
          label: "Support center & FAQ",
        },
        {
          href: `${HomeUrl}/company/purchase-protection`,
          label: "Nile Market-place purchase protection",
        },
        { href: `${HomeUrl}/company/sitemap`, label: "Sitemap" },
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
              <Link
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                // target="blank"
                // rel="noopener noreferrer"
              >
                {item.label}
              </Link>
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
                <Link
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
                </Link>
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
          </div>
        )}
    </>
  );
};

export default Footer;
