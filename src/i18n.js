import i18next from 'i18next';

import enTranslations from './locales/en';
import ruTranslations from './locales/ru';

const initI18n = async () => {
  await i18next.init({
    lng: 'ru',
    fallbackLng: 'en',
    resources: {
      en: { translation: enTranslations },
      ru: { translation: ruTranslations },
    },
    interpolation: {
      escapeValue: false,
    },
  });
};

export default initI18n;
