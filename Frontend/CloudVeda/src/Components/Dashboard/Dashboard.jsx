import React from 'react'

const Dashboard = () => {
  return (
    
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
            <div className="max-w-full mx-auto px-6 md:px-12 lg:px-24">
              <header className="flex justify-between items-center py-">
                <div className="flex items-center space-x-3">
                  <img src={Logo} alt="Cloudveda Logo" className="min-w-26 min-h-20" />
                  <h1 className="text-2xl font-bold text-[#2D493B]"></h1>
                </div>
                <nav className="space-x-20 hidden md:flex">
                  <a href="#" className="text-[#2D493B] hover:text-[#1F382A]">
                    Home
                  </a>
                  <a href="#" className="text-[#2D493B] hover:text-[#1F382A]">
                    About
                  </a>
                  <a href="#" className="text-[#2D493B] hover:text-[#1F382A]">
                    Experts
                  </a>
                </nav>
                <div
                onClick={()=>{navigate('/login')}}
                  className="py-2 px-4 bg-[#2D493B] text-white rounded-lg hover:bg-[#1F382A]"
                >
                  Profile
                </div>
              </header>
      
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
                 
                  
                </div>
              </main>
            </div>
          </div>
    
  )
}

export default Dashboard