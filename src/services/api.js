const BASE_URL =
  import.meta.env.VITE_API_URL || "https://notes-api.dicoding.dev/v1";

export const normalRegister = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const normalLogin = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

// Note

export const createNote = async (token, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getNotes = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getArchivedNotes = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/archived`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getNoteById = async (token, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const unArchiveNote = async (token, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const archiveNote = async (token, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteNote = async (token, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};
