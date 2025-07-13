// =====================
// Firebase Initialization (if not already present in HTML)
// =====================
// Make sure this matches your HTML config and is loaded before this script!
const firebaseConfig = {
  apiKey: "AIzaSyDqpT2QDgI3HH7cC1su3OM02qvPapprM1E",
  authDomain: "campus-core.firebaseapp.com",
  projectId: "campus-core",
  storageBucket: "campus-core.firebasestorage.app",
  messagingSenderId: "173053955985",
  appId: "1:173053955985:web:ba34f5f9004ccf2dc7d430",
  measurementId: "G-2JGX1VJELL"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// =====================
// DOM Elements & State
// =====================
const dashboard = document.getElementById('dashboard');
const widgetControls = document.querySelectorAll('.widget-controls input[type=checkbox]');

// Available widgets
const widgets = {
  todo: {
    header: 'To-Do List',
    content: '<ul><li>Sample Task 1</li><li>Sample Task 2</li></ul>'
  },
  calendar: {
    header: 'Calendar',
    content: '<div>Upcoming Event: Math Exam (Mon)</div>'
  },
  notes: {
    header: 'Notes',
    content: '<div>Don\'t forget to review Chapter 5!</div>'
  },
  files: {
    header: 'Files',
    content: '<div><a href="#">Assignment1.pdf</a></div>'
  }
};

let widgetOrder = ['todo', 'calendar', 'notes', 'files'];
let widgetVisibility = { todo: true, calendar: true, notes: true, files: true };
let currentUserId = null;

// =====================
// Authentication Check & Load Dashboard Preferences
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    loadDashboardPrefs(currentUserId);
  } else {
    window.location.href = "login.html";
  }
});

// =====================
// Firestore Functions
// =====================
function loadDashboardPrefs(userId) {
  db.collection('dashboard').doc(userId).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      widgetOrder = data.widgetOrder || widgetOrder;
      widgetVisibility = data.widgetVisibility || widgetVisibility;
    }
    renderDashboard();
    updateWidgetControls();
  });
}

function saveDashboardPrefs() {
  if (currentUserId) {
    db.collection('dashboard').doc(currentUserId).set({
      widgetOrder,
      widgetVisibility
    });
  }
}

// =====================
// Rendering & Controls
// =====================
function renderDashboard() {
  dashboard.innerHTML = '';
  widgetOrder.forEach(widgetKey => {
    if (!widgetVisibility[widgetKey]) return;
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.draggable = true;
    widget.dataset.widget = widgetKey;
    widget.innerHTML = `<div class="widget-header">${widgets[widgetKey].header}</div>${widgets[widgetKey].content}`;
    dashboard.appendChild(widget);
  });
  addDragAndDrop();
}

function updateWidgetControls() {
  widgetControls.forEach(control => {
    control.checked = widgetVisibility[control.dataset.widget];
  });
}

// Drag-and-drop functionality
function addDragAndDrop() {
  const widgetElems = dashboard.querySelectorAll('.widget');
  let dragged = null;

  widgetElems.forEach(w => {
    w.addEventListener('dragstart', function() {
      dragged = this;
      this.classList.add('dragging');
    });
    w.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      dragged = null;
      saveDashboardPrefs();
    });
    w.addEventListener('dragover', function(e) {
      e.preventDefault();
      if (dragged && dragged !== this) {
        const widgetsArr = Array.from(dashboard.children);
        const from = widgetsArr.indexOf(dragged);
        const to = widgetsArr.indexOf(this);
        if (from !== to) {
          widgetOrder.splice(to, 0, widgetOrder.splice(from, 1)[0]);
          renderDashboard();
          saveDashboardPrefs();
        }
      }
    });
  });
}

// Widget visibility controls
widgetControls.forEach(control => {
  control.onchange = function() {
    widgetVisibility[this.dataset.widget] = this.checked;
    saveDashboardPrefs();
    renderDashboard();
  };
});

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
