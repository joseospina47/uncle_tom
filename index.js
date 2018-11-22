const Botkit = require('botkit')
const storage = require('botkit-storage-postgres')
const debug = require('debug')

const config = require('./lib/config')
const converterMiddlerware = require('./middleware/converterMiddleware')
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

// FX Convertions
controller.hears('convert', ['direct_message'], converterMiddlerware, fx.convertCurrency)

// Uncaught Messages
controller.hears('.*', ['direct_message'], (bot, message) => {
  bot.reply(message, 'Sorry, I didn\'t understand your message, try `/dm @uncle_tom help`')
  debug('Could not understand the message', JSON.stringify(message, null, 2))
})

controller.hears('.*', ['direct_mention'], (bot, message) => {
  bot.reply(message, 'I don\'t want to bother the whole team, please send me a DM')
  debug('Could not understand the message', JSON.stringify(message, null, 2))
})
