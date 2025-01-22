export const showError = (message) => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('feedback');
  input.classList.add('is-invalid');
  feedback.textContent = message;
  feedback.classList.add('text-danger');
};

export const clearError = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('feedback');
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.remove('text-danger');
};

export const showSuccess = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('feedback');
  input.classList.add('is-valid');
  feedback.textContent = 'RSS успешно добавлен!';
  feedback.classList.add('text-success');
};

export const clearSuccess = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('feedback');
  input.classList.remove('is-valid');
  feedback.textContent = '';
  feedback.classList.remove('text-success');
};

export const clearInput = () => {
  const input = document.getElementById('rssInput');
  input.value = '';
  input.focus(); // Устанавливаем фокус на инпут
};

