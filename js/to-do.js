const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');

let tasks = [];

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
  renderTasks();
}

function deleteTask(idx) {
  tasks.splice(idx, 1);
  renderTasks();
}

function startEdit(idx) {
  tasks[idx].editing = true;
  renderTasks();
}

function finishEdit(idx, newText) {
  tasks[idx].text = newText.trim() || tasks[idx].text;
  tasks[idx].editing = false;
  renderTasks();
}

form.addEventListener('submit', addTask);
renderTasks();

// Place this script at the end of your HTML file
const links = document.querySelectorAll('.navbar a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
