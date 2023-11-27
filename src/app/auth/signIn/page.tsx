'use client'

import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { updateCustomerData } from '@/redux/slices/customerData'
import { useDispatch } from 'react-redux'
import { HomeUrl } from '@/app/layout'
import { useAppSelector } from '@/redux/store'
import { addItem } from '@/redux/slices/cartSlice'

interface LoginFormInterface {
    email: string,
    password: string
}
function SignIn() {
    const { data, status } = useSession()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const customerData = useAppSelector((state) => state.customerData)
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    const router = useRouter()

    const updateCartData = async (customerId: number) => {
        try {

            for (const cartItem of cartItems) {
                // Extract necessary data
                const { category, subcategory, uniquepid, vendorInfo, added_quantity, mrp, sellingprice, label } = cartItem;
                console.log(cartItem, 'cart');

                const replacecategory = category.replace(/[^\w\s]/g, "").replace(/\s/g, "");
                const replacesubcategory = subcategory.replace(/[^\w\s]/g, "").replace(/\s/g, "");

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
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }


            // Fetch cart data
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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
            // Dispatch an action to update the cart items in the Redux store
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    useEffect(() => {
        const userData = data?.user?.name

        if (userData?.status === 401) {
            setError(true)
            error && Swal.fire({
                title: 'Error!',
                text: userData?.message,
                icon: 'error',
            })
        }
        else if (userData?.status === 301) {
            setError(true)

            error && Swal.fire({
                title: 'Verify Account!',
                text: userData?.message,
                icon: 'info',
            })
        }
        else if (userData?.status === 200) {
            setError(true)
            error && Swal.fire({
                title: 'Authenticated',
                text: userData?.message,
                icon: 'success',
            })
            updateCartData(userData?.customerData?.customer_id)
            dispatch(updateCustomerData(userData?.customerData))
            window.location.href = HomeUrl
        }
    }, [data, dispatch])


    const handleLogin = async (data: LoginFormInterface,
        { setSubmitting }: { setSubmitting: (value: boolean) => void }) => {

        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: '/'
        })
        setSubmitting(false)

    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md mb-20">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {
                        error &&
                        <div className={`p-4 mb-4 text-sm rounded-lg  ${data?.user?.name?.status !== 200 ? 'text-red-800 dark:text-red-400 bg-red-50 dark:bg-gray-800' : 'text-green-800 dark:text-green-400 bg-green-50 dark:bg-gray-800'}`} role="alert">
                            <p>{data?.user?.name?.message}</p>
                        </div>
                    }
                    <Formik
                        initialValues={{
                            email: '', password: ''
                        }}
                        onSubmit={handleLogin}>
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            isSubmitting
                        }) =>
                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id='email'
                                            name='email'
                                            onChange={handleChange}
                                            value={values.email}
                                            type='email'
                                            required
                                            placeholder='Email'
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            id="password"
                                            name='password'
                                            onChange={handleChange}
                                            value={values.password}
                                            type="password"
                                            placeholder="Password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </form>
                        }
                    </Formik>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Signup
                    </Link>
                    <button onClick={() => signIn("google")}>Sign in with Google</button>

                </p>
            </div>
        </div>
    )
}

export default SignIn