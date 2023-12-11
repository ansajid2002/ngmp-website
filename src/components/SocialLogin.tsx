import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { GoogleOutlined } from "@ant-design/icons"
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

const SocialLogin = ({ loggstatus }: any) => {
    const router = useRouter()
    const customerData = useAppSelector((state) => state.customerData)
    if (customerData?.customerData) {
        loggstatus(true)
        router.push('/')
    } else {
        loggstatus(false)
    }


    return (
        // !loader ? (
        // <div className='absolute flex justify-center items-center w-full h-screen overflow-hidden  top-0 left-0'>
        //     <Loader className='animate-spin' />
        // </div>
        // ) : (
        <div className='flex justify-center py-4'>
            <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center bg-white border border-gray-300 p-2 rounded-md hover:border-gray-400 focus:outline-none focus:ring gap-1 focus:border-blue-300"
            >
                {/* Google Logo SVG */}
                <GoogleOutlined color='red' />
                <p className='text-sm'>Sign in with Google</p>
            </button>
        </div>
        //     )
    );

}

export default SocialLogin