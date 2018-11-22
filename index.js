const Botkit = require('botkit')
const storage = require('botkit-storage-postgres')
const debug = require('debug')

const config = require('./lib/config')
const fx = require('./lib/fx')

const controller = Botkit.slackbot({
  clientSigningSecret: config.SIGN_IN_SECRET,
  storage: storage({
    host: config.DB_SERVER,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
  })
})

const bot = controller.spawn({
  token: config.SLACK_KEY
})

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Could not connect to slack')
  debug('Connected to slack!')
})

controller.on('bot_channel_join', (bot, message) => {
  bot.reply(message, 'Hi, I am Tom, Capmotion\'s AI Director')
})

// USD Operations
controller.hears('USD', 'direct_message', async (bot, message) => {
  const response = await fx.getExchangeRate()
  bot.reply(message, `Erm... In theory, 1 USD equals ${response.USD_COP.val} COP`)
})

// WorldRemit Operations
controller.hears(['wr', 'worldremit'], 'direct_message', async (bot, message) => {
  const response = await fx.getWRemitxchangeRate()
  bot.reply(message, `Erm... According to WorldRemit, 1 USD equals ${response.ExchangeRate} COP`)
})
