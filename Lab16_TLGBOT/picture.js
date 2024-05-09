const imageUrls = require('./imageUrls.json');

function getPictureByName(bot, msg) {

    const chatId = msg.chat.id;
    const text = msg.text;
    
    const command = text.slice(1).toLowerCase();
    
    if (command in imageUrls) {
        const images = imageUrls[command];
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImageUrl = images[randomIndex];
        bot.sendPhoto(chatId, randomImageUrl);
    }
}

module.exports = { getPictureByName }