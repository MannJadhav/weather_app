const API_KEY = "f447651cc3d725563c8c02b5f8303540";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
import { DateTime } from 'luxon';

//FUNCTION TO FETCH WEATHER DATA
const getWeatherData = (infoType, searchParams) => {
    const url = new URL (BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});

    return fetch(url).then((res) => res.json());
};

//FUNCTION TO GET ICON URL FROM CODE
const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/01d@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy 'Local time:' hh:mm a") => {
    return DateTime.fromSeconds(secs)
        .plus({ seconds: offset })
        .toUTC()
        .toFormat(format);
};


//FUNCTION TO FORMAT CURRENT WEATHER DATA
const formatCurrent = (data) => {

    const {
        coord: {lat, lon},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt, 
        sys:{country, sunrise, sunset}, weather,
        wind:{speed},
        timezone
    } = data;


const {main: details, icon} = weather [0];
const formattedLocalTime = formatToLocalTime(dt, timezone);

return {
    temp, 
    feels_like, 
    temp_min, 
    temp_max, 
    humidity,
    name, 
    country, 
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon
  };
};

//FUNCTION TO FORMAT HOURLY WEATHER DATA
const formatHourlyWeather = (data, offset) => {
    // return 
    const hourly = data
        .filter(f => f.dt)  
        .slice(0, 5)        
        .map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt
        }));

    
//FORMAT DAILY WEATHER DATA
const daily = data
        .filter(f => f.dt_txt.slice(-8) === "00:00:00")
        .map(f => ({
           temp: f.main.temp,
           title: formatToLocalTime(f.dt, offset, "ccc"),
           icon: iconUrlFromCode(f.weather[0].icon),
           date: f.dt_txt
      }));

     return {hourly, daily};
};

//FUNCTION TO FOTMAT FORECAST WEATHER DATA
const formatForecast = (dt, timezone, forecastList) => {
    return formatHourlyWeather(forecastList, timezone);
};

//FUNCTION TO GET FORMAT FORECAST WEATHER DATA
const getFormattedWeatherData = async (searchParams) => {
    try {
        // GET CURRENT WEATHER DATA
        const formattedCurrentWeather = await getWeatherData('weather', searchParams)
            .then(formatCurrent);

        const {lat, lon, timezone } = formattedCurrentWeather;

        // GET FORECAST WEATHER DATA
        const formattedForecastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units })
            .then((data) => formatForecast(formattedCurrentWeather.dt, timezone, data.list));
        return {
            current: formattedCurrentWeather,
            forecast: formattedForecastWeather
        };
    } catch (error) {
        console.error('Error getting weather data:', error);
    }
};

export default getFormattedWeatherData;
