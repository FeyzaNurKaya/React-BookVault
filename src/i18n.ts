import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './language/tr.json';
import en from './language/en.json';
import de from './language/deutsch.json';
import fr from './language/francais.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
    },
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;