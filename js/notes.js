// =====================
// Firebase Initialization (if not already present in HTML)
// =====================
// Only include this block if you haven't already initialized Firebase in your HTML
const firebaseConfig = {
  apiKey: "AIzaSyDqpT2QDgI3HH7cC1su3OM02qvPapprM1E",
  authDomain: "campus-core.firebaseapp.com",
  projectId: "campus-core",
  storageBucket: "campus-core.firebasestorage.app",
  messagingSenderId: "173053955985",
  appId: "1:173053955985:web:ba34f5f9004ccf2dc7d430",
  measurementId: "G-2JGX1VJELL"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// =====================
// DOM Elements & State
// =====================
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

let notes = [];
let currentUserId = null;

// =====================
// Auth Check & Load Notes
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    loadNotes(currentUserId);
  } else {
    window.location.href = "login.html";
  }
});

// =====================
// Firestore Functions
// =====================
function loadNotes(userId) {
  db.collection('notes').doc(userId).get().then(doc => {
    if (doc.exists) {
      notes = doc.data().notes || [];
    } else {
      notes = [];
    }
    renderNotes();
  });
}

function saveNotes() {
  if (currentUserId) {
    db.collection('notes').doc(currentUserId).set({ notes });
  }
}

// =====================
// Render Notes
// =====================
function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, idx) => {
    const card = document.createElement('div');
    card.className = 'note-card';
    if (note.editing) card.classList.add('editing');

    if (note.editing) {
      const textarea = document.createElement('textarea');
      textarea.value = note.text;
      textarea.onblur = () => saveEdit(idx, textarea.value);
      textarea.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          textarea.blur();
        }
      };
      card.appendChild(textarea);
    } else {
      const p = document.createElement('p');
      p.textContent = note.text;
      card.appendChild(p);
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'actions';

    if (!note.editing) {
      const editBtn = document.createElement('button');
      editBtn.title = "Edit";
      editBtn.innerHTML = '✏️';
      editBtn.onclick = () => startEdit(idx);
      actions.appendChild(editBtn);
    }

    const delBtn = document.createElement('button');
    delBtn.title = "Delete";
    delBtn.innerHTML = '🗑️';
    delBtn.onclick = () => deleteNote(idx);
    actions.appendChild(delBtn);

    card.appendChild(actions);
    notesList.appendChild(card);
  });
}

// =====================
// Add Note
// =====================
noteForm.onsubmit = (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;
  notes.unshift({ text, editing: false });
  noteInput.value = '';
  saveNotes();
  renderNotes();
};

// =====================
// Edit Note
// =====================
function startEdit(idx) {
  notes[idx].editing = true;
  renderNotes();
}
function saveEdit(idx, newText) {
  notes[idx].text = newText.trim() || notes[idx].text;
  notes[idx].editing = false;
  saveNotes();
  renderNotes();
}

// =====================
// Delete Note
// =====================
function deleteNote(idx) {
  notes.splice(idx, 1);
  saveNotes();
  renderNotes();
}
