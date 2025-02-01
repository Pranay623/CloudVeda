import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Chatbot = () => {
  const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      text: "Do you usually sleep deeply through the night, or is your sleep a bit lighter and more interrupted?",
      key: "sleep_patterns",
      type: "options",
      options: ["Less than 5 hours", "5-6 hours", "7-8 hours", "8+ hours"],
    },
    {
      id: 2,
      text: "How would you describe your activity level during the day?",
      key: "activity_level",
      type: "options",
      options: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active",
        "Super active",
      ],
    },
    {
      id: 3,
      text: "How’s your mood generally?",
      key: "mood",
      type: "options",
      options: ["Happy", "Neutral", "Stressed", "Sad", "Anxious", "Calm"],
    },
    {
      id: 4,
      text: "What is your weight (in kg)?",
      key: "weight",
      type: "text",
    },
    {
      id: 5,
      text: "What is your height (in cm)?",
      key: "height",
      type: "text",
    },
    {
      id: 6,
      text: "How old are you?",
      key: "age",
      type: "text",
    },
    {
      id: 7,
      text: "Have you had any previous illnesses or health conditions?",
      key: "health_conditions",
      type: "options",
      options: [
        "None",
        "Hypertension",
        "Diabetes",
        "Asthma",
        "Heart disease",
        "Arthritis",
        "Anxiety/Depression",
      ],
    },
    {
      id: 8,
      text: "What is your general dietary habit?",
      key: "dietary_habits",
      type: "options",
      options: [
        "Vegetarian",
        "Vegan",
        "Non-vegetarian",
        "Keto",
        "Balanced diet",
        "High-carb, low-protein",
      ],
    },
    {
      id: 9,
      text: "Are you currently on any medications or supplements?",
      key: "medications",
      type: "options",
      options: [
        "None",
        "Prescribed for chronic conditions",
        "Over-the-counter supplements",
        "Birth control",
        "Pain relief",
      ],
    },
    {
      id: 10,
      text: "How would you rate your stress levels?",
      key: "stress_levels",
      type: "options",
      options: ["Very low", "Low", "Moderate", "High", "Very high"],
    },
    {
      id: 11,
      text: "How would you rate your hydration levels?",
      key: "hydration_levels",
      type: "options",
      options: ["Very low", "Low", "Adequate", "High"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResponse = (key, value) => {
    setResponses({ ...responses, [key]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const submitData = () => {

    if (typeof window !== "undefined") {
      const user_id = localStorage.getItem("userid");
      const expert_id = localStorage.getItem("activeExpertId");

      const formData = {
        user_id,
        expert_id,
        ...responses,
        status: "Pending",
      };

      fetch("http://localhost:3000/api/userdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Thank you for sharing your details!");
          navigate("/uploadphotos");
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffdf5] to-[#faf1d0] p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 space-y-4">
        <div className="text-lg font-bold text-gray-800">
          {questions[currentQuestion].text}
        </div>
        <div className="space-y-2">
          {questions[currentQuestion].type === "options" &&
            questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className="w-full bg-[#1f382a] hover:bg-[#315842] text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() =>
                  handleResponse(questions[currentQuestion].key, option)
                }
              >
                {option}
              </button>
            ))}
          {questions[currentQuestion].type === "text" && (
            <input
              type="text"
              placeholder="Type your answer here..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1f382a]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResponse(
                    questions[currentQuestion].key,
                    e.target.value
                  );
                }
              }}
            />
          )}
        </div>

        {isSubmitted && (
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            onClick={submitData} 
            onClick={submitData} 
          >
            Submit Data
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
