import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authtutorialslice"
import languagesReducer from "./features/languageslice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import cartSlice from "./slices/cartSlice"
import wishlistSlice from "./slices/wishlistSlice"
import customerDataSlice from "./slices/customerData"
import AddressDataSlice from "./slices/address"

export const store = configureStore({
    reducer: {
        authReducer,
        languagesReducer,
        cart: cartSlice,
        wishlist: wishlistSlice,
        customerData: customerDataSlice,
        address: AddressDataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector