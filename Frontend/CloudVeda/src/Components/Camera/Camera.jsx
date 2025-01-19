import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const capturePhoto = useCallback(async (category) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const fileName = `${category}-${Date.now()}.png`; 

      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [category]: { src: imageSrc, name: fileName },
      }));

      const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: "image/png" });
      };

      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageSrc), fileName);

      try {
        const response = await axios.post(
          `http://3.237.21.65:5000/analyze_${category}`,
          formData
        );

        const mlData = response.data;
        setPhotoAnalysis((prevAnalysis) => ({
          ...prevAnalysis,
          [category]: mlData, 
        }));

        const backendData = {
          category,
          user_id: localStorage.getItem("userid"),
          analysis: mlData,
        };

        await axios.post("http://localhost:3000/image/ml", backendData);

        console.log(`Successfully saved ${category} analysis to backend.`);
      } catch (err) {
        setError("Error analyzing image or saving data to backend.");
        console.error("Error:", err);
      }
    }
  }, []);

  const uploadImages = async () => {
    if (!photos.face || !photos.head || !photos.nails) {
      alert("Please capture all three photos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("face", photos.face.src);
      formData.append("head", photos.head.src);
      formData.append("nails", photos.nails.src);
      formData.append("face_analysis", JSON.stringify(photoAnalysis.face));
      formData.append("head_analysis", JSON.stringify(photoAnalysis.head));
      formData.append("nails_analysis", JSON.stringify(photoAnalysis.nails));

      const user_id = localStorage.getItem("userid");
      formData.append("user_id", user_id);

      await axios.post("http://localhost:3000/image/ml", formData);

      alert("Photos and analysis saved successfully!");
      navigate("/thankyou");
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
