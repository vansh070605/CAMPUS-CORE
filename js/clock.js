// =====================
// Auth Check
// =====================
auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "login.html";
});

// =====================
// Tab Switching
// =====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.onclick = () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
  };
});

// =====================
// Live Clock
// =====================
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('live-clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// =====================
// Timer
// =====================
let timerInterval = null, timerTime = 0, timerLeft = 0, timerRunning = false;
const timerDisplay = document.getElementById('timer-display');
document.getElementById('timer-start').onclick = () => {
  if (timerRunning) return;
  const min = parseInt(document.getElementById('timer-minutes').value) || 0;
  const sec = parseInt(document.getElementById('timer-seconds').value) || 0;
  if (!timerLeft) timerLeft = min * 60 + sec;
  if (!timerLeft) return;
  timerRunning = true;
  document.getElementById('timer-status').textContent = "Timer running...";
  timerInterval = setInterval(() => {
    if (timerLeft > 0) {
      timerLeft--;
      showTimer();
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('timer-status').textContent = "⏲️ Time's up!";
      timerLeft = 0;
      showTimer();
      // Optionally: play sound or notification
    }
  }, 1000);
};
document.getElementById('timer-pause').onclick = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById('timer-status').textContent = "Paused.";
};
document.getElementById('timer-reset').onclick = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerLeft = 0;
  timerRunning = false;
  showTimer();
  document.getElementById('timer-status').textContent = "";
};
function showTimer() {
  const min = String(Math.floor(timerLeft / 60)).padStart(2, '0');
  const sec = String(timerLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}
showTimer();

// =====================
// Stopwatch
// =====================
let stopwatchInterval = null, stopwatchTime = 0, stopwatchRunning = false;
const stopwatchDisplay = document.getElementById('stopwatch-display');
const lapsUl = document.getElementById('stopwatch-laps');
let laps = [];
document.getElementById('stopwatch-start').onclick = () => {
  if (stopwatchRunning) return;
  stopwatchRunning = true;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    showStopwatch();
  }, 1000);
};
document.getElementById('stopwatch-pause').onclick = () => {
  if (stopwatchInterval) clearInterval(stopwatchInterval);
  stopwatchRunning = false;
};
document.getElementById('stopwatch-reset').onclick = () => {
  if (stopwatchInterval) clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  laps = [];
  showStopwatch();
  lapsUl.innerHTML = '';
  stopwatchRunning = false;
};
document.getElementById('stopwatch-lap').onclick = () => {
  laps.push(formatStopwatch(stopwatchTime));
  renderLaps();
};
function showStopwatch() {
  stopwatchDisplay.textContent = formatStopwatch(stopwatchTime);
}
function formatStopwatch(t) {
  const h = String(Math.floor(t / 3600)).padStart(2, '0');
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
function renderLaps() {
  lapsUl.innerHTML = laps.map((lap, i) => `<li>Lap ${i+1}: ${lap}</li>`).join('');
}
showStopwatch();

// =====================
// Alarm
// =====================
let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
const alarmList = document.getElementById('alarm-list');
const alarmStatus = document.getElementById('alarm-status');
function renderAlarms() {
  alarmList.innerHTML = alarms.length
    ? alarms.map((a, i) => `<li>${a} <button onclick="deleteAlarm(${i})" style="color:red;background:none;border:none;cursor:pointer;">✖</button></li>`).join('')
    : '<li>No alarms set.</li>';
}
window.deleteAlarm = function(i) {
  alarms.splice(i, 1);
  saveAlarms();
  renderAlarms();
};
function saveAlarms() {
  localStorage.setItem('alarms', JSON.stringify(alarms));
}
document.getElementById('alarm-set').onclick = () => {
  const val = document.getElementById('alarm-time').value;
  if (!val) return;
  alarms.push(val);
  saveAlarms();
  renderAlarms();
  alarmStatus.textContent = "Alarm set for " + val;
};
function checkAlarms() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const cur = `${h}:${m}`;
  if (alarms.includes(cur)) {
    alarmStatus.textContent = "⏰ Alarm! " + cur;
    // Optionally: play sound or notification
    alarms = alarms.filter(a => a !== cur);
    saveAlarms();
    renderAlarms();
  }
}
setInterval(checkAlarms, 1000);
renderAlarms();

// =====================
// Logout Button
// =====================
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.onclick = function() {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  };
}
