"use client"
import { useAppSelector } from '@/redux/store'
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import React from 'react'

const FetchCartPrice = ({ showTitle = true, showCheckout = true }) => {
    const { cartItems } = useAppSelector((store) => store.cart)

    const calculateSubtotal = () => {
        let subtotal = 0;

        if (true) {
            cartItems.forEach((item: any) => {
                subtotal += parseFloat(item.sellingprice) * item.added_quantity;
            });
        }

        return subtotal;
    };


    return (
        <div className="flex-1">
            <div className="sticky top-28">
                {showTitle && <h3 className="text-lg font-semibold ">Order Summary</h3>}
                <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                    <div className="flex justify-between pb-4">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                            ${calculateSubtotal()}
                        </span>
                    </div>
                    <div className="flex justify-between py-4">
                        <span>Shpping estimate</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                            0
                        </span>
                    </div>
                    <div className="flex justify-between py-4">
                        <span>Tax estimate</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                            0
                        </span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                        <span>Order total</span>
                        <span>${calculateSubtotal()}</span>
                    </div>
                </div>
                {
                    showCheckout && <>
                        <ButtonPrimary href="/checkout" className="mt-8 w-full">
                            Checkout
                        </ButtonPrimary>
                        <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                            <p className="block relative pl-5">
                                <svg
                                    className="w-4 h-4 absolute -left-1 top-0.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 8V13"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.9945 16H12.0035"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Learn more{` `}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Taxes
                                </a>
                                <span>
                                    {` `}and{` `}
                                </span>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Shipping
                                </a>
                                {` `} infomation
                            </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default FetchCartPrice