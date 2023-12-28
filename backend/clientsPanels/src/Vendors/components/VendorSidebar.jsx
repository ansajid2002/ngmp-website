import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { vendorLinks } from "../constants/data";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Popover, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { ChevronDownIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { Avatar, Button, Image } from 'antd'

import Cookies from "js-cookie";
import { AdminUrl } from "../../Admin/constant";
import { IoIosNotificationsOutline, IoMdNotificationsOutline } from "react-icons/io";

const VendorSidebar = ({ vendorDatastate, handleCollapseAPP }) => {
  const [dropdown, setDropdown] = useState(false);
  const [collapse, setcollapse] = useState(true);
  const [selectedPage, setSelectedPage] = useState("");
  const location = useLocation();
  const currentUrl = location.pathname;
  const [locationData, setLocationData] = useState({
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  const [locationRetrieved, setLocationRetrieved] = useState(true);

  const checkLocationPermission = () => {
    // Check if the location permission has been granted
    return navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => permissionStatus.state === "granted");
  };

  useEffect(() => {
    const locationDataFromCookies = Cookies.get("locationData");

    // Check if location permission has been granted
    checkLocationPermission().then((isPermissionGranted) => {
      if (locationDataFromCookies && isPermissionGranted) {
        // Both cookies and location permission are true, set the location
        setLocationRetrieved(locationDataFromCookies);
      } else {
        // Either cookies or location permission (or both) are false, set to null
        setLocationRetrieved(null);
      }
    });
  }, [locationRetrieved]);

  const [current, setCurrent] = useState("mail");
  const navigation = useNavigate();

  const LocationFunction = async () => {
    try {
      // Check if geolocation is available in the browser
      if ("geolocation" in navigator) {
        // Attempt to get the user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        const response = await axios.get(url);
        const data = response.data;

        if (data) {
          const { city, state, country, postcode } = data.address;
          setLocationData({ city, state, country, postcode });
          Cookies.set("locationData", JSON.stringify(data.address)); // Store the address data in cookies
        } else {
          throw new Error("Address data not found");
        }
      } else {
        throw new Error("Geolocation is not available in this browser.");
      }
    } catch (error) {
      if (error.code === error.PERMISSION_DENIED) {
        // The user denied location access. Display a message or button
        // to guide the user to their browser settings to reset location permissions.
        const locationDataFromCookies = Cookies.get("locationData");

        // Check if location permission has been granted
        checkLocationPermission().then((isPermissionGranted) => {
          if (locationDataFromCookies && isPermissionGranted) {
            // Both cookies and location permission are true, set the location
            setLocationRetrieved(locationDataFromCookies);
          } else {
            // Either cookies or location permission (or both) are false, set to null
            setLocationRetrieved(null);
          }
        });
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    // Check if locationData is empty before calling LocationFunction
    if (
      !locationRetrieved &&
      !locationData?.city &&
      !locationData?.state &&
      !locationData?.country &&
      !locationData?.postcode
    ) {
      LocationFunction()
        .then((result) => {
          setLocationData(result);
          setLocationRetrieved(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLocationRetrieved(false);
        });
    } else if (!Cookies.get("locationData")) {
      setLocationRetrieved(false);
    }
  }, [locationData, locationRetrieved]);

  useEffect(() => {
    vendorDatastate?.length === 0 && navigation("/Vendors/Login");
  }, [vendorDatastate]);

  const handleDropdown = (drpIndex) => {
    setDropdown(!dropdown);
    if (dropdown) {
      document.getElementById(drpIndex).classList.remove("hidden");
    } else {
      document.getElementById(drpIndex).classList.add("hidden");
    }
  };

  const onClick = (e) => {
    setCurrent(e.link);
    navigate(e.key);
  };


  const handleCollapse = () => {
    setcollapse(!collapse);
    handleCollapseAPP(!collapse);
  };

  const solutions = [
    { name: 'Profile', description: 'Manage your Vendor profile', href: '/Vendors/Profile', icon: UserCircleIcon },
    // { name: 'Settings', description: "Manage your default Settings", href: '/Vendors/Settings', icon: FiSettings },
    // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  ]
  const callsToAction = [
    { name: 'Logout', href: '/Vendors/Logout', icon: FiLogOut },
    // { name: 'Contact', href: 'tel:9167263576', icon: PhoneIcon },
  ]

  console.log(vendorDatastate);
  return (
    <>
      {vendorDatastate == null || vendorDatastate?.length == 0 ? (
        ""
      ) : (
        <>
          <head>
            <title>{selectedPage}</title>
          </head>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    onClick={handleCollapse}
                    className="inline-flex items-center p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:text-gray-400 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center ml-2 md:mr-24">
                    <Link to="/" className="flex items-center">
                      <div class="h-16 w-16 rounded-full border-4 border-gradient-blue-orange flex items-center justify-center overflow-hidden">
                        <img
                          src="/logo.jpg"
                          className="h-24 object-contain  rounded-full"
                          alt="App Logo"
                        />
                      </div>
                      <div class="ml-4">
                        <span class="text-xl font-semibold text-gradient-blue-orange">
                          Nile Global Market-Place
                        </span>
                        <span class="block text-sm text-gray-500">
                          Vendor Dashboard Panel
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={items}
                /> */}


                <div className="flex gap-5 justify-center items-center">
                  <Link to={'/Vendors/Notifications'} class="relative inline-flex items-center text-sm font-medium text-center text-gray-700 ">
                    <IoIosNotificationsOutline className="text-4xl" />
                    <span class="sr-only">Notifications</span>
                    <div class="absolute  inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-1 right-3 animate-ping dark:border-gray-900"></div>
                  </Link>

                  <Popover className="relative">
                    <Popover.Button className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900">
                      <Image width={35} height={35} className="rounded-full" src={`${AdminUrl}/uploads/vendorProfile/${vendorDatastate?.[0]?.vendor_profile_picture_url?.images?.[0]}`} />
                      <div className="flex flex-col relative">
                        <p className="mb-4 font-bold line-clamp-1">{vendorDatastate[0]?.email}</p>
                        <p className="absolute top-5 line-clamp-1">{vendorDatastate?.[0]?.brand_name}</p>
                      </div>
                      {/* <ChevronDownIcon className="h-5 w-5" aria-hidden="true" /> */}
                    </Popover.Button>

                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ">
                        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-4">
                            {solutions.map((item) => (
                              <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                </div>
                                <div>
                                  <Link to={item.href} >
                                    <a className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </a>
                                  </Link>
                                  <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                              <Link
                                key={item.name}
                                to={item.name == 'Logout' ? item.href : ''}
                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className={`fixed top-0 z-40 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${collapse
              ? "w-64 left-0 sm:translate-x-0 transition-all duration-300 ease-in"
              : "w-0 -left-64 sm:-translate-x-64 transition-all duration-300 ease-out"
              } h-screen pt-24`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                {vendorLinks.map((item, index) => {
                  return (
                    <>
                      <h1 className="mt-5 text-gray-400">{item.title}</h1>
                      {item.links.map((link, index) => {
                        return (
                          <>
                            <li key={index}>
                              {link.dropdown ? (
                                <>
                                  <button
                                    type="button"
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() =>
                                      handleDropdown(`dropdown-example${index}`)
                                    }
                                    aria-controls={`dropdown-example${index}`}
                                    data-collapse-toggle={`dropdown-example${index}`}
                                  >
                                    {link.icon}
                                    <span
                                      className="flex-1 ml-3 text-left whitespace-nowrap line-clamp-1"
                                      sidebar-toggle-item
                                    >
                                      {link.name}
                                    </span>
                                    <svg
                                      sidebar-toggle-item
                                      className={`w-6 h-6`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                  <ul
                                    id={`dropdown-example${index}`}
                                    className="hidden py-2 space-y-2"
                                  >
                                    {link.dropList.map((drplist, indList) => {
                                      return drplist.name != "" ? (
                                        <li key={indList}>
                                          <Link
                                            to={drplist.to}
                                            onClick={() =>
                                              setSelectedPage(drplist.name)
                                            }
                                          >
                                            <a
                                              className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-sm ${currentUrl === drplist.to
                                                ? `text-[#EC642A]`
                                                : "text-gray-700"
                                                }`}
                                            >
                                              {drplist.name}
                                            </a>
                                          </Link>
                                        </li>
                                      ) : (
                                        ""
                                      );
                                    })}
                                  </ul>
                                </>
                              ) : (
                                <Link
                                  to={link.to}
                                  onClick={() => setSelectedPage(link.name)}
                                >
                                  <a
                                    className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${currentUrl === link.to
                                      ? `text-[#EC642A]`
                                      : "text-gray-700"
                                      }`}
                                  >
                                    {link.icon}
                                    <span className="ml-3">{link.name}</span>
                                  </a>
                                </Link>
                              )}
                            </li>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </ul>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default VendorSidebar;
