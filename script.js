const currentTimeElement = document.querySelector(".current-time");
let currentTime = Date.now();

setInterval(() => {
  currentTime--;
  currentTimeElement.textContent = currentTime;
}, 1000);
