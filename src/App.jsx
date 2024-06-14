import TopButtons from "./components/TopButtons";
import WeatherInfo from "./components/WeatherInfo";
import Inputs from "./components/inputs";
import getFormattedWeatherData from "./services/weatherServices";
import { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ q: "Mumbai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);

      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
getWeather();
    
    getWeather();
  }, [query, units]);
  return (
    <div className="mx-auto max-w-screen-ly mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      <TopButtons setQuery={setQuery} />
      <Inputs input={query.q} setInput={setQuery} />
<WeatherInfo loading={loading} weather={weather}/>
    </div>
  );
};

export default App;
