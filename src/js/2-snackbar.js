import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        position: 'topRight',
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
