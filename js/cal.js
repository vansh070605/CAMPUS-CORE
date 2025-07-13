// =====================
// DOM Elements & State
// =====================
const calendar = document.getElementById('calendar');
const addEventBtn = document.getElementById('add-event-btn');
const eventModal = document.getElementById('event-modal');
const closeModal = document.getElementById('close-modal');
const eventForm = document.getElementById('event-form');
const deleteBtn = document.getElementById('delete-btn');
const saveBtn = document.getElementById('save-btn');

const eventIdInput = document.getElementById('event-id');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const eventTimeInput = document.getElementById('event-time');
const eventCategoryInput = document.getElementById('event-category');

let events = [];
let editingEventIndex = null;
let currentUserId = null;

// =====================
// Authentication Check & Load Events
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    loadEvents(currentUserId);
  } else {
    window.location.href = "login.html";
  }
});

// =====================
// Firestore Functions
// =====================
function loadEvents(userId) {
  db.collection('calendar').doc(userId).get().then(doc => {
    if (doc.exists) {
      events = doc.data().events || [];
    } else {
      events = [];
    }
    renderCalendar();
  });
}

function saveEvents() {
  if (currentUserId) {
    db.collection('calendar').doc(currentUserId).set({ events });
  }
}

// =====================
// Calendar Rendering
// =====================
function renderCalendar() {
  calendar.innerHTML = '';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Days of week
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const div = document.createElement('div');
    div.textContent = d;
    div.style.fontWeight = 'bold';
    calendar.appendChild(div);
  });

  // Empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = day;

    // Add events for this day
    events
      .filter(e => e.date === dateStr)
      .forEach((e, idx) => {
        const ev = document.createElement('span');
        ev.className = `event ${e.category}`;
        ev.textContent = e.title;
        ev.title = (e.time ? e.time + ' ' : '') + e.title;
        ev.style.cursor = 'pointer';
        ev.onclick = () => openEditEventModal(e.id);
        dayDiv.appendChild(ev);
      });

    calendar.appendChild(dayDiv);
  }
}

// =====================
// Modal Functions
// =====================
function openAddEventModal() {
  eventIdInput.value = '';
  eventTitleInput.value = '';
  eventDateInput.value = '';
  eventTimeInput.value = '';
  eventCategoryInput.value = 'Class';
  deleteBtn.style.display = 'none';
  eventModal.classList.add('active');
  editingEventIndex = null;
}

function openEditEventModal(id) {
  const idx = events.findIndex(e => e.id === id);
  if (idx === -1) return;
  const e = events[idx];
  eventIdInput.value = e.id;
  eventTitleInput.value = e.title;
  eventDateInput.value = e.date;
  eventTimeInput.value = e.time;
  eventCategoryInput.value = e.category;
  deleteBtn.style.display = '';
  eventModal.classList.add('active');
  editingEventIndex = idx;
}

// =====================
// Event Handlers
// =====================
addEventBtn.onclick = openAddEventModal;

closeModal.onclick = () => {
  eventModal.classList.remove('active');
  editingEventIndex = null;
};

eventForm.onsubmit = (e) => {
  e.preventDefault();
  const id = eventIdInput.value || Date.now().toString();
  const title = eventTitleInput.value;
  const date = eventDateInput.value;
  const time = eventTimeInput.value;
  const category = eventCategoryInput.value;

  if (editingEventIndex !== null) {
    // Update existing event
    events[editingEventIndex] = { id, title, date, time, category };
    editingEventIndex = null;
  } else {
    // Add new event
    events.push({ id, title, date, time, category });
  }
  saveEvents();
  eventModal.classList.remove('active');
  eventForm.reset();
  renderCalendar();
};

deleteBtn.onclick = function() {
  if (editingEventIndex !== null) {
    events.splice(editingEventIndex, 1);
    editingEventIndex = null;
    saveEvents();
    eventModal.classList.remove('active');
    eventForm.reset();
    renderCalendar();
  }
};

// =====================
// Navbar Active Link (Optional)
// =====================
const links = document.querySelectorAll('.navbar a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// =====================
// Logout Button (if present)
// =====================
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.onclick = function() {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    });
  };
}
