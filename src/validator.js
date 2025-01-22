import * as Yup from 'yup';

export const validateRssUrl = (rssUrl, feeds) => {
  const validationSchema = Yup.object({
    rssUrl: Yup.string()
      .url('Некорректный URL')
      .required('Введите URL')
      .notOneOf(feeds, 'Этот URL уже существует'),
  });

  return validationSchema.validate({ rssUrl })
    .then(() => null) // Успешная валидация
    .catch((error) => Promise.reject(error.message)); // Возвращаем сообщение об ошибке
};

