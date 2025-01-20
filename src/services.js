import { showError, clearError, showSuccess, clearSuccess, clearInput } from './view.js';
import { addFeed } from './model.js';
import { validateRssUrl } from './validator.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rssForm');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const rssUrl = document.getElementById('rssInput').value;

    // Валидация URL
    const error = await validateRssUrl(rssUrl);

    if (error) {
      showError(error); // Показываем ошибку
      clearSuccess(); // Скрываем успех
    } else {
      clearError(); // Убираем ошибку
      addFeed(rssUrl); // Добавляем фид в список
      showSuccess(); // Показываем сообщение об успехе
      clearInput(); // Очищаем поле ввода
    }
  });
});

