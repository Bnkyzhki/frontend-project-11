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
        clearError(); // Убираем ошибку
        addFeed(rssUrl); // Добавляем фид в список
        showSuccess(); // Показываем сообщение об успехе
        clearInput(); // Очищаем поле ввода
      })
      .catch((error) => {
        showError(error); // Показываем ошибку
        clearSuccess(); // Скрываем успех
      });
  });
});