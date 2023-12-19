import { getReviewData } from '@/app/page'
import { Rate } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import moment from 'moment';
import { AdminUrl } from '@/app/layout';
import { Modal } from 'antd';
import ModalViewAllReviews from '@/app/product-detail/ModalViewAllReviews';

const Reviewcomponent = ({ product_id, showmorebtn = false }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false)
    // const [showMore, setShowMore] = useState(false)

    const openModal = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    const [reviewData, setReviewData] = useState(null)
   

    const getReviews = async () => {
        const data = await getReviewData(product_id)
        setReviewData(data.ratingsData)

    }
    if (!reviewData) {
        getReviews()
    }
    console.log(reviewData);

    return (
        <div>
            {
                reviewData?.length > 0 &&
            
            <h1 className='text-2xl font-semibold mb-4'>{`${reviewData?.length} ${reviewData?.length === 1 ? "Review" : "Reviews"}`}</h1>
            }<div className='grid grid-col-1 lg:grid-cols-2 gap-4'>
                {
                showmorebtn ? 
                
                
                
                reviewData?.slice(0, 4).map((item, index) => {
                    const { customerData, medias } = item

                    return (
                        <div key={index} className='border border-gray-200 shadow-md rounded-md p-4' >
                            <section className='flex justify-between'>
                                <div className='flex space-x-2'>

                                    <Image src={customerData.picture} width={50} height={50} alt="Customer Image" className='rounded-full border' />
                                    <div>
                                        <h1 className='font-semibold text-xl'>{`${customerData.given_name} ${customerData.family_name}`}</h1>
                                        <h2 className='font-medium text-gray-600 text-base'>{moment(item.created_at).format('DD MMM, YYYY')}</h2>
                                    </div>
                                </div>

                                <Rate
                                    allowHalf
                                    disabled
                                    value={item.rating}

                                    className="text-lg   text-amber-500 "
                                />
                            </section>
                            <h1 className='text-gray-800 m-2 line-clamp-3 '>{item.review_text}</h1>
                            <div className='flex gap-4 flex-wrap my-4'>


                                {medias?.map((reviewImage, index) => (
                                    <div key={index} onClick={() => openModal(reviewImage)}>
                                        <Image src={`${AdminUrl}/uploads/ReviewImages/${reviewImage}`} width={120} height={150} alt="Customer Image" className='object-contain' />
                                    </div>
                                ))}

                                <Modal
                                    open={modalVisible}
                                    onCancel={closeModal}
                                    footer={null}
                                    width={600}
                                >
                                    {selectedImage && (
                                        <Image src={`${AdminUrl}/uploads/ReviewImages/${selectedImage}`} width={600} height={600} alt="Customer Image" className=' object-cover' />
                                    )}
                                </Modal>
                            </div>
                        </div>
                    )
                }) :
                reviewData?.map((item, index) => {
                    const { customerData, medias } = item

                    return (
                        <div key={index} className='border border-gray-200 shadow-md rounded-md p-4' >
                            <section className='flex justify-between'>
                                <div className='flex space-x-2'>

                                    <Image src={customerData.picture} width={50} height={50} alt="Customer Image" className='rounded-full border' />
                                    <div>
                                        <h1 className='font-semibold text-xl'>{`${customerData.given_name} ${customerData.family_name}`}</h1>
                                        <h2 className='font-medium text-gray-600 text-base'>{moment(item.created_at).format('DD MMM, YYYY')}</h2>
                                    </div>
                                </div>

                                <Rate
                                    allowHalf
                                    disabled
                                    value={item.rating}

                                    className="text-lg   text-amber-500 "
                                />
                            </section>
                            <h1 className='text-gray-800 m-2 line-clamp-3 '>{item.review_text}</h1>
                            <div className='flex gap-4 flex-wrap my-4'>


                                {medias?.map((reviewImage, index) => (
                                    <div key={index} onClick={() => openModal(reviewImage)}>
                                        <Image src={`${AdminUrl}/uploads/ReviewImages/${reviewImage}`} width={120} height={150} alt="Customer Image" className='object-contain' />
                                    </div>
                                ))}

                                <Modal
                                    open={modalVisible}
                                    onCancel={closeModal}
                                    footer={null}
                                    width={600}
                                >
                                    {selectedImage && (
                                        <Image src={`${AdminUrl}/uploads/ReviewImages/${selectedImage}`} width={600} height={600} alt="Customer Image" className=' object-cover' />
                                    )}
                                </Modal>
                            </div>
                        </div>
                    )
                })
                
                }
            </div>
            <div>
                {
                   showmorebtn && reviewData?.length > 0 &&
                    <div className='m-2 my-4'>
                        <button onClick={() => setIsOpenModalViewAllReviews(true)} className='bg-gray-100 hover:bg-gray-300 p-3 px-6 text-lg rounded-xl font-semibold border'>SHOW MORE</button>
                        <ModalViewAllReviews
                        productid={product_id}
                            show={isOpenModalViewAllReviews}
                            onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
                        />
                    </div>

                }
            </div>
        </div>
    )
}

export default Reviewcomponent