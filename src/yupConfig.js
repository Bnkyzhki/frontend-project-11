import * as Yup from 'yup';
import i18next from 'i18next';

const setYupLocale = () => {
  Yup.setLocale({
    mixed: {
      required: () => i18next.t('required'),
      notOneOf: () => i18next.t('notOneOf'),
    },
    string: {
      url: () => i18next.t('url'),
    },
  });
};

export default setYupLocale;

