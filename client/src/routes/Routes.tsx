import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext/authContext";
import RequireAuth from "../context/authContext/requireAuth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watch from "../pages/Watch";

const RoutesApp = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home type={undefined} />
            </RequireAuth>
          }
        />
        <Route
          path="/movies"
          element={
            <RequireAuth>
              <Home type="movie" />
            </RequireAuth>
          }
        />
        <Route
          path="/series"
          element={
            <RequireAuth>
              <Home type="series" />
            </RequireAuth>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <RequireAuth>
              <Watch />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
