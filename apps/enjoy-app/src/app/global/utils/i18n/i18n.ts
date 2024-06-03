import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Settings } from 'luxon';
import en from './en.json';

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
};

function initi18n() {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
  });
}

// luxon
Settings.defaultLocale = 'en-GB';

export default initi18n;
