const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

let notes = [];

// Render notes
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

// Add note
noteForm.onsubmit = (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;
  notes.unshift({ text, editing: false });
  noteInput.value = '';
  renderNotes();
};

// Edit note
function startEdit(idx) {
  notes[idx].editing = true;
  renderNotes();
}
function saveEdit(idx, newText) {
  notes[idx].text = newText.trim() || notes[idx].text;
  notes[idx].editing = false;
  renderNotes();
}

// Delete note
function deleteNote(idx) {
  notes.splice(idx, 1);
  renderNotes();
}

renderNotes();
