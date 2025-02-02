import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import ExpertCard from '../Dashboard/ExpertCard';

const Expert = () => {
  const [expertName, setExpertName] = useState('');
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Retrieve the expert's name from localStorage
    const name = localStorage.getItem('fullName');
    if (name) {
      setExpertName(name);
    }

    const fetchPatients = async () => {
        const expert_id = localStorage.getItem('userid');
        console.log("")
      
        try {
          const response = await fetch('http://localhost:3000/api/image-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({expert_id}),
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch patient data');
          }
      
          const data = await response.json();
          console.log(data);
          setPatients(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      

    fetchPatients();
  }, []);
  
console.log(patients.userData,"see patient")
const data=patients.userData

const expertId=data?.expert_id
console.log("dekho expert id",expertId)

// console.log(data?.user_id?.userName,"dekho username")



  return (
    <>
      <Navbar />
      <div className="bg-[#FFFDF5] min-h-screen py-8 px-4 md:px-16 mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mt-8">
          {/* Left Section - Greeting */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              Welcome, {expertName || 'Expert'}!
            </h1>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Thank you for logging in, {expertName || 'Expert'}.<br />
              Below, you'll find a list of patients who have requested your services. <br />
              Please review their details and proceed with the required analysis.<br />
              We're excited to have you on board in this health journey!
            </p>
          </div>

          {/* Right Section - Illustration */}
          <div className="md:w-1/2 flex justify-center items-center">
           
          </div>
        </div>

        {/* Bottom Section - Patient Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Patients' Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  sm:ml-32 md:ml-0 ">
            {isLoading ? (
              <p>Loading patients...</p>
            ) : data.length > 0 ? (
              data.map((data) => (
           
                  <ExpertCard key={data?.user_id} data={data} id={data.user_id} /> 
      
              ))
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Expert;
