import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from  'i18next-browser-languagedetector';
//Importing i18n translations from i18n folder inside of src/i18n/...
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import de from './locales/de/translation.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: false,
    fallbackLng: 'en',
    detection: {
        order: ['navigator'],
        fallbackLng: 'en'
    },
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {translation: en},
        es: {translation: es},
        de: {translation: de},
    }
});

export default i18n;