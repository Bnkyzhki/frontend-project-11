import * as Yup from 'yup';

const validateRssUrl = (url, addedUrls) => {
  const schema = Yup.string()
    .required()
    .url()
    .notOneOf(addedUrls, 'feedAlreadyAdded');

  return schema.validate(url).catch((err) => {
    if (err.message === 'feedAlreadyAdded') {
      throw new Error('feedAlreadyAdded');
    }

    if (err.message.includes('url')) {
      throw new Error('url');
    }

    // Для всех других ошибок
    throw new Error(err.message);
  });
};

export default validateRssUrl;
