// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { AdminUrl } from '../constant';
import { AdminUrl } from '@/app/layout';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {},
  });

const fetchTranslationResources = async (language: string) => {


    
  try {
    const response = await fetch(`${AdminUrl}/api/translations/${language}`);
    const translationData = await response.json();

    
    i18n.addResourceBundle(language, 'translation', translationData);
    i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error fetching translation resources:', error);
  }
};

export const changeLanguage = async (language: string) => {
  
    
  if (language !== i18n.language) {
    await fetchTranslationResources(language);
  }
};

export default i18n;
