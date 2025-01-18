// src/components/ThankYou.js

import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          We have sent your detailed health analysis report to your email.
          Please check your inbox for further details.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
