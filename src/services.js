import { showError, clearError, showSuccess, clearSuccess, clearInput } from './view.js';
import { addFeed, rssFeeds } from './model.js';
import { validateRssUrl } from './validator.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rssForm');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const rssUrl = document.getElementById('rssInput').value;

    validateRssUrl(rssUrl, rssFeeds)
      .then(() => {
        clearError();
        addFeed(rssUrl);
        showSuccess();
        clearInput();
      })
      .catch((error) => {
        showError(error);
        clearSuccess();
      });
  });
});