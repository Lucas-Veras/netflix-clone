import { useContext } from "react";
import "./App.css";
import { AuthContext, AuthContextProvider } from "./context/authContext/authContext";
import { ListContextProvider } from "./context/listContext/listContext";
import { MovieContextProvider } from "./context/movieContext/movieContext";

import Routes from "./routes/Routes";

function App() {
  const { user } = useContext(AuthContext)

  return (
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <Routes user={user} />
        </ListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  )
}

export default App;
