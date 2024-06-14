import React from 'react'
import TimeAndLocation from "./TimeAndLocation";
import TempAndDetails from "./TempAndDetails";
import Forecast from "./Forecast";
const WeatherInfo = ({loading,weather}) => {
    if(loading){
        return <h1 className='min-h-[70vh] flex justify-center items-center'>Loading...</h1>
    }
    // console.log(weather.forecast);
  return (
    <>
     <TimeAndLocation weather={weather} />
        <TempAndDetails weather={weather} />
        {weather?.forecast && <Forecast forecast={weather?.forecast} type={'daily'} />}
        {weather?.forecast && <Forecast forecast={weather?.forecast} type={'hourly'} />}
        <Forecast/>
    </>
  )
}

export default WeatherInfo
