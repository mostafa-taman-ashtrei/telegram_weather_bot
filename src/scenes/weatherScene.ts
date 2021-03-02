import { Scenes } from 'telegraf';

import getWeatherData from '../utils/getWeather';
import reverseGeocoding from '../utils/reverseGeocoding';
import TTS from '../utils/textToSpeech';

const weatherScene = new Scenes.BaseScene<Scenes.SceneContext>('weatherScene');

weatherScene.enter((ctx) => ctx.reply('Send me a location (:'));

weatherScene.on('location', async (ctx) => {
    ctx.reply('Please wait while i get the weather');
    const { latitude, longitude } = ctx.update.message.location;
    const city = await reverseGeocoding(longitude, latitude);
    const data = await getWeatherData(city);

    const reply = `In ${city} :
        The Temperature is ${data.temp} degrees
        The Minimum Temperature is ${data.tempMin} degrees
        The Maximum Temperature is ${data.tempMax} degrees
        and The Humidity is ${data.humidity}
    `;

    ctx.replyWithHTML(reply);
    await TTS(reply, ctx);
});

weatherScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default weatherScene;
