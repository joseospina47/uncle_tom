'use strict'

const http = require('http')
const Botkit = require('botkit')
const storage = require('botkit-storage-mongo')

const config = require('./lib/config')
const converterMiddlerware = require('./middleware/converterMiddleware')
const fx = require('./lib/fx')

const controller = Botkit.slackbot({
  clientSigningSecret: config.SIGN_IN_SECRET,
  storage: storage({ mongoUri: config.MONGO_URI })
})

const bot = controller.spawn({
  token: config.SLACK_KEY
})

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Could not connect to slack')
})

controller.on('bot_channel_join', (bot, message) => {
  bot.reply(message, 'Hi, I\'m Tom, Capmotion\'s AI Director')
})

// FX Convertions
controller.hears(['convert'], ['direct_message'], converterMiddlerware, fx.convertCurrency)

// Help
controller.hears(['help'], ['direct_message', 'direct_mention'], (bot, message) => {
  const text = [
    `I answer to:
    - \`/dm @uncle_tom convert <amount>\` to convert USD to COP.`
  ].join('\n')
  bot.reply(message, text)
})

// Uncaught Messages
controller.hears('.*', ['direct_message'], (bot, message) => {
  bot.reply(message, 'Sorry, I didn\'t understand your message, try `/dm @uncle_tom help`')
})

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hi, I\'m Tom, Capmotion\'s AI Director')
  res.end()
}).listen(process.env.PORT || 3000)
