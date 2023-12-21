import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useState } from "react";

interface WishlistItem {
    uniquepid: string;
    // Add other properties as needed
}

interface WishlistState {
    wishlistItems: WishlistItem[];
}

const initialState: WishlistState = {
    wishlistItems: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,

    reducers: {
        addItemToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const newItem = action.payload;
            const existingItem = state.wishlistItems.find(item => item.uniquepid === newItem.uniquepid);

            if (existingItem) {
                // Item already exists in the wishlist, you can handle it as needed
                // For example, you might want to update its quantity or show a message
                // existingItem.quantity++;
                // Show a message that the item is already in the wishlist
            } else {
                state.wishlistItems.push(newItem);
            }
        },
        removeItemFromWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const itemIdToRemove = action.payload.uniquepid;
            state.wishlistItems = state.wishlistItems.filter(item => item.uniquepid !== itemIdToRemove);
        },
        updateproductsListwishlist: (state, action: PayloadAction<WishlistItem[]>) => {
            state.wishlistItems = action.payload;
        },
        emptyWishlist: (state) => {
            state.wishlistItems = [];
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist, updateproductsListwishlist, emptyWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
