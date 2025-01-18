import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Chatbot = () => {
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
    {
      id: 12,
      text: "Do you have any additional details you'd like to share?",
      key: "additional_details",
      type: "text",
    },
    // {
    //   id: 13,
    //   text: "Please upload any relevant images (e.g., photos of your nails, face) or videos.",
    //   key: "images",
    //   type: "file",
    // },
    // {
    //   id: 14,
    //   text: "If available, please upload a short video for analysis.",
    //   key: "video",
    //   type: "file",
    // },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResponse = (key, value) => {
    setResponses({ ...responses, [key]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show the submit button after last question
      setIsSubmitted(true);
    }
  };

  const submitData = () => {
    // Get the user_id and expert_id (You can replace these with actual values or pass them as props)
    const user_id = "someUserId"; // Replace with actual user ID
    const expert_id = localStorage.getItem("activeExpertId"); // Get expert ID from local storage

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
        // Optionally redirect to another page after submission
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6 space-y-4">
        <div className="text-lg font-bold text-gray-800">
          {questions[currentQuestion].text}
        </div>
        <div className="space-y-2">
          {questions[currentQuestion].type === "options" &&
            questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
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
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
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

        {/* Show Submit button after last question */}
        {isSubmitted && (
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
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
