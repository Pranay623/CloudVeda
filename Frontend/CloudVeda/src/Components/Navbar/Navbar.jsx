import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/cldveda 4.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, []);

  const handleNavigation = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    setIsLoggedIn(false);
    window.location.reload(); // Reload the page to reflect the logout
  };

  return (
    <header className="flex bg-[#FFFDF5] justify-between items-center py-4 px-6">
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="Cloudveda Logo" className="min-w-26 min-h-20" />
      </div>
      <nav className="space-x-20 hidden md:flex">
        <a
          href="#"
          className="text-[#2D493B] border-transparent border-2 rounded-md hover:border-[#2D493B] transition-all duration-300"
          onClick={() => navigate('/')}
        >
          Home
        </a>
        <a
          href="#"
          className="text-[#2D493B] border-transparent border-2 rounded-md hover:border-[#2D493B] transition-all duration-300"
          onClick={() => navigate('/about')}
        >
          About
        </a>
        <a
          href="#"
          className="text-[#2D493B] border-transparent border-2 rounded-md hover:border-[#2D493B] transition-all duration-300"
          onClick={() => navigate('/dashboard')}
        >
          Experts
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div
              onClick={handleNavigation}
              className="py-2 px-4 bg-[#2D493B] text-white rounded-lg hover:bg-[#1F382A] cursor-pointer"
            >
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="py-2 px-4 bg-[#FF4D4D] text-white rounded-lg hover:bg-[#CC0000] cursor-pointer"
            >
              Logout
            </div>
          </>
        ) : (
          <div
            onClick={handleNavigation}
            className="py-2 px-4 bg-[#2D493B] text-white rounded-lg hover:bg-[#1F382A] cursor-pointer"
          >
            Login/Register
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
