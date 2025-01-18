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
      <div className="min-h-screen bg-[#FFFDF5] p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Photos</h1>
        <div className="space-y-6">
          
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800 capitalize"> Photo</h3>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => navigate(`/camera`)}
              >
                Upload Photo
              </button>
              
            </div>  
          
        </div>
      </div>

      </>
    );
  };

  export default MainUploadPage;
