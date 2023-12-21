import { AdminUrl } from '@/app/layout';
import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../ProductCard';
import { Skeleton } from '../ui/skeleton';

const ProductListingWithFilter = ({ searchTerm }: any) => {

    const [getSearchedProducts, setgetSearchedProducts] = useState([])
    const [totalProducts, settotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setkeyord] = useState(searchTerm);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const fetchData = useMemo(
        () =>
            async () => {
                setIsLoading(true);
                keyword !== searchTerm && setgetSearchedProducts([]);
                try {
                    const response = await fetch(
                        `${AdminUrl}/api/getSearchedProducts?searchTerm=${searchTerm}&page=${page}&limit=${limit}&currency=USD`
                    );

                    if (response.ok) {
                        const newItems = await response.json();

                        const newProducts = newItems.products; // Extract products from newItems
                        const total = newItems.totalProducts; // Extract totalProducts count
                        console.log(getSearchedProducts, newProducts);

                        if (newProducts.length > 0) {
                            // Append new products to the existing data
                            setgetSearchedProducts(newProducts);
                            settotalProducts(total); // Update the totalProducts count
                        }
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    // Handle error here
                } finally {
                    setIsLoading(false);
                }
            },
        [keyword, searchTerm]
    );

    useEffect(() => {
        fetchData(); // Initial data fetch
    }, [searchTerm, fetchData]);

    console.log(keyword, searchTerm);

    console.log(keyword, searchTerm);


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
        <div className="flex px-2 md:px-10">
            {/* Left Side (Sticky) */}
            <div className={`sticky left-0  h-1/2 bg-gray-200 w-1/4 ${visible ? 'top-36' : "top-0"} transition-all duration-150 ease-in-out`}>
                {/* Your left side content goes here */}
                <p>{searchTerm}</p>
            </div>

            {/* Right Side (Scrollable) */}
            <div className="flex-1 overflow-y-auto scrollbar-hidden">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                    {getSearchedProducts?.length !== 0 ?
                        getSearchedProducts.map((item, index) => <ProductCard data={item} />)
                        :


                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (item: any, index: number) => (
                                <div>
                                    <Skeleton className="w-full h-[250px] bg-gray-200" />
                                    <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                                    <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                                </div>
                            )
                        )



                    }
                </div>
            </div>
        </div>

    )
}

export default ProductListingWithFilter



