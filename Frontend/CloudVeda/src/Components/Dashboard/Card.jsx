import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/camera');  
  };

  return (
    <div
      onClick={handleCardClick} 
      className="bg-cream p-6 rounded-lg shadow-md w-72 h-96 cursor-pointer" 
    >
      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
      <h3 className="text-xl font-semibold">Sadhguru</h3>
      <p className="text-base text-gray-600">Ayurvedic expert</p>
      <button className="bg-green-800 text-white px-5 py-2 mt-9 ml-20 rounded-md">Ask</button>
    </div>
  );
};

export default Card;
