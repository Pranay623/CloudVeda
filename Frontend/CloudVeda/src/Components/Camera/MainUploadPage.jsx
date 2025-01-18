import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainUploadPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({ face: null, nails: null, head: null });

  const handlePhotoCapture = (type, photo) => {
    setPhotos((prevPhotos) => ({ ...prevPhotos, [type]: photo }));
  };

  return (
    <>
    
    <div className=" h-screen bg-[#FFFDF5]">
      <Navbar />
      <div className=" max-h-screen bg-[#FFFDF5] p-6 flex justify-around  flex-col md:flex-row">
        <div className="w-full flex items-center flex-col max-w-md space-y-6 mr-0 md:mr-20">
          <h1 className="text-3xl m-8 font-bold text-gray-800">Instructions</h1>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Face directly towards the camera for accurate analysis.</li>
            <li>Ensure proper lighting without shadows or overexposure.</li>
            <li>Maintain a stable and good network connection for uploads.</li>
            <li>Keep your face clean and free of makeup for the best results.</li>
            <li>Avoid wearing accessories like hats, glasses, or jewelry.</li>
          </ul>
        </div>
        
        <div className="w-full bg-[#FFFDF5] flex flex-col items-center max-w-md space-y-6 mt-6 md:mt-0 md:ml-20">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Photos</h1>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center" style={{ width: '300px', height: '300px' }}>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 capitalize">Photo</h3>
              <button
                className="mt-4 px-4 py-2 bg-[#2D493B] text-white rounded-md hover:bg-[#243a2f]"
                onClick={() => navigate('/camera')}
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
};


export default MainUploadPage;
