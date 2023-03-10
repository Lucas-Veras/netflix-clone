import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Watch from "../pages/Watch";

const RoutesApp = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/movies"
          element={user ? <Home type="movie" /> : <Navigate to="/register" />}
        />
        <Route
          path="/series"
          element={user ? <Home type="series" /> : <Navigate to="/register" />}
        />
        <Route
          path="/watch/:id"
          element={user ? <Watch /> : <Navigate to="/register" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
