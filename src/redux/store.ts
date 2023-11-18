import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/authtutorialslice"
import languagesReducer from "./features/languageslice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import cartSlice from "./slices/cartSlice"
import wishlistSlice from "./slices/wishlistSlice"

export const store = configureStore({
    reducer: {
        authReducer,
        languagesReducer,
        cart: cartSlice,
        wishlist: wishlistSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector