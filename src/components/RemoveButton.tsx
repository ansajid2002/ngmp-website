"use client"

import { AdminUrl } from '@/app/layout';
import { removeItem } from '@/redux/slices/cartSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export function RemoveButton({ itemId, item }) {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const customerId = 71

    const handleRemove = async (itemId: number, item: any) => {
        try {
            setIsLoading(true);
            const { category, subcategory, uniquepid, label } = item;

            const replacecategory = category.replace(/[^\w\s]/g, '').replace(/\s/g, '');
            const replacesubcategory = subcategory.replace(/[^\w\s]/g, '').replace(/\s/g, '');

            // Make the API request to remove the item
            const apiUrl = `/api/DeleteCart/${replacecategory}/${replacesubcategory}/${uniquepid}/${label || 'empty'}/${customerId}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle success, update UI or perform any other action
        } catch (error) {
            console.error('Error removing product:', error);
            // Handle error, show a message to the user, or retry the operation
        } finally {
            setIsLoading(false);
            dispatch(removeItem(item));

        }
    };

    return (
        <button
            onClick={() => handleRemove(itemId, item)}
            className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
            disabled={isLoading}
        >
            {isLoading ? 'Removing...' : 'Remove'}
        </button>
    );
}