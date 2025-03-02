export default (elements, i18next) => {
  const {
    input,
    errorFeedback,
    successFeedback,
    feedsSection,
    postsSection,
    modalTitle,
    modalBody,
  } = elements;

  /* global bootstrap */

  const renderFeeds = (feeds) => {
    const { feedContainer } = elements;
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

  const renderPosts = (posts, viewedPosts) => {
    const { postContainer } = elements;
    postContainer.innerHTML = posts
      .map(({ title, link, id, description }) => {
        const isViewed = viewedPosts.has(id);
        return `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <a href="${link}" 
               target="_blank" 
               class="${isViewed ? 'fw-normal' : 'fw-bold'}" 
               data-id="${id}">
              ${title}
            </a>
            <button class="btn btn-outline-primary btn-sm preview-btn" 
                    data-id="${id}" 
                    data-description="${description}">
              ${i18next.t('buttons.preview')}
            </button>
          </li>
        `;
      })
      .join('');
  };

  const updatePostLinkStyle = (postId) => {
    const postLink = elements.postContainer.querySelector(
      `a[data-id="${postId}"]`
    );
    if (postLink) postLink.classList.replace('fw-bold', 'fw-normal');
  };

  return {
    renderFeeds,
    renderPosts,
    updatePostLinkStyle,
    showError: (messageKey) => {
      input.classList.add('is-invalid');
      errorFeedback.textContent = i18next.t(`errors.${messageKey}`);
      errorFeedback.classList.remove('d-none');
    },
    showSuccess: () => {
      input.classList.add('is-valid');
      successFeedback.textContent = i18next.t('success.rssAdded');
      successFeedback.classList.remove('d-none');
    },
    clearInput: () => {
      input.value = '';
      input.focus();
    },
    clearError: () => {
      input.classList.remove('is-invalid');
      errorFeedback.textContent = '';
      errorFeedback.classList.add('d-none');
    },
    toggleContentVisibility: (isVisible) => {
      feedsSection.classList.toggle('d-none', !isVisible);
      postsSection.classList.toggle('d-none', !isVisible);
    },
    showModal: (title, description) => {
      modalTitle.textContent = title;
      modalBody.textContent = description;
      const modalInstance = new bootstrap.Modal(document.getElementById('postModal'));
      modalInstance.show();
    },
  };
};

