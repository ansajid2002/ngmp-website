"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
import { Input } from "antd";
import Link from "next/link";
import Swal from "sweetalert2";
import { updateCustomerData } from "@/redux/slices/customerData";
import { useDispatch } from "react-redux";
import { HomeUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { addItem } from "@/redux/slices/cartSlice";
import { ArrowRight } from "lucide-react";
import logo from "@/images/mainlogo.svg";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";


interface LoginFormInterface {
  email: string;
  password: string;
}
function SignIn({ showImage = true }) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { data, status } = useSession();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const customerData = useAppSelector((state) => state.customerData);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
const {t} = useTranslation()
  const updateCartData = async (customerId: number) => {
    try {
      for (const cartItem of cartItems) {
        // Extract necessary data
        const {
          category,
          subcategory,
          uniquepid,
          vendorInfo,
          added_quantity,
          mrp,
          sellingprice,
          label,
        } = cartItem;
        console.log(cartItem, "cart");

        const replacecategory = category
          .replace(/[^\w\s]/g, "")
          .replace(/\s/g, "");
        const replacesubcategory = subcategory
          .replace(/[^\w\s]/g, "")
          .replace(/\s/g, "");

        // Prepare the request data
        const requestData = {
          customer_id: customerId,
          vendor_id: vendorInfo.id,
          product_uniqueid: uniquepid,
          category: replacecategory,
          subcategory: replacesubcategory,
          variantlabel: label,
          mrp,
          sellingprice,
          quantity: added_quantity,
        };

        // Make a POST request to your API endpoint for updating the cart
        const response = await fetch(`/api/addCarts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      // Fetch cart data
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const urlWithCustomerId = `/api/cart/${customerId}`;
      const response = await fetch(urlWithCustomerId, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const cartData = await response.json();
      cartData.forEach((item: any) => {
        dispatch(addItem(item));
      });

      const storedDistrict = localStorage.getItem('selectedDistrict');

      // Check if storedDistrict is not null or undefined before using it
      if (storedDistrict) {
        console.log('Selected District from localStorage:', storedDistrict);
        // Use the storedDistrict as needed
        if (storedDistrict.trim() !== '') {
          const response = await fetch(`/api/Customers/DistrictSelect`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer_id: customerId,
              district: storedDistrict,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          localStorage.setItem('selectedDistrict', storedDistrict);

        }
      } else {
        console.log('No district selected in localStorage');
      }
      // Dispatch an action to update the cart items in the Redux store
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    const userData = data?.user?.name;

    if (userData?.status === 401) {
      setError(true);
      error &&
        Swal.fire({
          title: "Error!",
          text: userData?.message,
          icon: "error",
        });
    } else if (userData?.status === 301) {
      setError(true);

      error &&
        Swal.fire({
          title: "Verify Account!",
          text: userData?.message,
          icon: "info",
        });
    } else if (userData?.status === 200) {
      setError(true);
      error &&
        Swal.fire({
          title: "Authenticated",
          text: userData?.message,
          icon: "success",
        });
      updateCartData(userData?.customerData?.customer_id);
      dispatch(updateCustomerData(userData?.customerData));
      window.location.href = HomeUrl;
    }
  }, [data]);

  useEffect(() => {
    console.log(customerData.customerData);

    if (customerData?.customerData) {
      window.location.href = HomeUrl;
    }
  }, [customerData])


  const handleLogin = async (
    data: LoginFormInterface,
    { setSubmitting }: { setSubmitting: (value: boolean) => void }
  ) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    setSubmitting(false);
  };

  return (
    <>
      <section className="">
        <div className={`grid grid-cols-1 ${showImage && "lg:grid-cols-2"}`}>
          <div className="flex items-center justify-center px-4  h-[100vh]">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <Link href={`${HomeUrl}`}>
                <Image
                  src={logo}
                  alt="website main logo"
                  className="mx-auto w-44"
                />
              </Link>
              <h2 className="text-3xl mt-5 font-bold leading-tight text-[#063b69]">
                {t("Sign in")}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {t("Don't have an account?")}{" "}
                <Link
                  href={"/auth/register"}
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  {t("Create a free account")}
                </Link>
              </p>
              {error && (
                <div
                  className={`p-4 mb-4 text-sm rounded-lg  ${data?.user?.name?.status !== 200
                    ? "text-red-800 dark:text-red-400 bg-red-50 dark:bg-gray-800"
                    : "text-green-800 dark:text-green-400 bg-green-50 dark:bg-gray-800"
                    }`}
                  role="alert"
                >
                  <p>{data?.user?.name?.message}</p>
                </div>
              )}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={handleLogin}
              >
                {({ values, handleSubmit, handleChange, isSubmitting }) => (
                  <form onSubmit={handleSubmit} className="mt-8">
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          {t("Email address")}{" "}
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            placeholder="Email"
                          ></input>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor=""
                            className="text-base font-medium text-gray-900"
                          >
                            {" "}
                            {t("Password")}{" "}
                          </label>
                          <Link
                            href={"/auth/forgotpassword"}
                            className="text-sm font-semibold text-black hover:underline"
                          >
                            {" "}
                           {t("Forgot password?")}{" "}
                          </Link>
                        </div>
                        <div className="mt-2">
                          <Input.Password
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="password"
                            visibilityToggle={{
                              visible: passwordVisible,
                              onVisibleChange: setPasswordVisible,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-md bg-[#063b69] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                          {t("Login ")}<ArrowRight className="ml-2" size={16} />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
              <div className="mt-3 space-y-3">
                <button
                  onClick={() => signIn("google")}
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  {t("Sign in with Google")}
                </button>
                <button
                  type="button"
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      className="h-6 w-6 text-[#2563EB]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                    </svg>
                  </span>
                  {t("Sign in with Facebook")}
                </button>
              </div>
            </div>
          </div>
          {showImage && (
            <div className="h-full w-full">
              <img
                className="mx-auto h-full w-full object-cover"
                src="https://images.pexels.com/photos/5632407/pexels-photo-5632407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SignIn;
