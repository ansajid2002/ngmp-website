import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { AdminUrl } from '@/app/layout';

const StarRating = ({ enable = true, order_id, selectedRating, ratingData, item }) => {
    console.log(selectedRating);

    const [rating, setRating] = useState(selectedRating);
    const [data, setData] = useState(ratingData || [])
    const [visible, setModalVisible] = useState(false)
    const { vendor_id, customer_id, product_uniqueid, label } = item
    const handleStarClick = async (newRating, type) => {
        if (!customer_id) {
            return alert("Kindly Login to add review...")
        }
        setRating(newRating);
        // onRatingChange(newRating); // Notify the parent component

        try {
            // Create the request data object
            const requestData = {
                vendor_id: vendor_id,
                customer_id: customer_id,
                product_uniqueid: product_uniqueid,
                rating: newRating,
                label: label,
                order_id
            };

            // Send the POST request with the data
            if (enable) {
                const response = await fetch(`/api/Rating`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    // If the response status is okay, parse and handle the response data
                    // Alert the response
                    {
                        type !== "nochange" && message.success('Thanks you for Rating');
                    }
                    const data = await response.json()
                } else {
                    // If the response status is not okay, handle the error
                    console.log('Request failed with status:', response.status);
                    // Alert an error message
                }
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            // Alert an error message
            message.error(error.message);
        }
    };


    return (
        <div>
            <div className='flex gap-2 md:gap-4'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        style={{
                            cursor: enable ? 'pointer' : 'default',
                            fontSize: '24px',
                            color: star <= rating ? 'gold' : 'gray',
                        }}
                    >
                        ★
                    </span>
                ))}
                {rating > 0 && (
                    <button onClick={() => setModalVisible(true)}>
                        Write a Review
                    </button>
                )}
                <Modal open={visible} title={'Write a review'} onCancel={() => setModalVisible(false)}>
                    <h1>Hey</h1>
                </Modal>
            </div>
        </div>
    );
};

export default StarRating;
