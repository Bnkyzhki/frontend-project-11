import axios from 'axios';

export const fetchRss = async (url) => {
  try {
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
    const response = await axios.get(proxyUrl);
    return response.data.contents;
  } catch (error) {
    console.error('Error fetching RSS:', error);
    throw new Error('Ошибка при загрузке RSS. Попробуйте снова.');
  }
};