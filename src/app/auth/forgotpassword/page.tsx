"use client";
import { HomeUrl } from "@/app/layout";
import logo from "@/images/mainlogo.svg";
import { Formik } from "formik";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({ showImage = true }) => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="w-1/2 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <Link href={`${HomeUrl}`}>
          <Image
            src={logo}
            alt="website main logo"
            className="mx-auto w-44 mb-2"
          />
        </Link>
        <h2 className="text-3xl mt-5 font-bold leading-tight text-[#063b69]">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Remembered? Go back to
          <Link
            href={"/auth/signIn"}
            title=""
            className="ml-1 font-semibold text-black transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        <form action="#" method="POST" className="mt-8">
          <div>
            <label htmlFor="" className="text-base font-medium text-gray-900">
              Registered Email address
            </label>
            <div className="mt-2 mb-3">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
              ></input>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Get Link <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
      {showImage && (
        <div className="h-full w-1/2">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.pexels.com/photos/5632407/pexels-photo-5632407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default page;
