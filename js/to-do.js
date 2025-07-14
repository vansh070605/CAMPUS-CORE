// =====================
// DOM & State
// =====================
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
let tasks = [];
let currentUserId = null;

// =====================
// Auth State Listener
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    loadTasks(currentUserId);
  } else {
    window.location.href = "login.html";
  }
});

// =====================
// Firestore Functions
// =====================
function loadTasks(userId) {
  db.collection('tasks').doc(userId).get().then(doc => {
    if (doc.exists) {
      tasks = doc.data().tasks || [];
    } else {
      tasks = [];
    }
    renderTasks();
  });
}

function saveTasks() {
  if (currentUserId) {
    db.collection('tasks').doc(currentUserId).set({ tasks });
  }
}

// =====================
// Task Functions
// =====================
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    li.appendChild(checkbox);

    // Task text or edit input
    if (task.editing) {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = task.text;
      editInput.className = 'edit-input';
      editInput.addEventListener('blur', () => finishEdit(idx, editInput.value));
      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') editInput.blur();
      });
      li.appendChild(editInput);
      editInput.focus();
    } else {
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = 'task-text' + (task.completed ? ' completed' : '');
      span.title = 'Double-click to edit';
      span.ondblclick = () => startEdit(idx);
      li.appendChild(span);
    }

    // Meta info (due date and priority)
    const meta = document.createElement('span');
    meta.className = 'meta';
    if (task.dueDate) {
      const due = document.createElement('span');
      due.className = 'due-date';
      due.textContent = `📅 ${task.dueDate}`;
      meta.appendChild(due);
    }
    const prio = document.createElement('span');
    prio.className = `priority ${task.priority}`;
    prio.textContent = task.priority;
    meta.appendChild(prio);
    li.appendChild(meta);

    // Delete button
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '❌';
    del.onclick = () => deleteTask(idx);
    li.appendChild(del);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({
    text,
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    completed: false,
    editing: false,
  });
  taskInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = 'Medium';
  saveTasks();
  renderTasks();
}

function deleteTask(idx) {
  tasks.splice(idx, 1);
  saveTasks();
  renderTasks();
}

function startEdit(idx) {
  tasks[idx].editing = true;
  renderTasks();
}

function finishEdit(idx, newText) {
  tasks[idx].text = newText.trim() || tasks[idx].text;
  tasks[idx].editing = false;
  saveTasks();
  renderTasks();
}

// =====================
// Event Listeners
// =====================
form.addEventListener('submit', addTask);

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.onclick = function() {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  };
}

// Navbar active link (optional)
const links = document.querySelectorAll('.navbar a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.navbar ul');

hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  // For accessibility
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Optional: Close menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
