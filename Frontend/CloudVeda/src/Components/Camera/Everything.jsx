import React from "react";
import Camera from "./Camera";
import Navbar from "../Navbar/Navbar";

const Everything = () => {
  return (
    <>
    
    <Navbar/>
    <div className="bg-[#FFFDF5] h-full p-5 flex justify-center items-center">
      <div className=" border-rad rounded-xl">
        <Camera />
      </div>
    </div>
    </>
  );
};

export default Everything;
