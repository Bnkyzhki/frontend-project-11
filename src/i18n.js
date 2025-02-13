import i18next from 'i18next';
import resources from './locales/index.js';

const initI18n = async () => {
  await i18next.init({
    lng: 'ru',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
};

export default initI18n;
