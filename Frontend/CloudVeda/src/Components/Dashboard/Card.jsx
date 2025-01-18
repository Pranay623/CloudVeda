import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ expert }) => {
  const navigate = useNavigate();

  const handleAskClick = () => {
    // Store the expert ID in local storage
    localStorage.setItem("activeExpertId", expert._id);

    // Navigate to the /chat route
    navigate("/chat");
  };


  return (
    <div className="bg-cream p-6 rounded-lg shadow-md w-72 h-96">
      {/* Placeholder for the profile image */}
      <div className="h-40 bg-gray-200 rounded-md mb-4"></div>

      {/* Dynamic data from the API */}
      <h3 className="text-xl font-semibold">{expert.userName}</h3>
      <p className="text-base text-gray-600">{expert.roles}</p>

      {/* Ask button */}
      <button
        className="bg-green-800 text-white px-5 py-2 mt-9 ml-20 rounded-md"
        onClick={handleAskClick}
      >
        Ask
      </button>
    </div>
  );
};

export default Card;
