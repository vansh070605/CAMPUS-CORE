// =====================
// DOM Elements & State
// =====================
const dashboard = document.getElementById('dashboard');
let currentUserId = null;

// =====================
// Authentication Check & Load Dashboard Data
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    loadDashboardData(currentUserId);
  } else {
    window.location.href = "login.html";
  }
});

// =====================
// Fetch Data for All Widgets
// =====================
function loadDashboardData(userId) {
  Promise.all([
    db.collection('tasks').doc(userId).get(),
    db.collection('calendar').doc(userId).get(),
    db.collection('notes').doc(userId).get()
  ]).then(([tasksDoc, calendarDoc, notesDoc]) => {
    const tasks = tasksDoc.exists ? (tasksDoc.data().tasks || []) : [];
    const events = calendarDoc.exists ? (calendarDoc.data().events || []) : [];
    const notes = notesDoc.exists ? (notesDoc.data().notes || []) : [];
    renderDashboardWidgets(tasks, events, notes);
  });
}

// =====================
// Render Dashboard Widgets
// =====================
function renderDashboardWidgets(tasks, events, notes) {
  dashboard.innerHTML = '';

  // To-Do Widget (Tabular)
  const todoWidget = document.createElement('div');
  todoWidget.className = 'widget';
  todoWidget.innerHTML = `
    <div class="widget-header">To-Do List</div>
    <table class="widget-table">
      <thead>
        <tr><th>Task</th><th>Due</th><th>Priority</th></tr>
      </thead>
      <tbody>
        ${tasks.length === 0 ? '<tr><td colspan="3">No tasks</td></tr>' :
          tasks.slice(0, 5).map(task =>
            `<tr>
              <td class="${task.completed ? 'completed' : ''}">${task.text}</td>
              <td>${task.dueDate || '-'}</td>
              <td>${task.priority || '-'}</td>
            </tr>`
          ).join('')}
      </tbody>
    </table>
    <a href="../pages/to-do.html" class="dashboard-btn">View All To-Do's</a>
  `;
  dashboard.appendChild(todoWidget);

  // Calendar Widget (Tabular)
  const calendarWidget = document.createElement('div');
  calendarWidget.className = 'widget';
  const today = new Date();
  const upcomingEvents = events
    .filter(e => e.date && new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  calendarWidget.innerHTML = `
    <div class="widget-header">Upcoming Events</div>
    <table class="widget-table">
      <thead>
        <tr><th>Date</th><th>Time</th><th>Event</th></tr>
      </thead>
      <tbody>
        ${upcomingEvents.length === 0 ? '<tr><td colspan="3">No upcoming events</td></tr>' :
          upcomingEvents.map(e =>
            `<tr>
              <td>${e.date}</td>
              <td>${e.time || '-'}</td>
              <td>${e.title}</td>
            </tr>`
          ).join('')}
      </tbody>
    </table>
    <a href="../pages/cal.html" class="dashboard-btn">View Calendar</a>
  `;
  dashboard.appendChild(calendarWidget);

  // Notes Widget (Tabular)
  const notesWidget = document.createElement('div');
  notesWidget.className = 'widget';
  notesWidget.innerHTML = `
    <div class="widget-header">Recent Notes</div>
    <table class="widget-table">
      <thead>
        <tr><th>Note</th></tr>
      </thead>
      <tbody>
        ${notes.length === 0 ? '<tr><td>No notes</td></tr>' :
          notes.slice(0, 3).map(note =>
            `<tr><td>${note.text.length > 60 ? note.text.slice(0, 60) + '...' : note.text}</td></tr>`
          ).join('')}
      </tbody>
    </table>
    <a href="../pages/notes.html" class="dashboard-btn">View All Notes</a>
  `;
  dashboard.appendChild(notesWidget);
}

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

// =====================
// Navbar Active Link (Optional)
// =====================
const links = document.querySelectorAll('.navbar a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
