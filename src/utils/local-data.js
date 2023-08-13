let notes = [
  {
    id: "8c48593269c236857499",
    title: "Babel Template",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
];

function getAllNotes() {
  return notes;
}

function getNote(id) {
  const foundedNote = notes.find((note) => note.id === id);
  return foundedNote;
}

function getActiveNotes() {
  const activeNotes = notes.filter((note) => !note.archived);
  return activeNotes;
}

function getArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  return archivedNotes;
}

function addNote({ title, body }) {
  notes = [
    ...notes,
    {
      id: `notes-${+new Date()}`,
      title: title || "(untitled)",
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    },
  ];
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
}

function archiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: true };
    }
    return note;
  });
}

function unarchiveNote(id) {
  notes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, archived: false };
    }

    return note;
  });
}

function editNote({ id, title, body }) {
  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = title;
  noteToEdit.body = body;

  notes = notes.map((note) => {
    if (note.id === id) {
      return note;
    }
    return note;
  });
}

export {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  editNote,
  getNote,
  archiveNote,
  unarchiveNote,
  addNote,
};
