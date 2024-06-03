import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateTimerPicker = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdownInterval;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', handleStart);

function handleStart() {
  startBtn.disabled = true;
  dateTimerPicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = userSelectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      dateTimerPicker.disabled = false;
    } else {
      updateTimer(timeRemaining);
    }
  }, 1000);
}

function updateTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
