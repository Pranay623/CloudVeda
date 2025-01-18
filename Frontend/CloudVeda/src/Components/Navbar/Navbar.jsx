import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/cldveda 4.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace this with real authentication logic
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken); // Set isLoggedIn to true if authToken exists
  }, []);

  const handleNavigation = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-[#FFFDF5]">
      <div className="flex items-center space-x-3 ">
        <img src={Logo} alt="Cloudveda Logo" className="min-w-26 min-h-20" />
      </div>
      <nav className="space-x-20 hidden md:flex ">
        <a href="#" className="text-[#2D493B] hover:text-[#1F382A] " onClick={()=> navigate('/')}>Home</a>
        <a href="#" className="text-[#2D493B] hover:text-[#1F382A]">About</a>
        <a href="#" className="text-[#2D493B] hover:text-[#1F382A]">Experts</a>
      </nav>
      <div
        onClick={handleNavigation}
        className="py-2 px-4 bg-[#2D493B] text-white rounded-lg hover:bg-[#1F382A] cursor-pointer"
      >
        {isLoggedIn ? "Profile" : "Login/Register"}
      </div>
    </header>
  );
};

export default Navbar;
