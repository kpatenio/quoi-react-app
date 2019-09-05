// This is the config file for i18next. This will wrap our entire app.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/en';
import fr from './locales/fr/fr';

i18n
    .use(initReactI18next) // use and pass i18n instance to react-i18next 
    .init({
        lng: 'en',
        interpolation: { escapeValue: false }, // set to false since React already does this for us!
        resources: {
            en: en,
            fr: fr
        }
    });

export default i18n;