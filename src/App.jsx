
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setweather] = useState()
  const [temperature, setTemperature] = useState()
 

  useEffect(() => {
    //cuando llegue ubicación se ejecuta
      const success = position => {
        const obj = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }

   setCoords(obj);
  }
    //llama la api del navegador para tener la ubicación actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
 
  //---------- pedir clima--------

  useEffect(() => {
    if (coords){ 
    const apiKey = `7cb719b97593964cd7c760f5b8f3bd18`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}`
    
    axios.get(url)

    .then(res =>{  
      const celcius= (res.data.main.temp - 273.15).toFixed(0)
      const farenheit= (celcius * 9 / 5 + 32).toFixed(0)
      setTemperature({celcius,farenheit})
      setweather(res.data)
    })

    .catch(err=>console.log(err))
  }
    
  }, [coords])
  

  return (
    <div className="App">
    { 
    weather ? 
     <WeatherCard weather={weather} temperature={temperature} />
    :
    <Loading />

    }

    </div>
  )
}

export default App
