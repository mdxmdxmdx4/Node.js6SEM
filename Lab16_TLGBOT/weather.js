function getWeatherByCity(bot, msg, match, axios, weatherApiKey)
{
    const chatId = msg.chat.id;
    const cityName = match[1];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`;
    
    axios.get(weatherUrl)
        .then(response => {

        const { temp, humidity, pressure } = response.data.main;
        const { speed } = response.data.wind;
        const { sunrise, sunset } = response.data.sys;
        const sunriseDate = new Date(sunrise * 1000);
        const sunsetDate = new Date(sunset * 1000);

        const duration = new Date((sunset - sunrise) * 1000).toISOString().substring(11, 16);

        const reply = `Погода в ${cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()}:
        Температура: ${(temp-273).toFixed(1)}°C
        Влажность: ${humidity}%
        Давление: ${pressure} hPa
        Ветер: ${speed.toFixed(1)} м/с (${(speed*3.6).toFixed(1)} км/ч)
        Восход: ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}
        Закат: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}
        Продолжительность дня: ${duration}`;

        bot.sendMessage(chatId, reply);
        })
        .catch(error => {
            console.error(error);
            bot.sendMessage(chatId, 'Произошла ошибка при получении данных о погоде. Пожалуйста, проверьте название города попробуйте снова. Пример: /weather Minsk');
        });
}

module.exports = { getWeatherByCity };