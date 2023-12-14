import { getReviewData } from '@/app/page'
import { Rate } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

const Reviewcomponent = ({uniquepid}) => {
    const [reviewData,setReviewData] = useState(null)
    
    const getReviews= async() => {
        const data = await getReviewData(uniquepid)
        setReviewData(data.ratingsData)
        
   }
   if (!reviewData) {
       getReviews()
   }
  return (
    <div>
        <h1>CREATED BYtyey SAJID</h1>
        <div className='grid grid-cols-2 gap-4'>
            {reviewData?.map((item,index) => {
                return (
                    <div key={index} className='border border-gray-500'>
                        <section className='flex justify-between'>
                            <div className='flex'>

                            <Image className='border'/>
                            <div>
                                <h1>{`${item.given_name} ${item.family_name}`}</h1>
                                <h2>date</h2>
                            </div>
                            </div>

                            <Rate
                allowHalf
                disabled
                value={4.7}
                
                className="text-lg  text-amber-500 "
              />                          
                        </section>
                        <h1>{item.review_text}</h1>
                    </div>
                )
            })}
        </div>
        </div>
  )
}

export default Reviewcomponent