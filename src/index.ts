import { config } from 'dotenv';
import {
    Scenes, Telegraf, session, Markup,
} from 'telegraf';

import { MyContext } from './types/MyContext';
import weatherScene from './scenes/weatherScene';

config();

const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_TOKEN!);
const stage = new Scenes.Stage<MyContext>([weatherScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    const message = `Welcome ${ctx.from!.first_name} to Neo weather bot`;

    const options = Markup.inlineKeyboard([
        Markup.button.callback('Get weather data', 'getWeather'),
    ]);

    ctx.reply(message, options);
});

bot.action('getWeather', (ctx) => ctx.scene.enter('weatherScene'));

bot.launch();
console.log('Bot is ready (:');
