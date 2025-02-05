import { v4 as uuidv4 } from 'uuid';

const parseRSS = (xmlData) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlData, 'application/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('RSS parsing error');
  }

  const channel = doc.querySelector('channel');
  const feed = {
    id: uuidv4(),
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };

  const posts = Array.from(channel.querySelectorAll('item')).map((item) => ({
    id: uuidv4(),
    feedId: feed.id,
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
  }));

  return { feed, posts };
};

export default parseRSS;
