const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const saveNoteBtn = document.getElementById('saveNote');
const cancelNoteBtn = document.getElementById('cancelNote');
const noteTitleInput = document.getElementById('noteTitle');
const noteDescInput = document.getElementById('noteDesc');
const notesContainer = document.getElementById('notesContainer');
const themeSelect = document.getElementById('themeSelect');

let notes = [];

function openModal() {
  noteTitleInput.value = '';
  noteDescInput.value = '';
  noteModal.classList.remove('hidden');
  noteTitleInput.focus();
}

function closeModal() {
  noteModal.classList.add('hidden');
}

function formatDate(date) {
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function closeAllMenus() {
  document.querySelectorAll('.menu').forEach(menu => {
    menu.style.display = 'none';
  });
}

function createNoteElement(note, index) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');

  const titleEl = document.createElement('div');
  titleEl.className = 'note-title';
  titleEl.textContent = note.title;

  const descEl = document.createElement('div');
  descEl.className = 'note-desc';
  descEl.textContent = note.description;

  const dateEl = document.createElement('div');
  dateEl.className = 'note-date';
  dateEl.textContent = formatDate(note.date);

  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-btn';
  menuBtn.textContent = '⋮';
  menuBtn.setAttribute('aria-label', 'Меню нотатки');

  const menu = document.createElement('div');
  menu.className = 'menu';

  const archiveBtn = document.createElement('button');
  archiveBtn.textContent = 'Архівувати';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Змінити';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Видалити';

  menu.appendChild(archiveBtn);
  menu.appendChild(editBtn);
  menu.appendChild(deleteBtn);

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllMenus();
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    menu.style.flexDirection = 'column';
  });

  document.body.addEventListener('click', () => {
    closeAllMenus();
  });

  archiveBtn.addEventListener('click', () => {
    alert(`Нотатку "${note.title}" заархівовано (поки без дії).`);
    closeAllMenus();
  });

  editBtn.addEventListener('click', () => {
    noteTitleInput.value = note.title;
    noteDescInput.value = note.description;
    openModal();
    closeAllMenus();

    saveNoteBtn.onclick = () => {
      if (!noteTitleInput.value.trim()) {
        alert('Введіть назву нотатки!');
        return;
      }
      note.title = noteTitleInput.value.trim();
      note.description = noteDescInput.value.trim();
      renderNotes();
      closeModal();
      saveNoteBtn.onclick = null;
    };
  });

  deleteBtn.addEventListener('click', () => {
    if (confirm(`Ви дійсно хочете видалити нотатку "${note.title}"?`)) {
      notes.splice(index, 1);
      renderNotes();
    }
    closeAllMenus();
  });

  noteEl.appendChild(titleEl);
  noteEl.appendChild(descEl);
  noteEl.appendChild(dateEl);
  noteEl.appendChild(menuBtn);
  noteEl.appendChild(menu);

  return noteEl;
}

function renderNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, i) => {
    const noteEl = createNoteElement(note, i);
    notesContainer.appendChild(noteEl);
  });
}

addNoteBtn.addEventListener('click', () => {
  openModal();
  saveNoteBtn.onclick = () => {
    if (!noteTitleInput.value.trim()) {
      alert('Введіть назву нотатки!');
      return;
    }
    notes.push({
      title: noteTitleInput.value.trim(),
      description: noteDescInput.value.trim(),
      date: new Date(),
    });
    renderNotes();
    closeModal();
    saveNoteBtn.onclick = null;
  };
});

cancelNoteBtn.addEventListener('click', () => {
  closeModal();
  saveNoteBtn.onclick = null;
});

// Тема
themeSelect.addEventListener('change', () => {
  document.body.classList.remove('dark-theme', 'blue-theme', 'green-theme', 'pink-theme');
  if (themeSelect.value !== 'default') {
    document.body.classList.add(themeSelect.value + '-theme');
  }
});

// Ініціалізація
renderNotes();