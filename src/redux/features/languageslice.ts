import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const initialState = {
    languageCode: "en",
    languageName: "English",
    countryCode:"In",
    countryName:"India",
    availablecountries: [
        {
          name: "India",
        //   image:require("../../assets/images/flags/india.png"),
          languages: [
            { name: "Hindi", langcode: "hi" },
            { name: "English", langcode: "en" },
          ]
        },
        {
          name: "Somalia",
        //   image:require("../../assets/images/flags/somalia.png"),
          languages: [ 
            { name: "English", langcode: "en" },
            { name: "Somali", langcode: "so" },   
            { name: "Arabic", langcode: "ar" }
          ] 
        },
        {
          name: "Kenya", 
        //   image:require("../../assets/images/flags/kenya.png"),
          languages: [
            { name: "English", langcode: "en" },
            { name: "Swahili", langcode: "sw" }
          ]
        },
        {
          name: "Ethiopia",
        //   image:require("../../assets/images/flags/ethiopia.png"),
          languages: [
            { name: "English", langcode: "en" },
            { name: "Amharic", langcode: "am" },
          ]
        },
        {
          name: "France",
        //   image:require("../../assets/images/flags/france.png"),
          languages: [
            { name: "English", langcode: "en" },
            { name: "French", langcode: "fr" }
          ]
        }
      ],
      availablelanguages :[
        {
            langName:"English",
            langCode:"en"
        },
        {
            langName:"Hindi",
            langCode:"hi"
        },
        {
            langName:"Somali",
            langCode:"so"
        },
        {
            langName:"Amharic",
            langCode:"am"
        },
        {
            langName:"Arabic",
            langCode:"ar"
        },
        {
            langName:"French",
            langCode:"fr"
        },

      ]
  }

  export const languages = createSlice({
    name:"language",
    initialState,
    reducers:{
        
        setLanguage:(state,action:PayloadAction<string>) => {
            const {newlanguageCode,newlanguageName} = action.payload
            return {
                ...state,
                languageCode:newlanguageCode,
                languageName:newlanguageName
            }
        },
        setCountry:(state,action:PayloadAction<string>) => {
            const {newcountryCode,newcountryName} = action.payload
            return {
                ...state,
                countryCode:newcountryCode,
                countryName:newcountryName
            }
        }

        
    }
})

export const {setCountry,setLanguage} = languages.actions
export default languages.reducer      