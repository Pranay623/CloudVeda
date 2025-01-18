import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import Card from "./Card";

const Dashboard = () => {
  const [currentCard, setCurrentCard] = useState(0); // Track which card is visible
  const [experts, setExperts] = useState([]); // Store the data from the API
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/experts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setExperts(data); // Assuming the API returns an array of experts
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % experts.length); // Toggle through cards
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FFFDF5] min-h-screen py-8 px-4 md:px-16 mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mt-8">
          {/* Guidelines Section */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-green-900 mb-4">Guidelines</h1>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Welcome to CloudVeda!<br />
              Our platform combines advanced technology and Ayurveda to provide<br />
              you with holistic health insights. Follow these guidelines to get the most<br />
              accurate results:
              Ensure your face is well-lit and free of makeup for clear analysis.<br />
              Remove any accessories like glasses or hats that may obstruct your features.<br />
              Maintain a neutral expression while capturing your image.
              For nail analysis,<br />
              clean nails without polish are recommended.
              Follow the personalized health <br />
              recommendations shared by our experts for optimal results.<br />
              <br />
              Let’s embark on a journey toward better health and wellness!
            </p>
          </div>

          {/* Cards Section */}
          <div className="flex items-center space-x-4 mt-2 mr-14">
            {isLoading ? (
              <p>Loading...</p>
            ) : experts.length > 0 ? (
              <>
                {/* Render the current card */}
                <Card expert={experts[currentCard]} />

                {/* Arrow Button */}
                <button
                  className="bg-green-800 text-white p-4 rounded-full hover:bg-green-700"
                  onClick={handleNextCard}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              </>
            ) : (
              <p>No experts found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
