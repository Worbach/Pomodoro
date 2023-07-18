let timer;
let isTimerRunning = false;
let isBreak = false;
let isLongerBreak = false;
let minutes = 25;
let seconds = 0;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longerBreakBtn = document.getElementById('longerBreakBtn');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function updateTimerDisplay() {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTime, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    stopTimer();
    minutes = 25;
    seconds = 0;
    isBreak = false;
    isLongerBreak = false;
    updateTimerDisplay();
}

function startBreak(duration) {
    stopTimer();
    minutes = duration;
    seconds = 0;
    isBreak = true;
    updateTimerDisplay();
}

function updateTime() {
    if (minutes === 0 && seconds === 0) {
        if (isBreak && isLongerBreak) {
            resetTimer();
        } else if (isBreak) {
            startTimer();
            isBreak = false;
            isLongerBreak = false;
        } else {
            startBreak(isLongerBreak ? 5 : 15);
            isLongerBreak = !isLongerBreak;
        }
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateTimerDisplay();
}

function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button class="delete-btn">Delete</button>`;
    taskList.appendChild(li);
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task !== '') {
        addTaskToList(task);
        taskInput.value = '';
    }
});

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.parentElement;
        taskList.removeChild(li);
    }
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click', () => startBreak(5));
longerBreakBtn.addEventListener('click', () => startBreak(15));
