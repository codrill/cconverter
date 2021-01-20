import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './translations/en.json'
import translationPL from './translations/pl.json'

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

// eslint-disable-next-line import/no-default-export
export default i18n
