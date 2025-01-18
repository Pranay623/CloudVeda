import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ expert }) => {

  const navigate=useNavigate()
  return (
    <div onClick={navigate('/uploadphotos')} className="bg-cream p-6 rounded-lg shadow-md w-72 h-96">
  
      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
      
     
      <h3 className="text-xl font-semibold">{expert.userName}</h3>
      <p className="text-base text-gray-600">{expert.roles}</p>
      
      
      <button className="bg-green-800 text-white px-5 py-2 mt-9 ml-20 rounded-md">Ask</button>
    </div>
  );
};

export default Card;
