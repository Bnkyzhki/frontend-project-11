import * as Yup from 'yup';

const validationSchema = Yup.object({
  rssUrl: Yup.string()
    .url('Некорректный URL')
    .required('Введите URL')
    .test('is-duplicate', 'Этот URL уже существует', async function (value) {
      const isDuplicate = rssFeeds.includes(value);
      if (isDuplicate) {
        return this.createError({ message: 'Этот URL уже существует' });
      }
      return true;
    }),
});

export const validateRssUrl = async (rssUrl) => {
  try {
    await validationSchema.validate({ rssUrl });
    return null; // Валидация прошла
  } catch (error) {
    return error.message; // Возвращаем сообщение об ошибке
  }
};
