import {createSlice,PayloadAction} from "@reduxjs/toolkit"

type initialState = {
    value:{
        isAuth:boolean,
        username:string,
        uid:string,
        isModerator: boolean
    }
    
}

const initialState = {
    value :{
        isAuth:false,
        username:"initail user",
        uid:"",
        isModerator: false
    }
}

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login : (state,action:PayloadAction<string>) => {
            return {
                value :{
                    isAuth:true,
                    username:"THE USER IS LOGGED IN SUCCESSFULLY",
                    uid:"",
                    isModerator: false
                }
            }
        },
        logout:(state,action:PayloadAction<string>) => {
            return {
                value :{
                    isAuth:false,
                    username:"I AM LOGGED OUT",
                    uid:"",
                    isModerator: false
                }
            }
        }
    }
})

export const {login,logout} = auth.actions
export default auth.reducer