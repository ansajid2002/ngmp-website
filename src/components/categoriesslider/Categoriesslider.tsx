"use client"
import { AdminUrl } from "@/app/layout";
import Image from "next/image";
import React, { FC } from "react"
import Head from "next/head";
import Slider from "react-slick"
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux"
import { login, logout } from "@/redux/features/authtutorialslice";
import Heading from "../Heading";


export interface CategoriesSliderProps {
    categoriesdata: any
}

const CategoriesSlider: FC<CategoriesSliderProps> = ({
    categoriesdata
}) => {


    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        autoplay: true,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 1000,
        swipeToSlide: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },

        ],

    };

    const dispatch = useDispatch<AppDispatch>()

    const { username } = useAppSelector((store) => store.authReducer.value)
    

    return (<>

        <Head>
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
        <div className=" ">
            <Heading title="CATEGORIES" />
            {/* <h1 className=" mb-20 text-[36px] tracking-wide font-semibold text-center">CATEGORIES</h1> */}
            {/* <div className="my-24 border ">
                <h1>SAJID IS TESTING REDUX STORE</h1>
                <button onClick={() => dispatch(login())}>Login</button>
                <p>{username}</p>
                <button onClick={() => dispatch(logout())}>Logout</button>

            </div> */}
            <div>
                <Slider {...settings} >
                    {categoriesdata.slice(0, 20).map((single: any, index: any) => {
                        return (
                            <main className="mx-1">
                                <div key={index} className="" >
                                    <div className=" overflow-hidden mx-auto border w-[140px] h-[140px] rounded-full flex items-center justify-center">
                                        <Image
                                            width={130} height={130}
                                            className=" object-cover rounded-md"
                                            src={`${AdminUrl}/uploads/CatgeoryImages/${single.category_image_url}`}
                                            alt={single.category_name} />
                                    </div>
                                    <h1 className="text-center mt-1 line-clamp-2 text-lg font-semibold ">{single.category_name}</h1>
                                </div>

                            </main>

                        )
                    })}


                </Slider>
            </div>
            <div className="mt-12">
                <Slider {...settings} >


                    {categoriesdata.slice(20,).map((single: any, index: any) => {
                        return (
                            <main className="mx-1">

                                <div key={index}>
                                    <div className=" overflow-hidden mx-auto border w-[140px] h-[140px] rounded-full flex items-center justify-center">

                                        <Image
                                            width={130} height={130}
                                            className=" object-cover rounded-md"
                                            src={`${AdminUrl}/uploads/CatgeoryImages/${single.category_image_url}`}
                                            alt={single.category_name} />
                                    </div>
                                    <h1 className="text-center mt-1 line-clamp-2 text-lg font-semibold">{single.category_name}</h1>
                                </div>

                            </main>

                        )
                    })}

                </Slider>
            </div>
        </div>
    </>
    )
}

export default CategoriesSlider