const {Telegraf, Scenes, Markup} = require('telegraf')
const TelegrafWit = require('telegraf-wit')
const { AssemblyAI } = require("assemblyai")

const bot = new Telegraf('6335580760:AAFgnyFscYrwjj12ax2gIcBIwqI2jdTC4jQ')
const wit = new TelegrafWit('NEFYIX6W2BCCD7RIHB4RHJHQSLOCO44F')
const client = new AssemblyAI({
  apiKey: '1aecfb5b28dd4a948f89ca470c69bcba'
})



module.exports={bot, wit, client, Markup, Scenes}
require('./controllers/start')
require('./controllers/link_handle')
require('./controllers/scenes/consultation')
require('./controllers/scenes/catalog')
require('./controllers/scenes/reserve')


bot.launch()

