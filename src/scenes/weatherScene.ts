import { Scenes } from 'telegraf';
import reverseGeocoding from '../utils/reverseGeocoding';

const weatherScene = new Scenes.BaseScene<Scenes.SceneContext>('weatherScene');

weatherScene.enter((ctx) => ctx.reply('Send me your location (:'));

weatherScene.on('location', (ctx) => {
    const { latitude, longitude } = ctx.update.message.location;
    reverseGeocoding(longitude, latitude);
    console.log(ctx.update.message.location);
});

weatherScene.command('/out', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat!.id, 'Bye, type /start to get start again');
    ctx.scene.leave();
});

export default weatherScene;
