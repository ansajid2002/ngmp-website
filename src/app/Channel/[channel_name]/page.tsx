"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import BestSeller from '@/components/Channels/BestSeller';
import NewArrivals from '@/components/Channels/NewArrivals';

const Channel = () => {
    const params = useParams();

    const { channel_name } = params

    return (
        <div>
            {
                channel_name === 'best-seller' && <BestSeller />
            }
            {
                channel_name === 'new-arrivals' && <NewArrivals />

            }
        </div>
    );
};

export default Channel;
