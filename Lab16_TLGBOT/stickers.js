function sendStickerOnMessage(bot, msg) {    
    const text = msg.text;
    const chatId = msg.chat.id;

    switch(text.toLowerCase()) 
    {
        case "привет":
        {
            bot.sendSticker(chatId, "CAACAgIAAxkBAAEMFD9mPLdyEqecDiWorW8z3wLUfq7Q7AACbgUAAj-VzAqGOtldiLy3NTUE");
            break;
        }
        case "пока":
        {
            bot.sendSticker(chatId, "CAACAgIAAxkBAAEMFENmPLeZgcRduuBovREsRZ9KyWPB7wACUgADQbVWDAIQ4mRpfw9yNQQ");
            break;
        }
        case "ты бесполезен":
        {
            bot.sendSticker(chatId, "CAACAgIAAxkBAAEMFEVmPLft030CnUtHrEK5Q1Vrj6eNrgACbjIAAtLe2UtBOy1zhxUixDUE");
            break;
        }
        case "пудж":
        {
            bot.sendSticker(chatId, "CAACAgIAAxkBAAEMFEdmPLgeri1KTEZ5Y_q-SNC3VfgqGwACEQADeb6xEYuI2bdAEk23NQQ");
            break;
        }
    }
}

module.exports = { sendStickerOnMessage };