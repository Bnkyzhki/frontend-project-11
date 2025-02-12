import axios from 'axios';

const fetchRss = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios
    .get(proxyUrl)
    .then((response) => {
      const { contents } = response.data;

      if (!contents || contents.trim() === '') {
        throw new Error('rssLoadError');
      }

      return contents;
    })
    .catch((error) => {
      if (error.response) {
        throw new Error('rssLoadError');
      }
      throw new Error('networkError');
    });
};

export default fetchRss;
