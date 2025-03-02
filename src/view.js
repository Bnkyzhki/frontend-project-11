export default (elements, i18next) => {
  const renderFeeds = (feeds) => {
    elements.feedContainer.innerHTML = feeds
      .map(
        ({ title, description }) => `
        <li class="list-group-item">
          <h3>${title}</h3>
          <p>${description}</p>
        </li>
      `,
      )
      .join('');
  };

  const renderPosts = (posts, viewedPosts) => {
    elements.postContainer.innerHTML = posts
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
      `a[data-id="${postId}"]`,
    );
    if (postLink) postLink.classList.replace('fw-bold', 'fw-normal');
  };

  const showModal = (title, description) => {
    elements.modalTitle.textContent = title;
    elements.modalBody.textContent = description;
    const modalInstance = new bootstrap.Modal(
      document.getElementById('postModal'),
    );
    modalInstance.show();
  };

  return {
    renderFeeds,
    renderPosts,
    updatePostLinkStyle,
    showModal,
    showError: (messageKey) => {
      elements.input.classList.add('is-invalid');
      elements.errorFeedback.textContent = i18next.t(`errors.${messageKey}`);
      elements.errorFeedback.classList.remove('d-none');
    },
    showSuccess: () => {
      elements.input.classList.add('is-valid');
      elements.successFeedback.textContent = i18next.t('success.rssAdded');
      elements.successFeedback.classList.remove('d-none');
    },
    clearInput: () => {
      elements.input.value = '';
      elements.input.focus();
    },
    clearError: () => {
      elements.input.classList.remove('is-invalid');
      elements.errorFeedback.textContent = '';
      elements.errorFeedback.classList.add('d-none');
    },
    toggleContentVisibility: (isVisible) => {
      elements.feedsSection.classList.toggle('d-none', !isVisible);
      elements.postsSection.classList.toggle('d-none', !isVisible);
    },
  };
};
