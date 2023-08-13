import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { getValueFromLocalStorage, setValueToLocalStorage } from "../utils";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => getValueFromLocalStorage("@language") || "en"
  );
  const [colorTheme, setColorTheme] = useState(
    () => getValueFromLocalStorage("@theme") || "light"
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(
    () => getValueFromLocalStorage("@token") || ""
  );

  function changeLanguage(lang) {
    if (lang) {
      setLanguage(lang);
      setValueToLocalStorage("@language", lang);
    }
  }

  function changeColorTheme(theme) {
    if (theme) {
      setColorTheme(theme);
      setValueToLocalStorage("@theme", theme);
    }
  }

  function saveUserToken(token) {
    if (token) {
      setToken(token);
      setValueToLocalStorage("@token", token);
    }
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,

        colorTheme,
        setColorTheme,

        token,
        setToken,

        currentUser,
        setCurrentUser,

        changeLanguage,
        changeColorTheme,
        saveUserToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
