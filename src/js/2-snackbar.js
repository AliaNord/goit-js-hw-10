const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = form.querySelector('input');
const textarea = form.querySelector('textarea');

let formData = { email: '', message: '' };

populateTextarea();

form.addEventListener('submit', handleSubmit);
input.addEventListener('input', handleInput);
textarea.addEventListener('input', handleInput);


function handleSubmit(event) {
  event.preventDefault();
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
  }
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
}

function handleInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    input.value = formData.email;
    textarea.value = formData.message;
  }
}
