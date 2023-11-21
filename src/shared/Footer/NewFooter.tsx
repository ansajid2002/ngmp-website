import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import Applestore from "@/shared/applestore.png";
import { CustomLink } from "@/data/types";
import React from "react";
import Image from "next/image";
import { HomeUrl } from "@/app/layout";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const Footer: React.FC = () => {
  const widgetMenus: WidgetFooterMenu[] = [
    {
      id: "5",
      title: "Company info",
      menus: [
        { href: `${HomeUrl}`, label: "About Nile" },
        { href: `${HomeUrl}`, label: "Temu - Team Up, Price Down!" },
        { href: `${HomeUrl}`, label: "Affiliate & influencer Program" },
        { href: `${HomeUrl}`, label: "Campus ambassador" },
        { href: `${HomeUrl}`, label: "Contact us" },
        { href: `${HomeUrl}`, label: "Careers" },
        { href: `${HomeUrl}`, label: "Press" },
      ],
    },
    {
      id: "1",
      title: "Customer service",
      menus: [
        { href: `${HomeUrl}`, label: "Return and refund policy" },
        { href: `${HomeUrl}`, label: "Intellectual property policy" },
        { href: `${HomeUrl}`, label: "Shipping info" },
        { href: `${HomeUrl}`, label: "Student discount" },
        { href: `${HomeUrl}`, label: "Your Recalls and Product Safety Alerts" },
      ],
    },
    {
      id: "2",
      title: "Help",
      menus: [
        { href: `${HomeUrl}`, label: "Support center & FAQ" },
        { href: `${HomeUrl}`, label: "Temu purchase protection" },
        { href: `${HomeUrl}`, label: "Sitemap" },
        { href: `${HomeUrl}`, label: "How to order" },
        { href: `${HomeUrl}`, label: "How to track" },
        { href: `${HomeUrl}`, label: "Sell on Nile" },
      ],
    },
    //   {
    //     id: "4",
    //     title: "Community",
    //     menus: [
    //       { href: {`${HomeUrl}`}, label: "Discussion Forums" },
    //       { href: {`${HomeUrl}`}, label: "Code of Conduct" },
    //       { href: {`${HomeUrl}`}, label: "Contributing" },
    //       { href: {`${HomeUrl}`}, label: "API Reference" },
    //     ],
    //   },
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
                target="_blank"
                rel="noopener noreferrer"
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
      <div className="nc-Footer relative px-2 py-10 lg:pt-20 mt-20 lg:pb-5 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          {/* <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div> */}
          {widgetMenus.map(renderWidgetMenuItem)}
          <div className="">
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-5">
              Download Our App
            </h2>
            <a
              //   key={index}
              className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              href=""
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
          <div className="grid grid-cols-1 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <h2 className="font-semibold text-center text-neutral-700 dark:text-neutral-200">
              Our Social Media
            </h2>
            <div className="col-span-1 flex items-center justify-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center text-center pb-5">
        <Image
          src="/powered.png"
          width={200}
          height={200}
          alt="Powere By Stripe"
        />
      </div> */}
      <div className="border-t p-5 text-[13px] font-semibold flex flex-wrap gap-3 items-center justify-center">
        <a href="" className="hover:text-[#5c5c5c]">
          <span>© 2023 WhaleCo Inc.</span>
        </a>
        <a href="" className="hover:text-[#5c5c5c]">
          <span>Terms Of Service</span>
        </a>
        <a href="" className="hover:text-[#5c5c5c]">
          <span>Privacy Policy</span>
        </a>
        <a href="" className="hover:text-[#5c5c5c]">
          <span>Your Privacy Choices</span>
        </a>
        <a href="" className="hover:text-[#5c5c5c]">
          <span>Ad Choices</span>
        </a>
      </div>
    </>
  );
};

export default Footer;
