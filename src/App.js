import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute";

import "./App.css";
import HomeRoute from "./pages/HomeRoute";

const App = () => {
  // Check auth status
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getAuth = localStorage.getItem("auth");
    if (getAuth) {
      setAuthTrue();
    }
  }, []);

  const setAuthTrue = () => {
    setIsAuth(true);
  };

  const setAuthFalse = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={
            !isAuth ? (
              <AuthRoute setAuthTrue={setAuthTrue} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuth ? (
              <HomeRoute setAuthFalse={setAuthFalse} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
