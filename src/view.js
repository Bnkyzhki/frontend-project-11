import i18next from 'i18next';

const getElements = () => {
  const input = document.getElementById('rssInput');
  const errorFeedback = document.getElementById('errorFeedback');
  const successFeedback = document.getElementById('successFeedback');
  if (!input || !errorFeedback || !successFeedback) {
    console.error('Не удалось найти один или несколько элементов в DOM');
    return null;
  }
  return { input, errorFeedback, successFeedback };
};

export const showError = (messageKey) => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('errorFeedback');
  if (input && feedback) {
    input.classList.add('is-invalid');
    feedback.textContent = i18next.t(`errors.${messageKey}`);
    feedback.classList.remove('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "errorFeedback" не найдены в DOM');
  }
};

export const clearError = () => {
  const elements = getElements();
  if (!elements) return;

  const { input, errorFeedback } = elements;
  input.classList.remove('is-invalid');
  errorFeedback.textContent = '';
  errorFeedback.classList.add('d-none');
};

export const showSuccess = () => {
  const input = document.getElementById('rssInput');
  const feedback = document.getElementById('successFeedback');
  if (input && feedback) {
    input.classList.add('is-valid');
    feedback.textContent = i18next.t('success.rssAdded');
    feedback.classList.remove('d-none');
  } else {
    console.error('Элементы с id "rssInput" или "successFeedback" не найдены в DOM');
  }
};

export const clearSuccess = () => {
  const elements = getElements();
  if (!elements) return;

  const { input, successFeedback } = elements;
  input.classList.remove('is-valid');
  successFeedback.textContent = '';
  successFeedback.classList.add('d-none');
};

export const clearInput = () => {
  const { input } = getElements() || {};
  if (!input) return;

  input.value = '';
  input.focus();
};
