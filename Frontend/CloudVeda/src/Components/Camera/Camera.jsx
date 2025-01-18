import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 780,
  facingMode: "user",
};

const Camera = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState({ face: null, head: null, nails: null });
  const [mediaError, setMediaError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to capture photo for a specific category
  const capturePhoto = useCallback((category) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const fileName = `${category}-${Date.now()}.png`; // Generate unique file name

      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: { src: imageSrc, name: fileName },
      }));
    }
  }, []);

  // Function to handle submission
  const uploadImages = async () => {
    if (!photos.face || !photos.head || !photos.nails) {
      alert("Please capture all three photos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const photoFileNames = Object.values(photos).map((photo) => photo.name);
      console.log("Photo File Names Array:", photoFileNames);

      alert(`Photos saved: ${photoFileNames.join(", ")}`);
      navigate("/uploadphotos");
    } catch (error) {
      console.error("Error processing images:", error);
      setError("Error processing images.");
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
          onClick={() => capturePhoto("head")}
        >
          Capture Head
        </button>
        <button
          className="m-2 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
          onClick={() => capturePhoto("nails")}
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
      {error && <p className="text-red-500 mt-4">{error}</p>}

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
