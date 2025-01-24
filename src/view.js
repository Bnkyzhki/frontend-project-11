export const showError = (message) => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('errorFeedback');
  if (input && feedback) {
    input.classList.add('is-invalid');
    feedback.textContent = message;
    feedback.classList.remove('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "errorFeedback" не найдены в DOM');
  }
};

export const clearError = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('errorFeedback');
  if (input && feedback) {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
    feedback.classList.add('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "errorFeedback" не найдены в DOM');
  }
};

export const showSuccess = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('successFeedback');
  if (input && feedback) {
    input.classList.add('is-valid');
    feedback.textContent = 'RSS успешно добавлен!';
    feedback.classList.remove('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "successFeedback" не найдены в DOM');
  }
};

export const clearSuccess = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('successFeedback');
  if (input && feedback) {
    input.classList.remove('is-valid');
    feedback.textContent = '';
    feedback.classList.add('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "successFeedback" не найдены в DOM');
  }
};

export const clearInput = () => {
  const input = document.getElementById('rssInput');
  if (input) {
    input.value = '';
    input.focus();
  } else {
    console.error('Элемент с id "rssInput" не найден в DOM');
  }
};

