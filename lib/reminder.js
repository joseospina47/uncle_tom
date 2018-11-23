const CronJob = require('cron').CronJob
const config = require('./config')

const remindInvoices = bot => {
  const job = new CronJob('* * 10 26 * *', () => {
    bot.say({
      channel: config.CHANNEL,
      text: 'Guys, don\'t forget to send your invoices!'
    })
  }, null, true, 'America/Bogota')
  job.start()
}

module.exports = {
  remindInvoices
}
