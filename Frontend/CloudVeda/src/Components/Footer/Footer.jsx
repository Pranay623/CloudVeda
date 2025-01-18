import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
const Navigate=useNavigate();

  return (
    <footer className="bg-[#2D493B] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cloudveda</h3>
          <p className="text-gray-400">
            Providing Health Analysis and Evaluation System to our clients and ensuring satisfaction through innovation.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
  <li>
    <a
      href={'/about'}
      className="text-gray-400 hover:text-white cursor-pointer"
    >
      About Us
    </a>
  </li>
  <li>
    <a
      href={'/about'}
      className="text-gray-400 hover:text-white cursor-pointer"
    >
      Services
    </a>
  </li>
  <li>
    <a
      href={'/about'}
      className="text-gray-400 hover:text-white cursor-pointer"
    >
      Contact
    </a>
  </li>
</ul>

        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        &copy; 2025 Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
