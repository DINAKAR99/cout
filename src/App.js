import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import BarLoader from "react-spinners/BarLoader";
import Protected from "./pages/public/Protected";
import Dualogin from "./pages/public/Dualogin";
import SessionExpired from "./pages/public/SessionExpired";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import ProtectedRoute from "./authorization/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Set a timer and store the reference in a variable
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="App">
          <BarLoader loading={loading} size={80} />
        </div>
      ) : (
        <>
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
