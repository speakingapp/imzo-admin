const { bot } = require('../../bot');
const { Stage, Markup, Extra } = require('telegraf');
const Scene = require('telegraf/scenes/base');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');
const { Keyboard, Key } = require('telegram-keyboard');

const keyboard = Keyboard.make([
  ['📞 Заказать', '💬 Консультация'],
  ['💎 Каталог'],
  ['🌐 Телеграм группу', '📩 Контакт'],
]).reply()


const superWizard = new WizardScene(
  'super-wizard',
  (ctx) => {
    if (+ctx.chat.id < 0) {
      return;
    }

    if (ctx.message.text === '📞 Заказать') {
      return ctx.reply('Введите Ваше имя:', Extra
      .markup(Markup.removeKeyboard(true)));
    }

    ctx.replyWithHTML(
      'Нажмите на кнопку <b>"📱 Отправить телефон"</b> или введите его вручную в международном формате +79 ********',
      Extra.markup(
        Markup.keyboard([
          [Markup.contactRequestButton('📱 Отправить телефон')],
        ]).resize().oneTime()
      )
    );

    ctx.session.name = ctx.message.text;
    return ctx.wizard.next();
  },
  (ctx) => {
    if (!ctx.message.text && !ctx.message.contact) {
      return ctx.reply(
        'Нажмите на кнопку <b>"📱 Отправить телефон"</b> или введите его вручную в международном формате +79 ********'
      );
    }

    ctx.reply('Что Вам нужно дверь или окно');
    ctx.session.number = String(ctx.message.text || ctx.message.contact.phone_number).replace('+', '');
    return ctx.wizard.next();
  },
  (ctx) => {
    if (!ctx.message.text) {
      return ctx.reply('Что Вам нужно дверь или окно?');
    }

    ctx.reply('Какой материал вам нужен? Алюминий или пластик');
    ctx.session.age = ctx.message.text;
    return ctx.wizard.next();
  },
  (ctx) => {
    if (!ctx.message.text) {
      return ctx.reply('Какой материал вам нужен? Алюминий или пластик');
    }

    ctx.session.music = ctx.message.text;

    // Additional questions
    ctx.reply('Напишите, количество и  размеры.');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.getUpTime = ctx.message.text;

    ctx.reply('Вы живете в доме или квартире?');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.fatherDescription = ctx.message.text;

    ctx.reply('Введите адрес доставки');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.favoriteBooks = ctx.message.text;

    ctx.reply('Спасибо! Ваша информация отправлена', keyboard);

    // Construct the collected information
    const collectedInfo = `
      <b>Имя:</b> ${ctx.session.name}
      <b>Номер:</b> +${ctx.session.number}
      <b>Запрос:</b> ${ctx.session.age}
      <b>Материал:</b> ${ctx.session.music}
      <b>Количество и размеры:</b> ${ctx.session.getUpTime}
      <b>Места жительства:</b> ${ctx.session.fatherDescription}
      <b>Адрес доставки:</b> ${ctx.session.favoriteBooks}
    `;

    const receiverUserId = 6366431436; // Replace with the target user's ID
    var d = new Date();
    var time = d.toLocaleTimeString();

    bot.telegram.sendMessage(
      receiverUserId,
      `<u><b>Новый Лид:</b></u>\n <i>Время отправки: ${time}</i>\n ${collectedInfo}`,
      { parse_mode: 'HTML' }
    );
    ctx.scene.leave();
  }
);

const stage = new Stage([superWizard], { default: 'super-wizard' });
bot.use(stage.middleware());
