import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import india from "@/images/flags/india.png"
import ethiopia from "@/images/flags/ethiopia.png"
import france from "@/images/flags/france.png"
import kenya from "@/images/flags/kenya.png"
import somalia from "@/images/flags/somalia.png"
import usa from "@/images/flags/united-states.png"
import uae from "@/images/flags/united-arab-emirates.png"

const initialState = {
    languageCode: "en",
    languageName: "English",
    languageImg : usa,
    availablelanguages : [
      {
        id: 1,
        label: "English",
        link: "/",
        img: usa,
        lcode: "en",
      },
      {
        id: 2,
        label: "Somali",
        link: "/",
        img: somalia,
        lcode: "so",
      },
      {
        id: 3,
        label: "Arabic",
        link: "/",
        img: uae,
        lcode: "ar",
      },
      {
        id: 4,
        label: "Hindi",
        link: "/",
        img: india,
        lcode: "hi",
      },
      {
        id: 5,
        label: "Amharic",
        link: "/",
        img: ethiopia,
        lcode: "am",
      },
      {
        id: 6,
        label: "Swahili",
        link: "/",
        img:kenya ,
        lcode: "sw",
      },
      {
        id: 7,
        label: "French",
        link: "/",
        img: france,
        lcode: "fr",
      },
    ],
 
  }

  export const languages = createSlice({
    name:"language",
    initialState,
    reducers:{
        
        setLanguage:(state,action:PayloadAction<any>) => {
            const {newlanguageCode,newlanguageName,newlanguageImg} = action.payload
            return {
                ...state,
                languageCode:newlanguageCode,
                languageName:newlanguageName,
                languageImg:newlanguageImg
            }
        },
        

        
    }
})

export const {setLanguage} = languages.actions
export default languages.reducer      