import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactsPage from "./components/ContactsPage";
import styles from "./App.module.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={styles.appContainer}>
      {" "}
      <div className={styles.mainContainer}>
        {" "}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/contacts"
              element={isAuthenticated ? <ContactsPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
