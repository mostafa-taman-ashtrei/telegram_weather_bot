import axios from 'axios';

import { myWeatherData } from '../types/myWeatherData';

const getWeatherData = async (city: string) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`;
        const { data } = await axios.get(url);

        const weatherData: myWeatherData = {
            temp: data.main.temp,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.humidity,
        };

        return weatherData;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch weather data');
    }
};

export default getWeatherData;
