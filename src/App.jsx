import { useEffect, useState } from "react";
import HelloUser from "./components/HelloUser";
import UserBillTabs from "./components/UserBillsTab";
import AdminBillTabs from "./components/AdminBillTab";
import "./App.css";
import ChatSupport from "./components/ChatSupport";
import NavBar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Pagination from "./components/Pagination";
import Path from "./components/Path";
import { LoginPage } from "./components/LoginPage";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Chat from "./components/Chat";
import NotFound from "./NotFound";

function App() {
  const token = localStorage.getItem("token");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  const { userId, role, name } = useSelector((state) => state.user);
  console.log(userId, role, name);

  return (
    <main className={`${theme === "dark" ? "dark bg-black" : ""}`}>
      <Router>
        <NavBar toggleTheme={toggleTheme} />
        <ChatSupport />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <SignUp />
              </div>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <div className="mt-16 px-8">
                <HelloUser username={"Ibadullah"} />
                <UserBillTabs />
             </div>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <div className="mt-16 px-8">
                <HelloUser username={"Ibadullah"} />
                <AdminBillTabs />
             </div>
            }
          />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </main>
  );
}

export default App;
