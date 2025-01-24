import * as yup from 'yup';

export const validateRssUrl = (rssUrl, feeds) => {
  const validationSchema = yup.object({
    rssUrl: yup.string()
      .url('Некорректный URL')
      .required('Введите URL')
      .notOneOf(feeds, 'Этот URL уже существует'),
  });

  return validationSchema.validate({ rssUrl })
    .then(() => null)
    .catch((error) => Promise.reject(error.message));
};

