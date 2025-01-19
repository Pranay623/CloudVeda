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

  const handleSendEmail = async () => {
    try {
      // Get email and full name from localStorage
      const email = localStorage.getItem("email");
      const fullName = localStorage.getItem("fullName");
  
      if (!email || !fullName) {
        alert("Email or full name is missing in localStorage.");
        return;
      }
  
      // Construct the recipients array
      const recipients = [
        {
          email: email,
          fullName: fullName,
        },
      ];
  
      // Construct the payload
      const payload = {
        recipients: recipients,
      };
  
      // Send the POST request to the email API
      const response = await fetch("http://localhost:3000/api/email/send-wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send email.");
      }
  
      const data = await response.json();
      console.log("Email sent successfully:", data);
  
      // Optionally, show a success message
      alert("Email sent successfully!");
      navigate("/thankyou")
  
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email.");
    }
  };

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
        const response = await fetch(
          `http://127.0.0.1:5000/analyze_${category}`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to analyze image.");
        }
  
        const mlData = await response.json();
  

        const analysisData = {
          dark_circles: mlData.dark_circles || "Not Available",
          expression: mlData.expression || "Not Available",
          face_shape: mlData.face_shape || "Not Available",
          health_index: mlData.health_index || "Not Available",
          skin_texture: mlData.skin_texture || "Not Available",
          skin_tone: mlData.skin_tone || "Not Available",
          spots: mlData.spots || "0 spots detected",
          wrinkles: mlData.wrinkles || "Not Available",
        };
  
        setPhotoAnalysis((prevAnalysis) => ({
          ...prevAnalysis,
          [category]: mlData, 
        }));
  
        const backendData = {
          category,
          user_id: localStorage.getItem("userid"),
          expert_id: localStorage.getItem("activeExpertId"),
          hair_analysis: mlData.hair_analysis || {},
          hairline_analysis: mlData.hairline_analysis || {},
          skin_analysis: analysisData, 
          nail_analysis: mlData.nail_analysis || {},
        };
  
        const backendResponse = await fetch("http://localhost:3000/image/ml", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        });
  
        if (!backendResponse.ok) {
          throw new Error("Failed to save analysis to backend.");
        }
  
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
      const user_id = localStorage.getItem("userid");
      const expert_id = localStorage.getItem("activeExpertId");
      
      console.log(expert_id)

if (!user_id || !expert_id) {
  console.error("User ID or Expert ID is missing in localStorage.");
  alert("User ID or Expert ID is not available. Please try logging in again.");
  return;
}
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("expert_id", expert_id);
      formData.append("face", photos.face.src);
      formData.append("head", photos.head.src);
      formData.append("nails", photos.nails.src);
      formData.append("face_analysis", JSON.stringify(photoAnalysis.face));
      formData.append("head_analysis", JSON.stringify(photoAnalysis.head));
      formData.append("nails_analysis", JSON.stringify(photoAnalysis.nails));


      // Send photos and analysis results to backend API
      const response = await fetch("http://localhost:3000/image/ml", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images.");
      }

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
      {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

      <button
    className="m-2 mt-6 px-6 py-3 bg-[#025A4E] text-white rounded-md hover:bg-[#018d75] focus:outline-none transition duration-300 ease-in-out"
    onClick={handleSendEmail} 
  >
    Submit Photos
  </button>
    </div>
  );
};

export default Camera;
