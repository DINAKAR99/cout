import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import BarLoader from "react-spinners/BarLoader";
import Protected from "./pages/private/Protected";
import Dualogin from "./pages/private/Dualogin";
import SessionExpired from "./pages/public/SessionExpired";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import ProtectedRoute from "./pages/private/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    // Set a timer and store the reference in a variable
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  // Use useEffect to manage loading state during navigation
  useEffect(() => {
    setLoading2(true);

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 800); // Adjust the delay to match the user experience

    // Cleanup to prevent memory leaks
    return () => clearTimeout(timer);
  }, [location]); // Run the effect on route change
  return (
    <>
      {loading ? (
        <div className="App">
          <BarLoader loading={loading} size={80} />
        </div>
      ) : (
        <>
          {loading2 ? (
            <LinearProgress
              sx={{
                "& .MuiLinearProgress-bar": {
                  // Progress bar color
                  animationDuration: "3s", // Control speed by adjusting duration
                },
              }}
            />
          ) : (
            ""
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/b/a" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/protected"
              element={<ProtectedRoute element={<Protected />} />}
            />
            <Route
              path="/dualogin"
              element={<ProtectedRoute element={<Dualogin />} />}
            />
            <Route path="/sessionExpired" element={<SessionExpired />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
