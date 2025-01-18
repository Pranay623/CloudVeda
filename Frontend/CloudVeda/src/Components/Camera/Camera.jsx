

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

// Define video constraints for webcam
const videoConstraints = {
  width: 780,
  facingMode: "user",
};

const Camera = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState({ face: null, head: null, nails: null });
  const [photoAnalysis, setPhotoAnalysis] = useState({ face: null, head: null, nails: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to capture photo for a specific category
  const capturePhoto = useCallback(async (category) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const fileName = `${category}-${Date.now()}.png`; // Generate unique file name
  
      // Save captured photo locally in state
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: { src: imageSrc, name: fileName },
      }));
  
      // Send image to ML API based on category
      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageSrc), fileName);
  
      try {
        // Send image to the ML API
        const response = await fetch(`http://3.237.21.65:5000/analyze_${category}`, {
          method: "POST",
          body: formData,
        });
  
        const mlData = await response.json(); // Response from ML API
        setPhotoAnalysis((prevAnalysis) => ({
          ...prevAnalysis,
          [category]: mlData, // Save ML analysis result in state
        }));
  
        // Prepare data for backend API
        const backendData = {
          category,
          user_id: localStorage.getItem("userid"),
          analysis: mlData, // Save ML analysis
        };
  
        // Send ML response to backend
        const backendResponse = await fetch("http://localhost:3000/image/ml", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        });
  
        if (backendResponse.ok) {
          console.log(`Successfully saved ${category} analysis to backend.`);
        } else {
          console.error(`Error saving ${category} analysis to backend.`);
        }
      } catch (err) {
        setError("Error analyzing image or saving data to backend.");
        console.error("Error:", err);
      }
    }
  }, []);
  

  // Helper function to convert DataURI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  };

  // Function to handle submission
  const uploadImages = async () => {
    // if (!photos.face || !photos.head || !photos.nails) {
    //   alert("Please capture all three photos.");
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      const photoFileNames = Object.values(photos).map((photo) => photo.name);

      // Prepare form data to submit to backend API
      const formData = new FormData();
      formData.append("face", photos.face.src);
      formData.append("head", photos.head.src);
      formData.append("nails", photos.nails.src);
      formData.append("face_analysis", JSON.stringify(photoAnalysis.face));
      formData.append("head_analysis", JSON.stringify(photoAnalysis.head));
      formData.append("nails_analysis", JSON.stringify(photoAnalysis.nails));
      
      const user_id = localStorage.getItem("userid");
      formData.append("user_id", user_id);

      // Send photos and analysis results to backend API
      const response = await fetch("http://localhost:3000/image/ml", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photos and analysis saved successfully!");
        navigate("/thankyou");
      } else {
        alert("Error submitting data.");
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("Error uploading images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative mb-4">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          mirrored={true}
          className="rounded-lg border-4 border-gray-700 shadow-lg"
        />
      </div>

      <p className="text-center text-lg text-gray-700 mb-4">
        Click the buttons below to capture the respective photos.
      </p>

      <div className="flex justify-between w-full max-w-xs">
        <button
          className="m-2 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
          onClick={() => capturePhoto("face")}
        >
          Capture Face
        </button>
        <button
          className="m-2 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
          onClick={() => capturePhoto("baldness")}
        >
          Capture Head
        </button>
        <button
          className="m-2 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
          onClick={() => capturePhoto("fingers")}
        >
          Capture Nails
        </button>
      </div>

      {Object.entries(photos).map(([category, photo]) => (
        photo && (
          <div key={category} className="mt-4">
            <p className="text-center text-gray-700 mb-2">{`Captured ${category}`}</p>
            <img
              src={photo.src}
              alt={`${category} Captured`}
              className="rounded-lg shadow-lg mb-4"
            />
          </div>
        )
      ))}

      {loading && <p className="text-blue-500 mt-4">Uploading...</p>}
      {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

      <button
        className="m-2 mt-6 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
        onClick={uploadImages}
      >
        Submit Photos
      </button>
    </div>
  );
};

export default Camera;
