import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing1/Landing.jsx";
import SignInUpForm from "./Components/Signin/SignInUpForm.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Camera from "./Components/Camera/Everything.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignInUpForm />} />
        <Route path="/" element={<Camera />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
