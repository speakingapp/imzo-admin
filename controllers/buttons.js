const {bot, Markup} = require('../bot')

const buttons = Markup.inlineKeyboard([
    {text:'Подпишитесь на Телеграмм группа', url:'https://t.me/imzonavoiy1'}
  ]);

  const keyboard = Markup.keyboard([
    ['📞 Заказать', '💬 Консультация'],
    ['💎 Каталог'],
    ['🌐 Телеграм группу', '📩 Контакт'],
  ]).oneTime().resize();


  bot.hears('📩 Контакт', (ctx)=>{
    ctx.replyWithHTML('📞 Контакт: <a href="tel:+998977977776"><b>+998977977776</b></a>.\n\n<i>📍Наш адрес: Город Навои, улица Махмуда Тароби, ЖК Garden Haus\n📍Ориентир: стадион «Yoshlik».</i>');

    const latitude = 40.113852448879484;
  const longitude = 65.38338699024253;
  ctx.replyWithLocation(latitude, longitude);
})

bot.hears('🌐 Телеграм группу', (ctx)=>{
    ctx.replyWithHTML('<i>Подпишитесь на Телеграмм группа</i>', {
        reply_markup:buttons,
    });
})





  module.exports={keyboard}
  require('./start')
