import React from 'react'
import Navbar from "../Navbar/Navbar.jsx";
import img from "../../assets/img3.png";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar/>


        <div className="bg-[#FFFDF5] flex flex-col lg:flex-row items-start">
      
      <div className="lg:w-1/2 text-left ml-36 mt-32">
        <h1 className='text-3xl'>Name: Mohd Aman</h1>
        <br/>
        <h1 className='text-3xl'>Email: mohd2310021@akgec.ac.in</h1>
        <br/>
        <h1 className='text-3xl'>Phone NO   : 7054278971</h1>
        <br/>
        <h1 className='text-3xl'>Address: Prayagraj</h1>

      </div>

      
      <div className="lg:w-1/2 mt-12 lg:mt-0 ml-10">
        <img src={img} alt="Meditation Illustration" className="w-full h-auto" />
      </div>
    </div>
        
    </div>
  )
}

export default Profile