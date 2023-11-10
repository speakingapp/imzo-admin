"use strict";

var _require = require('../../bot'),
    bot = _require.bot;

var _require2 = require('telegraf'),
    Stage = _require2.Stage,
    Markup = _require2.Markup,
    Extra = _require2.Extra;

var Scene = require('telegraf/scenes/base');

var Composer = require('telegraf/composer');

var WizardScene = require('telegraf/scenes/wizard');

var _require3 = require('telegram-keyboard'),
    Keyboard = _require3.Keyboard,
    Key = _require3.Key;

var keyboard = Keyboard.make([['📞 Заказать', '💬 Консультация'], ['💎 Каталог'], ['🌐 Телеграм группу', '📩 Контакт']]).reply();
var superWizard = new WizardScene('super-wizard', function (ctx) {
  if (+ctx.chat.id < 0) {
    return;
  }

  if (ctx.message.text === '📞 Заказать') {
    return ctx.reply('Введите Ваше имя:', Extra.markup(Markup.removeKeyboard(true)));
  }

  ctx.replyWithHTML('Нажмите на кнопку <b>"📱 Отправить телефон"</b> или введите его вручную в международном формате +79 ********', Extra.markup(Markup.keyboard([[Markup.contactRequestButton('📱 Отправить телефон')]]).resize().oneTime()));
  ctx.session.name = ctx.message.text;
  return ctx.wizard.next();
}, function (ctx) {
  if (!ctx.message.text && !ctx.message.contact) {
    return ctx.reply('Нажмите на кнопку <b>"📱 Отправить телефон"</b> или введите его вручную в международном формате +79 ********');
  }

  ctx.reply('Что Вам нужно дверь или окно');
  ctx.session.number = String(ctx.message.text || ctx.message.contact.phone_number).replace('+', '');
  return ctx.wizard.next();
}, function (ctx) {
  if (!ctx.message.text) {
    return ctx.reply('Что Вам нужно дверь или окно?');
  }

  ctx.reply('Напишите, сколько штук Вам нужно и их размеры.');
  ctx.session.age = ctx.message.text;
  return ctx.wizard.next();
}, function (ctx) {
  if (!ctx.message.text) {
    return ctx.reply('Напишите, сколько штук Вам нужно и их размеры.');
  }

  ctx.session.music = ctx.message.text; // Additional questions

  ctx.reply('Вы живете в доме или квартире?');
  return ctx.wizard.next();
}, function (ctx) {
  ctx.session.getUpTime = ctx.message.text;
  ctx.reply('What is your father like?');
  return ctx.wizard.next();
}, function (ctx) {
  ctx.session.fatherDescription = ctx.message.text;
  ctx.reply('What books do you like to read?');
  return ctx.wizard.next();
}, function (ctx) {
  ctx.session.favoriteBooks = ctx.message.text;
  ctx.reply('Спасибо! Ваша информация отправлена', keyboard); // Construct the collected information

  var collectedInfo = "\n      <b>\u0418\u043C\u044F:</b> ".concat(ctx.session.name, "\n      <b>\u041D\u043E\u043C\u0435\u0440:</b> +").concat(ctx.session.number, "\n      <b>\u0417\u0430\u043F\u0440\u043E\u0441:</b> ").concat(ctx.session.age, "\n      <b>\u0428\u0442\u0443\u043A \u0438 \u0440\u0430\u0437\u043C\u0435\u0440\u044B</b> ").concat(ctx.session.music, "\n      <b>\u041C\u0435\u0441\u0442\u0430 \u0436\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430:</b> ").concat(ctx.session.getUpTime, "\n      <b>\u041E\u0442\u0435\u0446 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:</b> ").concat(ctx.session.fatherDescription, "\n      <b>\u041B\u044E\u0431\u0438\u043C\u044B\u0435 \u043A\u043D\u0438\u0433\u0438:</b> ").concat(ctx.session.favoriteBooks, "\n    ");
  var receiverUserId = 6366431436; // Replace with the target user's ID

  var d = new Date();
  var time = d.toLocaleTimeString();
  bot.telegram.sendMessage(receiverUserId, "<u><b>\u041D\u043E\u0432\u044B\u0439 \u041B\u0438\u0434:</b></u>\n <i>\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438: ".concat(time, "</i>\n ").concat(collectedInfo), {
    parse_mode: 'HTML'
  });
  ctx.scene.leave();
});
var stage = new Stage([superWizard], {
  "default": 'super-wizard'
});
bot.use(stage.middleware());