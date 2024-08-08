import React, { useEffect } from "react";
import search from "./icons/search.png";
import icWind from "./icons/icWind.png";
import icLocation from "./icons/icLocation.png";
import icHumidity from "./icons/icHumidity.png";

import { useState } from "react";
import { useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState("pune");

  const searchCity = useRef();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    if (city === "") {
      setCity("pune");
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          cityName: data.name,
          feelsLike: data.main.feels_like,
          mainDescription: data.weather[0].main,
          description: data.weather[0].description,
          wIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        console.log(weatherData);
      })
      .catch((err) => {
        alert("Incorrect city name / Data not available")
      });
  }, [city]);

  return (
    <>
      <div className="h-screen flex justify-center items-start md:items-center bg-neutral-800">
        <div className="bg-blue-300 mt-8 md:mt-0 text-black p-8 rounded-lg shadow-xl shadow-slate-500">
          <div className="flex">
            <input
              ref={searchCity}
              className="shadow-xl border-2 border-blue-400 px-3 rounded-lg mr-2"
              type="text"
              placeholder="Enter city name here"
            />
            <img
              src={search}
              onClick={() => {
                setCity(`${searchCity.current.value}`);
              }}
              className="w-8 cursor-pointer hover:scale-110"
              draggable="false"
            />
          </div>

          <div className="flex text-blue-900 font-extrabold justify-evenly mt-8 mb-2">
            <h1>{weatherData.mainDescription}</h1>
            <h1>{weatherData.description}</h1>
          </div>

          <div className="text-center mb-7 bg-blue-900 rounded-xl">
            <img
              className="m-auto w-28 "
              src={weatherData.wIcon}
              draggable="false"
            />

            <h1
              className="text-5xl text-slate-200 font-semibold"
              data-aos="fade-in"
            >
              {weatherData.temp}°
            </h1>
            <h1 className="text-slate-300">
              Feels like:{" "}
              <span className="text-slate-200 font-bold">
                {weatherData.feelsLike}°
              </span>
            </h1>
            <div className="text-3xl font-semibold text-blue-200 py-2 bg-slate-800 rounded-xl mt-2 flex justify-center items-center">
              <h1 data-aos="fade-in">{weatherData.cityName}</h1>
              <img className="ml-3 h-6" src={icLocation} />
            </div>
          </div>
          <div className="flex justify-between my-5">
            <div className="flex items-center">
              <img className="h-7 mr-4" src={icHumidity} />
              <div>
                <h2 className="font-semibold" data-aos="fade-in">
                  {weatherData.humidity}%
                </h2>
                <h1 className="text-sm text-neutral-700">Humidity</h1>
              </div>
            </div>
            <div className="flex items-center">
              <img className="h-7 mr-4" src={icWind} />
              <div>
                <h2 className="font-semibold" data-aos="fade-in">
                  {weatherData.wind}km/h
                </h2>
                <h1 className="text-sm text-neutral-700">Wind speed</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
