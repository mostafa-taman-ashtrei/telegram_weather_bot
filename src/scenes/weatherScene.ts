import { Scenes } from 'telegraf';

import getWeatherData from '../utils/getWeather';
import reverseGeocoding from '../utils/reverseGeocoding';

const weatherScene = new Scenes.BaseScene<Scenes.SceneContext>('weatherScene');

weatherScene.enter((ctx) => ctx.reply('Send me your location (:'));

weatherScene.on('location', async (ctx) => {
    ctx.reply('Please wait while i get the weather');
    const { latitude, longitude } = ctx.update.message.location;
    const city = await reverseGeocoding(longitude, latitude);
    const data = await getWeatherData(city);

    ctx.replyWithHTML(`
        In ${city} :
        The Tempreture is  ${data.temp} degress
        The Minimum Tempreture is ${data.tempMin} degrees
        The Maximum Tempreture is ${data.tempMax} degress
        The Humidity is ${data.humidity}
    `);
});

weatherScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default weatherScene;
