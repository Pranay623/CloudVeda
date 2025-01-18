import React from 'react'
import Navbar from "../Navbar/Navbar.jsx";
import img from "../../assets/img2.png";
import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar/>


        <div className="bg-[#FFFDF5]  flex flex-col lg:flex-row items-start">
      
      <div className="lg:w-1/2 text-left ml-12 mt-20">
        <h1 className='text-[#1F382A] text-3xl '><strong>About the Health Analysis and Evaluation System</strong></h1><br/>
        <p><strong>Purpose:</strong> Our system leverages advanced image and video analysis techniques to assess facial and nail characteristics, offering valuable insights for personalized health evaluation.</p><br/>
        <p><strong>Focus on Ayurveda:</strong> Tailored for Ayurveda practitioners, the platform helps in providing customized health recommendations based on detailed facial and nail assessments.</p><br/>
        <p><strong>Cutting-Edge Technology:</strong> The system combines machine learning models and computer vision to extract and analyze various health indicators such as skin tone, texture, dark circles, spots, and nail health.</p><br/>
        <p><strong>Facial & Nail Analysis:</strong> By assessing key facial and nail features, the system identifies health markers that can indicate specific conditions or imbalances, offering deeper insights into one's overall well-being.</p><br/>
        <p><strong>Cloud and Local Processing:</strong> The system efficiently uses a hybrid approach of local and cloud-based processing, ensuring fast analysis and secure data handling.</p><br/>
        <p><strong>Continuous Improvement:</strong> With regular updates and machine learning-based improvements, the system evolves to offer even more precise health evaluations over time.</p>
      </div>

      
      <div className="lg:w-1/2 mt-12 lg:mt-0 ml-10">
        <img src={img} alt="Meditation Illustration" className="w-full h-auto" />
      </div>
    </div>
        
    </div>
  )
}

export default About