import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing1 from './Components/Landing1/Landing.jsx'
import Landing from './Components/Landing1/Landing.jsx';
import SignInUpForm from './Components/Landing1/sign/sign.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>

    <Route path="/Login" element={<SignInUpForm/>}></Route>
    <Route path="/" element={<Landing/>}></Route>
    </Routes>
    
    
      
    </Router>
  )
}

export default App
