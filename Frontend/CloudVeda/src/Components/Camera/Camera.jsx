import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width:780,
  facingMode: "user",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  // Create a stable reference for capturePhoto
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, []);

  // Handle user media events (if needed)
  const onUserMedia = (stream) => {
    console.log("User media stream:", stream);
  };

  // Handle errors when accessing user media
  const onUserMediaError = (error) => {
    console.error("Error accessing user media:", error);
    setMediaError("Failed to access camera.");
  };

  // Listen for spacebar press to capture photo
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        capturePhoto();
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [capturePhoto]); // capturePhoto is stable due to useCallback

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative mb-4">
        <Webcam
          ref={webcamRef}
          audio={true}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          onUserMediaError={onUserMediaError}
          mirrored={true}
          className="rounded-lg border-4 border-gray-700 shadow-lg"
        />
        {url && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg flex items-center justify-center">
            <p className="text-white text-2xl">Photo Captured!</p>
          </div>
        )}
      </div>

      <p className="text-center text-lg text-gray-700 mb-4">
        Press <span className="font-bold text-[#025A4E]">Space Bar</span> to capture the photo.
      </p>

      <div className="flex justify-between w-full max-w-xs">
        <button
          className="m-2 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
          onClick={capturePhoto}
        >
          Capture
        </button>
        <button
          className="m-2 px-6 py-3 bg-[#6D2B2B] text-white rounded-md hover:bg-[#933c3c] focus:outline-none transition duration-300 ease-in-out"
          onClick={() => {
            setUrl(null);
          }}
        >
          Refresh
        </button>
      </div>

      {mediaError && <p className="text-red-500 text-center mt-4">{mediaError}</p>}

      {url && (
        <div className="mt-4">
          <img src={url} alt="Screenshot" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default Camera;
