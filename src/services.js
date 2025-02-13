import * as uuid from 'uuid';
import initI18n from './i18n.js';
import setYupLocale from './yupConfig.js';
import {
  showError,
  showSuccess,
  clearInput,
  toggleFeedsAndPostsVisibility,
  renderFeeds,
  renderPosts,
} from './view.js';
import {
  addFeed,
  addPosts,
  isFeedAlreadyAdded,
  getFeeds,
  getPosts,
  markPostAsViewed,
  getViewedPosts,
} from './model.js';
import validateRssUrl from './validator.js';
import fetchRss from './fetchRss.js';
import parseRSS from './parseRSS.js';

const checkNewPosts = () => {
  const feedRequests = getFeeds().map(({ url, id: feedId }) =>
    fetchRss(url).then((xmlData) => {
        const { posts } = parseRSS(xmlData);
        const existingPosts = getPosts();
        const existingPostLinks = new Set(
          existingPosts.map(({ link }) => link),
        );

        const newPosts = posts
          .filter(({ link }) => !existingPostLinks.has(link))
          .map((post) => ({
            id: uuid.v4(),
            feedId,
            ...post,
          }));

        if (newPosts.length > 0) {
          addPosts(newPosts);
          renderPosts(getPosts(), getViewedPosts());
        }
      })
      .catch((error) => {
        console.error(`Ошибка при обновлении постов для ${url}:`, error);
      }),
  );

  Promise.all(feedRequests).finally(() => {
    setTimeout(checkNewPosts, 5000);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initI18n().then(() => {
    setYupLocale();

    const form = document.getElementById('rssForm');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const rssUrl = document.getElementById('rssInput').value;

      validateRssUrl(
        rssUrl,
        getFeeds().map((feed) => feed.url),
      )
        .then(() => {
          if (isFeedAlreadyAdded(rssUrl)) {
            showError('feedAlreadyAdded');
            return;
          }

          fetchRss(rssUrl)
            .then((xmlData) => {
              const { feed, posts } = parseRSS(xmlData);

              const feedWithId = { ...feed, id: uuid.v4(), url: rssUrl };
              const postsWithId = posts.map((post) => ({
                id: uuid.v4(),
                feedId: feedWithId.id,
                ...post,
              }));

              addFeed(feedWithId);
              addPosts(postsWithId);

              renderFeeds(getFeeds());
              renderPosts(getPosts(), getViewedPosts());

              toggleFeedsAndPostsVisibility(true);
              showSuccess();
              clearInput();
            })
            .catch((error) => {
              showError(error.message || 'rssLoadError');
            });
        })
        .catch((err) => {
          showError(err.message || 'rssLoadError');
        });
    });
  });

  document.addEventListener('click', (event) => {
    const postLink = event.target.closest('.post-link');
    if (postLink) {
      const { postId } = postLink.dataset;
      markPostAsViewed(postId);
    }
  });

  checkNewPosts();
});
