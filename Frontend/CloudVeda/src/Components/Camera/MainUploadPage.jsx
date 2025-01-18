  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import Navbar from "../Navbar/Navbar";

  const MainUploadPage = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState({ face: null, nails: null, head: null });

    const handlePhotoCapture = (type, photo) => {
      setPhotos((prevPhotos) => ({ ...prevPhotos, [type]: photo }));
    };

    return (
      <>
      <Navbar/>
      
      <div className="min-h-screen bg-[#FFFDF5] p-6 flex items-start ">
  
  <div className="w-full max-w-md space-y-6 mr-20">
    <h1 className="text-3xl font-bold text-gray-800">Instructions</h1>
    <ul className="list-disc space-y-2 pl-6 text-gray-700 ">
      <li>Face directly towards the camera for accurate analysis.</li><br/>
      <li>Ensure proper lighting without shadows or overexposure.</li><br/>
      <li>Maintain a stable and good network connection for uploads.</li><br/>
      <li>Keep your face clean and free of makeup for the best results.</li><br/>
      <li>Avoid wearing accessories like hats, glasses, or jewelry.</li>
    </ul>
  </div>

  
  <div className="w-full max-w-md space-y-6 ml-80">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Photos</h1>
    {["face", "nails", "head"].map((type) => (
      <div key={type} className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-800 capitalize">{type} Photo</h3>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/camera/${type}`)}
        >
          Upload Photo
        </button>
        {photos[type] && <img src={photos[type]} alt={`${type} Photo`} className="mt-4 rounded-lg" />}
      </div>
    ))}
  </div>
</div>


      </>
    );
  };

  export default MainUploadPage;
