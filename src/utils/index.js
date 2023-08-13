const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const getValueFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const setValueToLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

const removeValueFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export {
  showFormattedDate,
  getValueFromLocalStorage,
  setValueToLocalStorage,
  removeValueFromLocalStorage,
};
