import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing1/Landing.jsx";
import SignInUpForm from "./Components/Signin/SignInUpForm.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Camera from "./Components/Camera/Everything.jsx";

import Everything from "./Components/Camera/Everything.jsx";
import MainUploadPage from "./Components/Camera/MainUploadPage.jsx";
import Chatbot from "./Components/Chatbot/ChatBot.jsx";
import About from "./Components/About/About.jsx"


function App() {
  const [count, setCount] = useState(0);


  return (
    <Router>
      <Routes>
        <Route path="/" id="main" element={<Landing />} />
        <Route path="/login" element={<SignInUpForm />} />
        {/* <Route path="/" element={<Camera />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadphotos" element={<MainUploadPage/>} />
        <Route path="/camera/" element={<Camera />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/chat" element={<Chatbot/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
