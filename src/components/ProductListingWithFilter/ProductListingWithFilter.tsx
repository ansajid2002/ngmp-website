import { AdminUrl } from '@/app/layout';
import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../ProductCard';
import { Skeleton } from '../ui/skeleton';
import { useAppSelector } from '@/redux/store';
import { Pagination } from 'antd';

const ProductListingWithFilter = ({ searchTerm }: any) => {

    const [getSearchedProducts, setgetSearchedProducts] = useState(null)
    const [totalProducts, settotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const customerData = useAppSelector((state) => state.customerData);
    const customerId = customerData?.customerData?.customer_id || null;

    console.log(totalProducts, 'totalProducts');

    const fetchData = async (page: any, pageSize: any) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/search/customersearch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm: searchTerm, customer_id: customerId }),
            });
            const response = await fetch(
                `${AdminUrl}/api/getSearchedProducts?searchTerm=${searchTerm}&pageNumber=${page}&pageSize=${pageSize}&currency=USD`
            );

            if (response.ok) {
                const newItems = await response.json();

                console.log(newItems, 'newItems');

                const newProducts = newItems.products; // Extract products from newItems
                const total = newItems.totalCount; // Extract totalProducts count
                if (newProducts.length > 0) {
                    // Append new products to the existing data
                    setgetSearchedProducts(newProducts);
                    settotalProducts(total); // Update the totalProducts count
                } else {
                    settotalProducts(0)
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle error here
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, limit); // Initial data fetch
    }, [searchTerm, page, limit]); // Include dependencies in the useEffect dependency array



    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const shouldTrigger = Math.abs(currentScrollPos - prevScrollPos) >= 50;

            if (shouldTrigger) {
                setVisible(prevScrollPos >= currentScrollPos);
                setPrevScrollPos(currentScrollPos);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible]);


    return (
        <>
            <div className='px-2 md:px-10 mt-10'>
                <h2 className='text-base md:text-xl '>Search results for <b className='text-red-500'>{searchTerm}</b></h2>
            </div>
            <div className="flex px-2 md:px-10">
                {/* Left Side (Sticky) */}
                {/* <div className={`sticky left-0  h-1/2 bg-gray-200 w-1/4 ${visible ? 'top-36' : "top-0"} transition-all duration-150 ease-in-out`}>
                {/* Your left side content goes here */}
                {/* <p>{searchTerm}</p> */}
                {/* </div> */}
                {/* } */}


                {/* Right Side (Scrollable) */}
                <div className="flex-1 overflow-y-auto scrollbar-hidden">

                    {getSearchedProducts ? (
                        getSearchedProducts.length === 0 ? (
                            <h1 className='min-h-[50vh] text-xl text-center font-medium mt-10'>No product found !</h1>
                        ) : (
                            <div className='grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 mt-8'>
                                {

                                    getSearchedProducts?.map((item, index) => {
                                        return (
                                            <ProductCard key={index} data={item} />

                                        )
                                    })
                                }
                            </div>
                        )
                    ) : (
                        <div className='grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 mt-8'>
                            {
                                Array.from({ length: 10 }).map((_, index) => (
                                    <div key={index}>
                                        <Skeleton className="w-full h-[250px] bg-gray-200" />
                                        <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                                        <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                                    </div>
                                ))
                            }
                        </div>

                    )}

                    <div className="flex justify-center mt-10">
                        <Pagination
                            hideOnSinglePage
                            current={page}
                            responsive
                            showQuickJumper
                            showTitle
                            showSizeChanger
                            pageSize={10}
                            onChange={(page: number, pageSize: number) => {
                                setPage(page)
                                setLimit(pageSize)
                                // Smooth scroll to the top of the page
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });

                                fetchData(page, pageSize)
                            }} total={totalProducts} />
                    </div>

                </div>
            </div >
        </>

    )
}

export default ProductListingWithFilter



