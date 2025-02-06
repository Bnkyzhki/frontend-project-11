import initI18n from './i18n.js';
import setYupLocale from './yupConfig.js';
import { showError, clearError, showSuccess, clearInput, renderFeeds, renderPosts, toggleFeedsAndPostsVisibility } from './view.js';
import { addFeed, addPosts, isFeedAlreadyAdded, getFeeds, getPosts } from './model.js';
import { validateRssUrl } from './validator.js';
import { fetchRss } from './fetchRss.js';
import parseRSS from './parseRSS.js';

const viewedPosts = new Set();

const checkNewPosts = () => {
  getFeeds().forEach(({ url }) => {
    fetchRss(url)
      .then((xmlData) => {
        const { posts } = parseRSS(xmlData);
        addPosts(posts);
        renderPosts(getPosts(), viewedPosts);
      })
      .catch(() => {});
  });
  setTimeout(checkNewPosts, 5000);
};

document.addEventListener('DOMContentLoaded', async () => {
  await initI18n();
  setYupLocale();

  const form = document.getElementById('rssForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const rssUrl = document.getElementById('rssInput').value;

    validateRssUrl(rssUrl, getFeeds().map((feed) => feed.url))
      .then(() => {
        clearError();
        if (isFeedAlreadyAdded(rssUrl)) {
          showError('feedAlreadyAdded');
          return;
        }
        return fetchRss(rssUrl)
          .then((xmlData) => {
            const { feed, posts } = parseRSS(xmlData);
            addFeed({ ...feed, url: rssUrl });
            addPosts(posts);
            renderFeeds(getFeeds());
            renderPosts(getPosts(), viewedPosts);
            toggleFeedsAndPostsVisibility(true);
            showSuccess();
            clearInput();
          });
      })
      .catch((error) => {
        showError(error.message || 'rssLoadError');
      });
  });
  checkNewPosts();
});

