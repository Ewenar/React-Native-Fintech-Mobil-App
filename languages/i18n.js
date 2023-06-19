import i18n from 'i18next';
import english from './english.json';
import turkish from './turkish.json';
import { initReactI18next } from 'react-i18next';


const resources = {
    en: {
      translation: english,
    },
    tr: {
      translation: turkish,
    },
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;