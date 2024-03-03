"use client"
import ProductCard from '@/components/ProductCard'
import { Pagination, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { AdminUrl } from '../layout'
import { useAppSelector } from '@/redux/store'

const page = () => {
  const [loading, setLoading] = useState(false)
  const [historyData, setHistoryData] = useState(null)
  const [historyCount, setHistoryCount] = useState(null)
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id || null;
  const [currentpage, setCurrentpage] = useState(1)


  useEffect(() => {
    const fetchhistory = async () => {
      try {
        const response = await fetch(`${AdminUrl}/api/getproducthistorybycid?customer_id=${customerId}&page=${currentpage}&pagesize=10`)
        if (!response.ok) {
          throw new Error("error fetching response for product history")
        }
        const data = await response.json()
        if (data.staus) {
          setHistoryData(data.data)
          setHistoryCount(data.count)
        } else {
          setHistoryData([])
          setHistoryCount(0)
        }

      } catch (error) {
        console.log(error, "error in catch block for fetching history data");

      }
    }
    if (customerId) {
      fetchhistory()
    }
  }, [customerId, currentpage])

  // const { ad_title, mrp, sellingprice, images, uniquepid, prod_slug ,somali_ad_title} = data;
  return (
    <div>
      {!historyData ? (
        <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 mt-5">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => (
              <div key={index}>
                <Skeleton className="w-full h-[250px] bg-gray-200" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
                <Skeleton className="w-full mt-2 h-[10px] bg-gray-200 rounded-none" />
              </div>
            ))
          }
        </div>
      ) : historyData?.length !== 0 ? (
        <>
          <h1 className='text-center font-bold text-black text-2xl mt-6'>Recently Viewed Products</h1>
          <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-3 lg:grid-cols-5 mt-5">
            {historyData?.map((subcat: any, index: number) => (
              <ProductCard key={index} data={subcat} showTitle={true} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination
              //   hideOnSinglePage
              current={currentpage}
              responsive
              //   showQuickJumper
              showTitle
              //   showSizeChanger
              pageSize={10}
              onChange={(page: number, pageSize: number) => { setCurrentpage(page) }} total={historyCount} />
          </div>
        </>
      ) : (
        <p className='text-center font-bold text-black text-2xl mt-6 min-h-[80vh]'>No Products found !</p>
      )}
    </div>
  )
}

export default page