import React from 'react'
import { useNavigate } from 'react-router-dom';

import img from "../../assets/img1.png";
import {MdOutlineRestaurantMenu} from 'react-icons/md';
import {GiHamburgerMenu} from 'react-icons/gi';
import Navbar from './Navbar';

const Landing = () => {
  const navigate=useNavigate();


  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">
      <div className="max-w-full mx-auto px-6 md:px-12 lg:px-24">
        <Navbar/>

        <main className="mt-12 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 space-y-6">
          <div className='mb-10'>
            <h2 className="text-5xl mb-5 font-bold text-[#2D493B]">
              Get Your Analysis Done Now
            </h2>
            <p className="text-[#6B7280] text-lg">
              Unlock insights into your health with expert facial and nail
              analysis powered by AI and Ayurveda.
            </p>
          </div>
            <a
              href="#"
              className="mb-10 py-3 px-6 bg-[#2D493B] text-white rounded-lg text-lg hover:bg-[#1F382A]"
            >
              Get Started →
            </a>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <img
              src={img}
              alt="Meditation Illustration"
              className="w-full h-auto"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing