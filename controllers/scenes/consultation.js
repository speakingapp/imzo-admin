const {bot, wit, client} = require('../../bot')
const session = require('telegraf/session')
const { Stage, Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base')
const { Keyboard,Key  } = require('telegram-keyboard')


const Markupkeyboard = Keyboard.make([
    ['🔙 Назад']
  ]).reply()

  const keyboard = Keyboard.make([
    ['📞 Заказать', '💬 Консультация'],
    ['💎 Каталог'],
    ['🌐 Телеграм группу', '📩 Контакт'],
  ]).reply()


const consultationScene = new Scene('consultationScene')



consultationScene.enter(ctx=>ctx.reply('Какие вопросы у Вас имеется, Уважаемый клиент?', Markupkeyboard))


consultationScene.on('text', async(ctx)=>{
   if(ctx.message.text==="🔙 Назад"){
    ctx.reply('Выберите Меню 🔝', keyboard);
    return ctx.scene.leave()
    console.log('Scene left')
   }
   return wit.meaning(ctx.message.text)
      .then((result) => {
        const intent = result.intents.map((intent) => intent.name);
        switch (intent[0]) {
          case 'req1':
            ctx.replyWithChatAction('typing');
            setTimeout(() => {
              ctx.replyWithHTML(`У нас есть алюминиевые и металлопластиковые профили. Наши алюминиевые профили — <b>Termo 65, Termo 78, Termo 98. Наши пластиковые профили — Quattro 6000, Trio 6000, Engelberg 7000, Engelberg 8000</b>. Их технические характеристики вы можете посмотреть в Каталоге.`);

            }, 600);
            break;
          case 'size_color':
              ctx.reply('Да, конечно. Посмотрите цвета, которые у нас есть в наличии.');
            break;
          case 'wit_installation':
              ctx.reply('Да, услуги доставки и монтажа включены в стоимость, дополнительная плата не требуется');
            break;
          case 'wit_warranty':
              ctx.reply('Наша продукция имеет 3-летний сервис и 5-летнюю гарантию.');
            break;
          case 'payment_option':
              ctx.reply('Оплата производится наличными, переводом денег с пластиковой карты, переводом денег с номера счета. 50% оплачивается вначале, остальные 50% оплачиваются при установке продукта.');
            break;
          case 'wit_kvmetre':
              ctx.reply('Цена нашей продукции составляет кв. Она определяется исходя из стоимости материала, а не за метр. То есть исходя из цены технической части дверей или окон, которые вы устанавливаете.');
            break;
        case 'install_time':
              ctx.reply('Устанавливается за 20 рабочих дней. Если срочно, то установят в течение 10 рабочих дней.');
               
            break;
            default:
                ctx.reply('Какие вопросы у вас есть, Уважаемый клиент?')
            break;
          
        }
        
      })

      
})

  

// Create a stage and register the scene
const stage = new Stage([consultationScene]);
bot.use(session());
bot.use(stage.middleware());

// Trigger scene when hears '💬 Консультация'
bot.hears('💬 Консультация', (ctx) => ctx.scene.enter('consultationScene'));






