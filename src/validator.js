import * as Yup from 'yup';

export const validateRssUrl = (url, rssFeeds) => {
  const schema = Yup.string()
    .required()
    .url()
    .notOneOf(rssFeeds);

  return schema.validate(url)
    .catch((err) => {
      throw err.message; 
    });
};

