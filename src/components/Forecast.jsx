import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'

const Forcast = ({forecast,type}) => {
  if(!forecast){
    return null
  }
  const [localType,setLocalType] = useState(null)
  useEffect(()=>{
    if(type==='daily'){
      setLocalType(forecast.daily)
    } else{
      setLocalType(forecast.hourly)
    }
  },[])
 
  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='front-medium'>3 hours step forecast</p>
      </div>
      <hr className='my-1'/>

      <div className='flex items-center justify-between'>
          {localType && localType.map((data,index) => (
            <div key={index} className='flex flex-col items-center justify-center'>
              <p className='font-light text-sm'>{data.title}</p>
              <img src={data.icon} alt="weather icon"
              className='w-12 my-1'/>
              <p className='font-medium'>{data.temp}°C</p>
      </div>
          ))}
      </div>
    </div>
  )
}

export default Forcast
