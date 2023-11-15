import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    uniquepid: string;
    label: string;
    added_quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const newItemId = action.payload?.uniquepid;
            const label = action.payload?.label;

            const filteredItems = state.cartItems.find((item) => {
                if (label != null && label !== undefined) {
                    return item?.uniquepid === newItemId && item?.label === label;
                }
                return item?.uniquepid === newItemId;
            });

            if (filteredItems) {
                filteredItems.added_quantity++;
            } else {
                state.cartItems.push(action.payload);
            }
        },

        removeItem(state, action: PayloadAction<CartItem>) {
            const { label, uniquepid } = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item.label !== label || item.uniquepid !== uniquepid
            );
        },

        incrementItem(state, action: PayloadAction<CartItem>) {
            state.cartItems = state.cartItems.map((item) => {
                if (
                    item.uniquepid === action.payload?.uniquepid &&
                    (item.label === null ||
                        item.label === undefined ||
                        item.label === action.payload?.label)
                ) {
                    item.added_quantity++;
                }
                return item;
            }).filter((item) => item.added_quantity !== 0);
        },

        updateProductsListCart(state, action: PayloadAction<CartItem[]>) {
            state.cartItems = action.payload;
        },

        decrementItem(state, action: PayloadAction<CartItem>) {
            state.cartItems = state.cartItems.map((item) => {
                if (
                    item.uniquepid === action.payload?.uniquepid &&
                    (item.label === null ||
                        item.label === undefined ||
                        item.label === action.payload?.label)
                ) {
                    item.added_quantity--;
                }
                return item;
            }).filter((item) => item.added_quantity !== 0);
        },

        emptyCart(state) {
            state.cartItems = initialState.cartItems;
        },

        addCarts(state, action: PayloadAction<CartItem[]>) {
            const newItems = action.payload;
            const existingUniqueIds = state.cartItems.map(item => item?.uniquepid);
            const filteredNewItems = newItems.filter(newItem => {
                return (
                    !existingUniqueIds.includes(newItem?.uniquepid)
                );
            });

            state.cartItems = [...state.cartItems, ...filteredNewItems];
        }
    },
});

export const {
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    updateProductsListCart,
    emptyCart,
    addCarts,
} = cartSlice.actions;

export default cartSlice.reducer;