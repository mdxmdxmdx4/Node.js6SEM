const jokes = require('./jokes.json');

function getRandomJoke(bot, msg)
{
    const chatId = msg.chat.id;
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];
    bot.sendMessage(chatId, randomJoke);
}

module.exports = { getRandomJoke };