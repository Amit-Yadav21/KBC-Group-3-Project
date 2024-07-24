import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from "./Pages/NavBar";
import GameStart from "./Pages/GameStart";
import About from "./Pages/About";
import AddQuestionForm from "./Pages/AddQuestionForm";
import FetchAllQuestions from "./Pages/FetchAllQuestions";
import FindSignupData from "./Pages/FindSignupData";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [firstVisit, setFirstVisit] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (visitedBefore) {
      setFirstVisit(false);
    } else {
      localStorage.setItem("visitedBefore", "true");
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserRole(userData.role);
    }
  }, []);

  return (
    <Router>
      <NavBar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        {firstVisit ? (
          <>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login setUserRole={setUserRole} />} />
            <Route path="/" element={<Navigate to="/Login" />} />
          </>
        ) : (
          <>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login setUserRole={setUserRole} />} />

            {userRole === "user" ? (
              <>
                <Route path="/GameStart" element={<PrivateRoute element={<GameStart />} />} />
                {/* <Route path="/About" element={<PrivateRoute element={<About />} />} /> */}
                <Route path="/UserDashboard" element={<PrivateRoute element={<UserDashboard />} />} />
                {/* <Route path="/" element={<Navigate to="/UserDashboard" />} /> */}
              </>
            ) : userRole === "admin" ? (
              <>
                <Route path="/GameStart" element={<PrivateRoute element={<GameStart />} />} />
                <Route path="/AddQuestion" element={<PrivateRoute element={<AddQuestionForm />} />} />
                <Route path="/FetchAllQuestions" element={<PrivateRoute element={<FetchAllQuestions />} />} />
                <Route path="/FindSignupData" element={<PrivateRoute element={<FindSignupData />} />} />
                {/* <Route path="/About" element={<PrivateRoute element={<About />} />} /> */}
                <Route path="/AdminDashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
                {/* <Route path="/" element={<Navigate to="/AdminDashboard" />} /> */}
              </>
            ) : (
              <Route path="/" element={<Navigate to="/Login" />} />
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
