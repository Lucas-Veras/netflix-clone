import RoutesApp from "./routes/Routes";
import "./App.css";
import { AuthContextProvider } from "./context/authContext/authContext";

function App() {
  return (
    <AuthContextProvider>
      <RoutesApp />
    </AuthContextProvider>
  );
}

export default App;
