import * as Yup from 'yup';

export const validateRssUrl = (url, addedUrls) => {
  const schema = Yup.string()
    .required()
    .url()
    .notOneOf(addedUrls, 'feedAlreadyAdded');

  return schema.validate(url).catch((err) => {
    throw new Error(err.message);
  });
};

