import axios from 'axios';

export const fetchRss = async (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  try {
    const response = await axios.get(proxyUrl);
    if (!response.data.contents) {
      throw new Error('rssLoadError');
    }
    return response.data.contents;
  } catch (error) {
    throw new Error('networkError');
  }
};
