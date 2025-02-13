import i18next from 'i18next';
import { markPostAsViewed } from './model.js';

/* global bootstrap */

const getElements = () => {
  const input = document.getElementById('rssInput');
  const errorFeedback = document.getElementById('errorFeedback');
  const successFeedback = document.getElementById('successFeedback');
  const feedContainer = document.getElementById('feedsContainer');
  const postContainer = document.getElementById('postsContainer');
  const modalTitle = document.getElementById('postModalLabel');
  const modalBody = document.getElementById('postModalBody');
  const modal = new bootstrap.Modal(document.getElementById('postModal'));

  return {
    input,
    errorFeedback,
    successFeedback,
    feedContainer,
    postContainer,
    modalTitle,
    modalBody,
    modal,
  };
};

export const showError = (messageKey) => {
  const { input, errorFeedback } = getElements();
  input.classList.add('is-invalid');
  errorFeedback.textContent = i18next.t(`errors.${messageKey}`);
  errorFeedback.classList.remove('d-none');
};

export const clearError = () => {
  const { input, errorFeedback } = getElements();
  input.classList.remove('is-invalid');
  errorFeedback.textContent = '';
  errorFeedback.classList.add('d-none');
};

export const showSuccess = () => {
  const { input, successFeedback } = getElements();
  input.classList.add('is-valid');
  successFeedback.textContent = i18next.t('success.rssAdded');
  successFeedback.classList.remove('d-none');
};

export const clearInput = () => {
  const { input } = getElements();
  input.value = '';
  input.focus();
};

export const renderFeeds = (feeds) => {
  const { feedContainer } = getElements();
  feedContainer.innerHTML = feeds
    .map(
      ({ title, description }) => `
    <li class="list-group-item">
      <h3>${title}</h3>
      <p>${description}</p>
    </li>
  `
    )
    .join('');
};

export const renderPosts = (posts, viewedPosts) => {
  const { postContainer } = getElements();
  postContainer.innerHTML = posts
    .map(
      ({ title, link, id, description }) => {
        const isViewed = viewedPosts.has(id);
        return `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <a href="${link}" target="_blank" class="${isViewed ? 'fw-normal' : 'fw-bold'}" data-id="${id}">${title}</a>
        <button class="btn btn-outline-primary btn-sm preview-btn" data-id="${id}" data-description="${description}">${i18next.t('buttons.preview')}</button>
      </li>
    `;
      }
    )
    .join('');
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('preview-btn')) {
    const { id, description } = event.target.dataset;

    markPostAsViewed(id);

    const { modalTitle, modalBody, modal } = getElements();
    modalTitle.textContent = event.target
      .closest('li')
      .querySelector('a').textContent;
    modalBody.textContent = description || ' ';

    modal.show();
  }
});

export const toggleFeedsAndPostsVisibility = (isVisible) => {
  const feedsSection = document.getElementById('feeds');
  const postsSection = document.getElementById('posts');

  feedsSection.classList.toggle('d-none', !isVisible);
  postsSection.classList.toggle('d-none', !isVisible);
};

document.addEventListener('DOMContentLoaded', () => {
  toggleFeedsAndPostsVisibility(false);
});
