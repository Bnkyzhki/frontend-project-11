
export const showError = (message) => {
  const errorElement = document.getElementById('errorFeedback');
  const inputElement = document.getElementById('rssInput');
  errorElement.textContent = message;
  inputElement.classList.add('is-invalid');
};

export const clearError = () => {
  const inputElement = document.getElementById('rssInput');
  const errorElement = document.getElementById('errorFeedback');
  inputElement.classList.remove('is-invalid');
  errorElement.textContent = '';
};

export const showSuccess = () => {
  const successElement = document.getElementById('successFeedback');
  successElement.classList.remove('d-none');
};

export const clearSuccess = () => {
  const successElement = document.getElementById('successFeedback');
  successElement.classList.add('d-none');
};

export const updateFeedList = (rssFeeds) => {
  const feedListElement = document.getElementById('rss-list');
  feedListElement.innerHTML = '';
  rssFeeds.forEach((feed) => {
    const li = document.createElement('li');
    li.textContent = feed;
    feedListElement.appendChild(li);
  });
};

export const clearInput = () => {
  const inputElement = document.getElementById('rssInput');
  inputElement.value = '';
  inputElement.focus();
};
