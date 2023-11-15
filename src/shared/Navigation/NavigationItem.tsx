"use client";
import { useEffect } from 'react'
import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CardCategory3 from "@/components/CardCategories/CardCategory3";
import React, { FC, Fragment, useState } from "react";
import { Route } from "@/routers/types";
import Link from "next/link";
import Image from "next/image";
import { AdminUrl } from "@/app/layout";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setLanguage } from "@/redux/features/languageslice";
import { useDispatch } from "react-redux";
import { addCarts } from '@/redux/slices/cartSlice';

export interface NavItemType {
  id: string;
  name: string;
  href: Route;
  targetBlank?: boolean;
  children?: any[];
  type?: "dropdown" | "megaMenu" | "none";
  isNew?: boolean;
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);
  const { languageCode } = useAppSelector((store) => store.languagesReducer)
  const dispatch = useDispatch<AppDispatch>()

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };


  const customerId = 71
  useEffect(() => {
    const fetchCart = async (customerId: any) => {
      try {
        const response = await fetch(`/api/cart/${customerId}`, {
          method: 'PUT', // Change the request method to PUT
          headers: {
            'Content-Type': 'application/json',
          },

        });
        const data = await response.json();
        dispatch(addCarts(data?.cartData));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart(customerId);
  }, [customerId, dispatch]);

  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: NavItemType) => {
    return (
      <li
        className={`menu-item flex-shrink-0 menu-megamenu menu-megamenu--large`}
      >
        {renderMainItem(menu)}

        <div className=" invisible bg-white  sub-menu absolute top-full inset-x-0 transform z-50">
          <div className=" bg-white flex mx-24 border h-[400px] dark:bg-neutral-900 shadow-lg">
            <div className="w-1/3 container  overflow-y-auto ">
              <div className="text-sm border-t border-slate-200 dark:border-slate-700">
                <div>
                  {menu.children?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center hover:bg-[#00000010] rounded-md my-7 py-2"
                      onMouseEnter={() => {
                        setHoveredItem(item.subcategories)
                        setCategoryTitle(item.category_name)
                      }}
                    >
                      <Image
                        className="rounded-full mr-3"
                        width={50} height={50} src={`${AdminUrl}/uploads/CatgeoryImages/${item.category_image_url}`} alt={item.category_name} />
                      <p className="font-medium text-slate-900 dark:text-neutral-200 text-base ">
                        {item.category_name}
                      </p>
                      {/* Add other content for each item */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {
              hoveredItem && (
                <div className="mt-8 w-2/3 overflow-y-scroll">
                  {categoryTitle && <h1 className="text-2xl font-semibold text-center mb-12">{categoryTitle}</h1>}
                  <div className="flex   flex-wrap ">
                    {hoveredItem?.map((singlesubcat: any) => {
                      return (
                        <div className="mx-4 w-[140px] mb-4 ">
                          <div className="mx-auto">
                            <Image
                              className="mx-auto rounded-full border border-gray-300 h-[130px] w-[130px] hover:scale-110 "
                              width={150} height={150} src={`${AdminUrl}/uploads/SubcategoryImages/${singlesubcat.subcategory_image_url}`} alt={singlesubcat.subcategory_name} />
                          </div>
                          <h1 className="font-semibold text-[14px] line-clamp-2 text-center mt-2">{singlesubcat.subcategory_name}</h1>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </li>
    );
  };

  const renderMegaMenuNavlink = (item: NavItemType) => {
    return (
      <li key={item.id} className={`${item.isNew ? "menuIsNew" : ""}`}>
        <Link
          className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white "
          href={{
            pathname: item.href || undefined,
          }}
        >
          {item.name}
        </Link>
      </li>
    );
  };

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute transform z-10 w-56 top-full left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {menuDropdown.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: any) => {
    return (
      <section
        className="flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        onClick={() => { dispatch(setLanguage({ newlanguageCode: item.langCode, newlanguageName: item.langName })) }}
      >
        <h1 className="tracking-wider" >
          {`${item.langName} (${item.langCode})`}
        </h1>
        {(item.langCode === languageCode) && <ChevronRightIcon className=" ml-4 w-5 h-5 text-neutral-500" />}
      </section>
    );
  };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return (
      <div className="h-20 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: item.href || undefined,
          }}
        >
          {item.name}
          {item.type && (
            <ChevronDownIcon
              className="ml-1 -mr-1 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          )}
        </Link>
      </div>
    );
  };

  switch (menuItem.type) {
    case "dropdown":
      return renderDropdownMenu(menuItem);
    case "megaMenu":
      return renderMegaMenu(menuItem);
    default:
      return (
        <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>
      );
  }
};

export default NavigationItem;
