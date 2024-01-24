import { getReviewData } from '@/app/page'
import { Input, Rate } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { AdminUrl } from '@/app/layout';
import { Modal } from 'antd';
import ModalViewAllReviews from '@/app/product-detail/ModalViewAllReviews';
import Divider from '../divider/Divider';
import StarRating from '../StarRating';
import { useAppSelector } from '@/redux/store';

const Reviewcomponent = ({ product_id, showmorebtn = false, vendorID }) => {
    const [reviewData, setReviewData] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false)
    // const [showMore, setShowMore] = useState(false)
    const { customerData } = useAppSelector((state) => state.customerData);
    const customer_id = customerData.customer_id
    const openModal = (image: any) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    const getReviews = async () => {
        const data = await getReviewData(product_id, vendorID)

        setReviewData(data?.ratingsData || [])
    }

    useEffect(() => {
        if (!reviewData) {
            getReviews()
        }
    }, [reviewData])


    return (
        <div>
            {
                !reviewData && <Divider label={'No Review Found'} />
            }
            {
                !showmorebtn && <div className='mb-4 space-y-4'>
                    <h1 className='text-base md:text-xl font-semibold mb-2'>Add your Valuable Review</h1>
                    <StarRating order_id={null} selectedRating={0} ratingData={[]} item={{ vendor_id: vendorID, customer_id, product_uniqueid: 'vendor', label: null }} />
                    <hr />
                </div>
            }
            <h1 className='text-2xl font-semibold mb-4'>{`${reviewData && reviewData?.length} ${reviewData?.length === 1 ? "Review" : "Reviews"}`}</h1>
            <div className='grid grid-col-1 lg:grid-cols-2 gap-4'>
                {
                    showmorebtn ?
                        reviewData?.slice(0, 4).map((item, index) => {
                            const { customerData, medias } = item
                            const { picture, google_id } = customerData
                            let profile_pic = "/avatarplaceholder.png"
                            if (picture) {
                                if (google_id && google_id.trim() !== "" || !picture.startsWith("https")) {
                                    profile_pic = `${AdminUrl}/uploads/customerProfileImages/${picture}`
                                } else {
                                    profile_pic = picture
                                }
                            } else {
                                profile_pic = "/avatarplaceholder.png"
                            }
                            return (
                                <div key={index} className='border border-gray-200 shadow-md rounded-md p-4' >
                                    <section className='flex justify-between'>
                                        <div className='flex space-x-2'>

                                            <Image src={profile_pic} width={50} height={50} alt="Customer Image" className='rounded-full border' />
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
                        reviewData && reviewData?.map((item, index) => {
                            const { customerData, medias } = item
                            const { picture, google_id } = customerData
                            let profile_pic = "/avatarplaceholder.png"
                            if (picture) {
                                if (google_id && google_id.trim() !== "" || !picture.startsWith("https")) {
                                    profile_pic = `${AdminUrl}/uploads/customerProfileImages/${picture}`
                                } else {
                                    profile_pic = picture
                                }
                            } else {
                                profile_pic = "/avatarplaceholder.png"
                            }
                            return (
                                <div key={index} className='border border-gray-200 shadow-md rounded-md p-4' >
                                    <section className='flex justify-between'>
                                        <div className='flex space-x-2'>

                                            <Image src={profile_pic} width={50} height={50} alt="Customer Image" className='rounded-full border' />
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
                            shopShow={false}
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