import axios from 'axios';

export const fetchRss = async (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
  
  try {
    const response = await axios.get(proxyUrl);

    if (response.status !== 200) {
      throw new Error('rssLoadError');
    }

    const { contents } = response.data;

    if (!contents || contents.trim() === '') {
      throw new Error('rssLoadError');
    }

    return contents;
  } catch (error) {
    if (error.response) {
      throw new Error('rssLoadError');
    }
    throw new Error('networkError');
  }
};

