import {createSlice,PayloadAction} from "@reduxjs/toolkit"


const initialState = {
    languageCode: "en",
    languageName: "English",
  
    availablelanguages : [
      {
        id: 1,
        label: "English",
        link: "/",
        lcode: "en",
      },
      {
        id: 2,
        label: "Somali",
        link: "/",
        lcode: "so",
      },
      {
        id: 3,
        label: "Arabic",
        link: "/",
        lcode: "ar",
      },
      {
        id: 4,
        label: "Hindi",
        link: "/",
        lcode: "hi",
      },
      {
        id: 5,
        label: "Amharic",
        link: "/",
        lcode: "am",
      },
      {
        id: 6,
        label: "Swahili",
        link: "/",
        lcode: "sw",
      },
      {
        id: 7,
        label: "French",
        link: "/",
        lcode: "fr",
      },
    ],
 
  }

  export const languages = createSlice({
    name:"language",
    initialState,
    reducers:{
        
        setLanguage:(state,action:PayloadAction<any>) => {
            const {newlanguageCode,newlanguageName} = action.payload
            return {
                ...state,
                languageCode:newlanguageCode,
                languageName:newlanguageName,
                // languageImg:newlanguageImg
            }
        },
        

        
    }
})

export const {setLanguage} = languages.actions
export default languages.reducer      