import React from 'react'
import Navbar from '../Navbar/Navbar'
import img from "../../assets/img3.png"
import Footer from '../Footer/Footer'

export const Profile = () => {
  return (
    <div>
        <Navbar/>
        
        
                <div className="bg-[#FFFDF5] h-screen justify-around p-10 flex flex-col lg:flex-row items-start ">
              
              <div className="lg:w-1/2 text-left ml-12 mt-20">
                <p className='text-[#1F382A] text-3xl '><strong>Name: </strong>Pranay</p><br/>
                <p className='text-[#1F382A] text-3xl'><strong>Age:</strong> 20</p><br/>
                <p className='text-[#1F382A] text-3xl'><strong>email:</strong> pranay23153011@akgec.ac.in</p><br/>
                 <p className='text-[#1F382A] text-3xl'><strong> Address: </strong>Prayagraj</p>
              </div>
            <div className="lg:w-1/3 mt-12 lg:mt-0 ml-10">
                    <img src={img} alt="Meditation Illustration" className="w-full h-auto" />
                  </div>
              
            </div>
            <Footer/>
    </div>
  )
}
