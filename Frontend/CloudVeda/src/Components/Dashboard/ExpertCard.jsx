import React, { useEffect } from 'react'
import './ExpertCardcss.css';
import { useState } from 'react';


const ExpertCard = ({data}) => {

  const [mlData,setMlData]=useState([]);
  // const [dataFinal,setDataFinal]=useState([])

  
const id=localStorage.getItem('userid')
console.log("see id",id)
  const getmlData=async()=>{
    try{
      const response = await fetch(`http://localhost:3000/image/health-analysis?expert_id=${id}`, {
        method: 'GET',
  
      });
      const data=await response.json()
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      console.log("see response",data)
       setMlData(data)
   
    }catch(error){
       console.log('failed to fetch')
    }
  }

  useEffect(()=>{
   getmlData()
  },[])
    // console.log("dekho jo aaya h",data)
    const datafinal=mlData.data?.skin_analysis
    console.log("see final",datafinal)
    // setDataFinal(datafinal)

    // console.log("final data",mlData)
    // const {skin_analysis,nail_analysis,hairline_analysis}=datafinal
    const {age,user_id: { userName },activity_level,dietary_habits,height,hydration_levels,mood,sleep_patterns,stress_levels,weight}=data
  return (
    <div className='flip-card-container relative w-full h-[730px] flex '>
        <div className='flip-card bg-[#f14d42] h-full w-full border rounded-3xl p-3'>
            {/*front */}
    <div className='flip-card-front absolute inset-0 flex flex-col gap-y-4 bg-[#f14d42] h-full rounded-3xl p-3'>

        <div className='flex gap-x-5 justify-between'>
            <div className='text-white font-bold leading-tight text-3xl pl-5 '>HEALTH REPORT</div>
            <div className='mr-0'>
                <img src="https://ucarecdn.com/c83e7113-0048-4bfa-a439-9b98ddb807e6/" alt="" className='h-[60px] w-[60px] ' />
            </div>
        </div>
        <div>
        <div className='bg-white border rounded-3xl p-4 flex flex-col pb-5 items-start  h-[600px]'>
   
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/e801cd33-56e8-4bcc-b134-f3f450f159a6/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Name</label>
        </div>
        <div className='text-lg'>{userName}</div>
      </div>
      </div>

<div className='flex'>
        <div>
            <img src="https://ucarecdn.com/b3054509-6597-4189-944f-7a7e06edc254/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Age</label>
        </div>
        <div className='text-lg'>{age}</div>
      </div>
      </div>
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/34fa90f8-3ddb-4739-8867-4bc9aa84a6f0/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Activity Level</label>
        </div>
        <div className='text-lg'>{activity_level}</div>
      </div>
      </div>
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/66af66eb-42f9-44e7-8ac8-3ecf2f164a70/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Dietary Habits</label>
        </div>
        <div className='text-lg'>{dietary_habits}</div>
      </div>
      </div>
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/a74b4036-0965-4516-bb32-f4902d9024f6/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Height</label>
        </div>
        <div className='text-lg'>{height}cm</div>
      </div>
      </div>
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/7dfc1071-d728-4eee-957e-39fdb6aa4a95/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Weight</label>
        </div>
        <div className='text-lg'>{weight}kg</div>
      </div>
      </div>

      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/c5a11834-d4fe-48e2-b6d7-8d05c61c9df6/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Hydration Level</label>
        </div>
        <div className='text-lg'>{hydration_levels}</div>
      </div>
      </div>
     
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/00f06aaf-e27a-4d1c-8759-7e58c3e975d7/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Mood</label>
        </div>
        <div className='text-lg'>{mood}</div>
      </div>
      </div>
    
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/b56b8973-2498-479b-b96d-ee5f92f0bd56/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Sleep Patterns</label>
        </div>
        <div className='text-lg'>{sleep_patterns}</div>
      </div>
      </div>
      <div className='flex'>
        <div>
            <img src="https://ucarecdn.com/d961315d-5a13-41f1-83ed-dbcda9ea848d/-/preview/512x512/" alt="" className='w-[50px] h-[50px]' />
        </div>
        <div className='pl-10' >
        <div >
        <label htmlFor="" className='text-[#d00809] font-bold text-lg'>Stress Level</label>
        </div>
        <div className='text-lg'>{stress_levels}</div>
      </div>
      </div>


   
 
 
</div>
</div>
    </div>
    {/*Back side */}
    <div className='flip-card-back absolute inset-0 flex flex-col gap-y-4 bg-[#f14d42] h-full rounded-3xl p-3'>

        <div className='flex gap-x-5 justify-between'>
            <div className='text-white font-bold leading-tight text-3xl pl-5 '>HEALTH REPORT</div>
            <div className='mr-0'>
                <img src="https://ucarecdn.com/c83e7113-0048-4bfa-a439-9b98ddb807e6/" alt="" className='h-[60px] w-[60px] ' />
            </div>
        </div>

      
     
        <div>
        <div className='bg-white border rounded-3xl p-4 flex flex-col pb-5 items-start  h-[600px]'>
        <div>Dark Circles:{datafinal?.dark_circles}</div>
        <div>Expression:{datafinal?.expression}</div>
        <div>Face Shape:{datafinal?.face_shape}</div>
        <div>health index:{datafinal?.health_index}</div>
        <div>Skin Texture:{datafinal?.skin_texture}</div>
        <div>Skin Tone:{datafinal?.skin_tone}</div>
        <div>Skin Spots:{datafinal?.spots}</div>
        <div>Wrinkles:{datafinal?.wrinkles}</div>
   
     
</div>
</div>
    </div>
    </div>
    </div>
  )
}

export default ExpertCard
