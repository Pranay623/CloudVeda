import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 780,
  facingMode: "user",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [mediaError, setMediaError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a stable reference for capturePhoto
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    console.log(imageSrc);
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
  }, [capturePhoto]);

  // Function to send the image to the API
  const uploadImage = async () => {
    if (!url) return;
  
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    const imageBlob = await fetch(url)
      .then((res) => res.blob())
      .catch((err) => {
        console.error("Error fetching image:", err);
        setError("Failed to fetch image.");
      });
  
    if (imageBlob) {
      formData.append("file", imageBlob, "user-image.png");
  
      try {
        const response = await fetch("http://127.0.0.1:5000/analyze_face", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          console.log("Image uploaded successfully!");
        } else {
          const errorText = await response.text();
          console.error("Failed to upload image:", errorText);
          setError(`Failed to upload image: ${errorText}`);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error uploading image.");
      } finally {
        setLoading(false);
      }
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

      {loading && <p className="text-blue-500 mt-4">Uploading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        className="m-2 mt-6 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
        onClick={uploadImage}
      >
        Upload Image
      </button>
    </div>
  );
};

export default Camera;
