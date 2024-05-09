const db = require('./database');

const facts = require('./facts.json')

function sendDailyFact(bot) {    
    if(facts.length == 0)
    {
        return;
    }
    const factIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[factIndex];

    
    db.each("SELECT chat_id FROM subscribers", [], (err, row) => {
        if (err) {
            console.error('Ошибка при отправке факта:', err);
            return;
        }
        bot.sendMessage(row.chat_id, "*Случайный факт:*\n" + fact, {parse_mode: "Markdown"}).catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
        });
    });
    facts.splice(factIndex, 1);
}

module.exports = { sendDailyFact };
