require('dotenv').config()
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const db = require('./database');
const token = process.env.token;
const cron = require('node-cron');
const weatherApiKey = process.env.weatherApiKey;
const { sendDailyFact } = require('./facts');
const { sendStickerOnMessage } = require('./stickers');
const { getRandomJoke } = require('./joke');
const { getPictureByName } = require('./picture');
const { getWeatherByCity } = require('./weather');

try
{    
    const bot = new TelegramBot(token, {polling: true});
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        if(!msg.text.startsWith('/')){
        bot.sendMessage(chatId, 'Ты сказал: ' + msg.text);
        sendStickerOnMessage(bot, msg);
    }
    getPictureByName(bot, msg);
    });

    bot.onText(/\/subscribe/, (msg) => {
        const chatId = msg.chat.id;
        db.run('INSERT OR IGNORE INTO subscribers (chat_id) VALUES (?)', [chatId], function(err) {
          if (err) {
            return bot.sendMessage(chatId, 'Произошла ошибка при попытке подписки.');
          }
          bot.sendMessage(chatId, 'Вы подписались на ежедневную рассылку.');
        });
    });
      
    bot.onText(/\/unsubscribe/, (msg) => {
    const chatId = msg.chat.id;
    db.run('DELETE FROM subscribers WHERE chat_id = ?', [chatId], function(err) {
        if (err) {
        return bot.sendMessage(chatId, 'Произошла ошибка при попытке отписки.');
        }
        bot.sendMessage(chatId, 'Вы отписались от ежедневной рассылки.');
        });
    });

    cron.schedule('35 16 * * *', () => {
    sendDailyFact(bot);
    });

    bot.onText(/\/joke/, (msg) => {
        getRandomJoke(bot, msg);
    });

    bot.onText(/\/weather (.+)/, (msg, match) => {
        getWeatherByCity(bot, msg, match, axios, weatherApiKey);
    });

}
catch
{
    console.log("ОШИБКА!!!")
}
