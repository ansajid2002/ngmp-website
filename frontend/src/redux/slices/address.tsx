import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerAddress {
    AddressData: any;
}

const initialState: CustomerAddress = {
    AddressData: {},
};

export const AddressDataSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        updateSelectedAddress: (state, action: PayloadAction<any>) => {
            console.log(action.payload, "action");

            state.AddressData[0] = action.payload;
        },

    },
});

export const { updateSelectedAddress } = AddressDataSlice.actions;
export default AddressDataSlice.reducer;