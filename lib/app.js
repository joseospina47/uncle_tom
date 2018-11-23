'use strict'

const Botkit = require('botkit')
const storage = require('botkit-storage-mongo')
const config = require('./config')
const fx = require('./fx')
const reminder = require('./reminder')
const converterMiddlerware = require('../middleware/converterMiddleware')

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

controller.hears(['hi', 'hello', 'howdy', 'hey'], ['direct_message', 'direct_mention'],
  (bot, message) => {
    bot.reply(message, 'Hi, I\'m Tom, Capmotion\'s AI Director')
  })

controller.hears(['convert'], ['direct_message'], converterMiddlerware, fx.convertCurrency)

controller.hears(['help'], ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message,
    `I answer to:
        - \`/dm @uncle_tom convert <amount>\` to convert USD to COP
        - \`/dm @uncle_tom help\` to display this message`)
})

// Uncaught Messages
controller.hears('.*', ['direct_message'], (bot, message) => {
  bot.reply(message, 'Sorry, I didn\'t understand your message, try `/dm @uncle_tom help`')
})

// Invoice Reminder
reminder.remindInvoices(bot)
