"use client"

import React, { useState } from 'react'
import { ErrorMessage, Formik } from 'formik'
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
import * as Yup from 'yup';
import { Alert } from '@material-tailwind/react'

interface SignupFormInstance {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    mobile: number,
    countryCode: string
}

const Register = () => {
    const { data, status } = useSession()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModalOtp, setOpenModalOTP] = useState(false)
    const customerData = useAppSelector((state) => state.customerData)
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    const router = useRouter()

    const handleSignUp = async (data: any) => {
        setLoading(true)

        const userData = {
            given_name: data.firstname,
            family_name: data.lastname,
            email: data.email,
            countryCode: data.countryCode,
            phone_number: `${data.countryCode} ${data.mobile}`,
            password: data.password,
        };

        fetch(`/api/Customers/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                !data.success ? Swal.fire({
                    title: 'Error!',
                    text: data?.message,
                    icon: 'error',
                }) : (
                    Swal.fire({
                        title: 'Success!',
                        text: data?.message,
                        icon: 'success',
                    })
                )
                setLoading(false)

            })
            .catch(error => {
                console.error('Error Registering up:', error);
                // Handle the error (e.g., show an error message)
                setLoading(false)

            });
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Mobile number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-md mb-20">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            email: '',
                            mobile: '',
                            countryCode: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignUp}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            isSubmitting,
                        }) => (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="firstname"
                                            name="firstname"
                                            as={Input}
                                            onChange={handleChange}
                                            value={values.firstname}
                                            type="text"
                                            required
                                            placeholder="First Name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                        <ErrorMessage name="firstname" component={Alert} type="error" showIcon />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="lastname"
                                            name="lastname"
                                            onChange={handleChange}
                                            value={values.lastname}
                                            type="text"
                                            required
                                            placeholder="Last Name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="lastname" component={Alert} type="error" showIcon />

                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile Number
                                    </label>
                                    <div className="mt-2 gap-2 flex">
                                        <Input
                                            id="countryCode"
                                            name="countryCode"
                                            onChange={handleChange}
                                            value={values.countryCode}
                                            type="tel"
                                            required
                                            placeholder="+91 "
                                            className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <Input
                                            id="mobile"
                                            name="mobile"
                                            onChange={handleChange}
                                            value={values.mobile}
                                            type="tel"
                                            required
                                            placeholder="9167xxxxxx"
                                            className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />


                                    </div>
                                    <ErrorMessage name="mobile" component={Alert} type="error" showIcon />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            type="email"
                                            required
                                            placeholder="Email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="email" component={Alert} type="error" showIcon />

                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            type="password"
                                            required
                                            placeholder="Password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="password" component={Alert} type="error" showIcon />

                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            type="password"
                                            required
                                            placeholder="Confirm Password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <ErrorMessage name="confirmPassword" component={Alert} type="error" showIcon />

                                    </div>
                                </div>
                                <div>
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {loading ? 'Creting Account' : 'Sign up'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                        <button onClick={() => signIn("google")}>Sign in with Google</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register