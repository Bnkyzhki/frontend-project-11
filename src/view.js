import i18next from 'i18next';

const getElements = () => {
  const input = document.getElementById('rssInput');
  const errorFeedback = document.getElementById('errorFeedback');
  const successFeedback = document.getElementById('successFeedback');
  const feedContainer = document.getElementById('feeds');
  const postContainer = document.getElementById('posts');
  const modalTitle = document.getElementById('postModalLabel');
  const modalBody = document.getElementById('postModalBody');
  const modal = new bootstrap.Modal(document.getElementById('postModal'));

  return { input, errorFeedback, successFeedback, feedContainer, postContainer, modalTitle, modalBody, modal };
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
  feedContainer.innerHTML = feeds.map(({ title, description }) => `
    <li class="list-group-item">
      <h3>${title}</h3>
      <p>${description}</p>
    </li>
  `).join('');
};

export const renderPosts = (posts, viewedPosts) => {
  const { postContainer, modalTitle, modalBody, modal } = getElements();

  postContainer.innerHTML = posts.map(({ title, link, description, id }) => {
    const isViewed = viewedPosts.has(id);
    return `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <a href="${link}" target="_blank" class="${isViewed ? 'fw-normal' : 'fw-bold'}" data-id="${id}">${title}</a>
        <button class="btn btn-outline-primary btn-sm preview-btn" data-id="${id}" data-title="${title}" data-description="${description ?? ''}">${i18next.t('buttons.preview')}</button>
      </li>
    `;
  }).join('');

  postContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('preview-btn')) {
      const { id, title, description } = event.target.dataset;

      viewedPosts.add(id);
      modalTitle.textContent = title;
      modalBody.textContent = description || ' ';

      const modalInstance = bootstrap.Modal.getInstance(modal._element) || modal;
      modalInstance.show();

      // модальник не снимается сам по себе, пришлось добавть снятие врукопашную,хех
      modalInstance._element.addEventListener('hidden.bs.modal', () => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      });
    }
  });
};

export const toggleFeedsAndPostsVisibility = (isVisible) => {
  const { feedContainer, postContainer } = getElements();
  if (isVisible) {
    feedContainer.classList.remove('d-none');
    postContainer.classList.remove('d-none');
  } else {
    feedContainer.classList.add('d-none');
    postContainer.classList.add('d-none');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  toggleFeedsAndPostsVisibility(false);
});
