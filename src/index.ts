import { config } from 'dotenv';
import { Telegraf } from 'telegraf';

import { MyContext } from './types/MyContext';

config();

const bot = new Telegraf<MyContext>(process.env.TELEGRAM_BOT_TOKEN!);

bot.start((ctx) => ctx.reply('Welcome to telegram weather bot'));

bot.launch();
console.log('Bot is ready (:');
