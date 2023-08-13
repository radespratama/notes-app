import { useContext, useEffect } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import {
  Home,
  DetailNote,
  NotFound,
  Archive,
  AddNote,
  Login,
  Register,
} from "./pages";
import { getValueFromLocalStorage, setValueToLocalStorage } from "./utils";

import "@fontsource/sen/400.css";
import "@fontsource/sen/700.css";
import "@fontsource/sen/800.css";

import { AppContext } from "./context/AppContext";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";
import PublicRoute from "./middlewares/PublicRoute";

export default function App() {
  const { currentUser } = useContext(AppContext);

  const languageLS = getValueFromLocalStorage("@language");
  const colorThemeLS = getValueFromLocalStorage("@theme");

  useEffect(() => {
    if (!languageLS && !colorThemeLS) {
      setValueToLocalStorage("@language", "en");
      setValueToLocalStorage("@theme", "light");
    }
  }, [languageLS, colorThemeLS]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/archive"
            element={
              <AuthenticatedRoute>
                <Archive />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/note/new"
            element={
              <AuthenticatedRoute>
                <AddNote />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <AuthenticatedRoute>
                <DetailNote />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute isAllowed={currentUser === null}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute isAllowed={currentUser === null}>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
