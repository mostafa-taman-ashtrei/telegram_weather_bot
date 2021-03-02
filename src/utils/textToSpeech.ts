import say from 'say';
import fs from 'fs';

import { MyContext } from '../types/MyContext';

const TTS = (text: string, ctx: MyContext) => {
    if (!fs.existsSync('./src/temp')) fs.mkdir('./src/temp', () => console.log('temp file created'));

    say.export(text, undefined, 1, './src/temp/Weather.wav', (err) => {
        if (err) console.error(err);
        console.log('Text has been saved to Weather.wav.');
        ctx.replyWithAudio({ source: 'src/temp/Weather.wav' });
    });
};

export default TTS;
