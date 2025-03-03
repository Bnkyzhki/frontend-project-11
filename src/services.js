import * as uuid from 'uuid';
import initI18n from './i18n.js';
import setYupLocale from './yupConfig.js';
import View from './view.js';
import {
  addFeed,
  addPosts,
  isFeedAlreadyAdded,
  markPostAsViewed,
  toggleContentVisibility,
  addListener,
  getFeeds,
  getPosts,
  getViewedPosts,
  getContentVisibility,
} from './model.js';
import validateRssUrl from './validator.js';
import fetchRss from './fetchRss.js';
import parseRSS from './parseRSS.js';

/* global bootstrap */

document.addEventListener('DOMContentLoaded', () => {
  initI18n().then((i18next) => {
    setYupLocale();

    const elements = {
      form: document.getElementById('rssForm'),
      input: document.getElementById('rssInput'),
      errorFeedback: document.getElementById('errorFeedback'),
      successFeedback: document.getElementById('successFeedback'),
      feedContainer: document.getElementById('feedsContainer'),
      postContainer: document.getElementById('postsContainer'),
      feedsSection: document.getElementById('feeds'),
      postsSection: document.getElementById('posts'),
      modal: new bootstrap.Modal(document.getElementById('postModal')),
      modalTitle: document.getElementById('postModalLabel'),
      modalBody: document.getElementById('postModalBody'),
    };

    const view = View(elements, i18next);
    view.toggleContentVisibility(getContentVisibility());

    addListener((path, value) => {
      switch (path) {
        case 'feeds':
          view.renderFeeds(value);
          break;
        case 'posts':
          view.renderPosts(value, getViewedPosts());
          break;
        case 'viewedPosts':
          view.renderPosts(getPosts(), value);
          break;
        case 'isContentVisible':
          view.toggleContentVisibility(value);
          break;
        default:
          break;
      }
    });

    const { 
      showError, 
      showSuccess, 
      clearInput, 
      clearError 
    } = view;

    const checkNewPosts = () => {
      getFeeds().forEach(({ url, id: feedId }) => {
        fetchRss(url)
          .then((xmlData) => {
            const { posts } = parseRSS(xmlData);
            const newPosts = posts
              .filter(({ link }) => !getPosts().some((p) => p.link === link))
              .map((post) => ({
                ...post,
                id: uuid.v4(),
                feedId,
              }));

            if (newPosts.length) addPosts(newPosts);
          })
          .catch(() => showError('rssUpdateError'));
      });
      setTimeout(checkNewPosts, 5000);
    };

    elements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const rssUrl = elements.input.value.trim();
      clearError();

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
              const feedWithId = {
                ...feed,
                id: uuid.v4(),
                url: rssUrl,
              };
              const postsWithId = posts.map((post) => ({
                ...post,
                id: uuid.v4(),
                feedId: feedWithId.id,
              }));

              addFeed(feedWithId);
              addPosts(postsWithId);
              toggleContentVisibility(true);
              showSuccess();
              clearInput();
            })
            .catch((error) => showError(error.message || 'rssLoadError'));
        })
        .catch((err) => showError(err.message || 'invalidUrl'));
    });

    elements.postContainer.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('preview-btn')) {
        const postId = target.dataset.id;
        const { description } = target.dataset;
        markPostAsViewed(postId);
        view.showModal(target.previousElementSibling.textContent, description);
      }
    });

    checkNewPosts();
  });
});
