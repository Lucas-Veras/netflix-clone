import { useContext } from "react";
import "./App.css";
import { AuthContext, AuthContextProvider } from "./context/authContext/authContext";
import { ListContextProvider } from "./context/listContext/listContext";
import { MovieContextProvider } from "./context/movieContext/movieContext";
import { UserContextProvider } from "./context/userContext/userContext";

import Routes from "./routes/Routes";

function App() {
  const { user } = useContext(AuthContext)

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <Routes user={user} />
          </ListContextProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App;
