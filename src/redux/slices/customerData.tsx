import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerDataState {
    customerData: any[];
}

const initialState: CustomerDataState = {
    customerData: [],
};

export const customerDataSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        updateCustomerData: (state, action: PayloadAction<any>) => {
            state.customerData = action.payload;
        },
        emptyCustomer: (state) => {
            state.customerData = [];
        },
    },
});

export const { updateCustomerData, emptyCustomer } = customerDataSlice.actions;
export default customerDataSlice.reducer;